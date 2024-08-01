const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
const PlaceModel = require("../api/models/Place");

require('dotenv').config()

const bcryptSalt = bcrypt.genSaltSync(10); // secret
const jwtSecret = "qwerty"

const app = express();

mongoose.connect(process.env.MONGO_URL)

app.use(express.json());

app.use(cookieParser());

app.use('/uploads', express.static(__dirname+'/uploads'));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));

app.get("/test", (req, res) => {
    res.json({msg:"test okay"});
});

app.post("/register", async (req, res)=>{
    const {name, email, password} = req.body;

    try{
        
        const user = new User({
            name: name,
            email: email,
            password: bcrypt.hashSync(password, bcryptSalt) //jwt.sign(password, secret)
        });
    
        await user.save();
    
        res.status(200).json({msg: "User registered successfully!"});

    } catch(e){

        res.status(422).json(e);

    }
    
});

app.post("/login", async (req, res)=>{
    const {email, password} = req.body;

    const response = await User.findOne({email});

    if(response){
        const passwordOkay = bcrypt.compareSync(password, response.password);
        if(passwordOkay){
            jwt.sign({email: response.email, id:response._id, name:response.name}, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(response);    
            })
            
        } else{
            res.status(422).json("Password authentication failed!");
        }
        
    } else {
        
        res.status(400).json({msg: "Incorrect email or password!"});
    }
    
});

app.get("/profile", (req, res)=>{
    const {token} = req.cookies;
    if (token){
        jwt.verify(token, jwtSecret, {},async (err, userData)=>{
            if(err) throw err;
            const {name, email, _id} = await User.findById(userData.id);
            res.json({name, email, _id});
        });
    }else {
        res.json(null);
    }
    
})

app.post('/logout', (req, res)=>{
    res.cookie('token', '').json(true);
})

app.post("/upload-by-link", async (req, res) => {
    const {link} = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/' +newName,
    });
    res.json(newName);
})

const photosMiddleware = multer({dest: 'uploads/'});
app.post("/upload", photosMiddleware.array("photos", 50), (req, res) => {
    const uploadedFiles = [];
    for(let i = 0; i < req.files.length; i++) {
        const {path, originalname} = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace("uploads",""));
    }

    res.json(uploadedFiles);
})

app.post("/places", (req, res) => {
    console.log(req.cookies);
    const {token} = req.cookies;
    const {country, stayName, addedPhotos, review, perks, checkIn, checkOut, maxGuests, price} = req.body;
    jwt.verify(token, jwtSecret, {},async (err, userData)=>{
        if(err) throw err;
        const place = new PlaceModel({
            owner:userData.id,
            country, 
            stayName, 
            photos:addedPhotos, 
            review, 
            perks, 
            checkIn, 
            checkOut, 
            maxGuests,
            price
        })
        await place.save()
        res.json(place);
    });
})

app.get("/user-places", (req, res) => {
    const {token} = req.cookies;
    jwt.verify(token, jwtSecret, {},async (err, userData)=>{
        const {id} = userData;
        res.json(await PlaceModel.find({owner:id}));
    });
});

app.get("/places/:id",async (req, res)=>{
    const {id} = req.params;
    res.json(await PlaceModel.findById(id));
})

app.put("/places", async (req, res)=>{
    const {token} = req.cookies;
    const {id, country, stayName, addedPhotos, review, perks, checkIn, checkOut, maxGuests, price} = req.body;

    jwt.verify(token, jwtSecret, {},async (err, userData)=>{
        if(err) throw err;
        const placeDoc = await PlaceModel.findById(id);
        if(userData.id === placeDoc.owner.toString()){
            placeDoc.set({
                country, 
                stayName, 
                photos:addedPhotos, 
                review, 
                perks, 
                checkIn, 
                checkOut, 
                maxGuests,
                price});
            await placeDoc.save();
            res.json("okay")
        }
    });
});

app.get("/places", async (req, res) => {
    res.json( await PlaceModel.find());
})

app.listen(3000);