import {useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import Perks from "../Perks.jsx";
import PhotosUploader from "../PhotosUploader";
import AccountNav from "../AccountNav.jsx";
import axios from 'axios';

export default function PlacesFormPage(){
    const {id} = useParams();
    const [country, setCountry] = useState("");
    const [stayName, setStayName] = useState("");
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [review, setReview] = useState("");
    const [perks, setPerks] = useState([]);
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [maxGuests, setMaxGuests] = useState(1);
    const [price, setPrice] = useState(0);
    const [redirect, setRedirect] = useState(false);

    useEffect(()=>{
        if(!id){
            return;
        }
        axios.get("/places/"+id).then(response => {
            const {data} = response;
            setCountry(data.country);
            setStayName(data.stayName);
            setAddedPhotos(data.photos);
            setReview(data.review);
            setPerks(data.perks);
            setCheckIn(data.checkIn);
            setCheckOut(data.checkOut);
            setMaxGuests(data.maxGuests);
            setPrice(data.price);
        });
    },[id]);

    function inputHeader(text){
        return (
            <h2 className="text-xl mt-4">{text}</h2>
        )
    }
    function inputDescription(text){
        return (
            <p className="text-gray-500 text-sm mt-2">{text}</p>
        )
    }
    function preInput(header, description){
        return (
            <div>
                {inputHeader(header)}
                {inputDescription(description)}
            </div>
        )
    }
    async function savePlace(ev){
        ev.preventDefault();
        const placeData = {
            country, stayName, addedPhotos, review, perks, checkIn, checkOut, maxGuests, price
        };
        if (id) {
            //update
            await axios.put("/places", {
                id, ...placeData
            });
            setRedirect(true);
        } else {
            // new place
            await axios.post("/places", placeData);
            setRedirect(true);
        }
        
    }

    if(redirect){
        return <Navigate to={"/account/places"} />
    }
    
    return (
        <div>
            <AccountNav/>
            <form onSubmit={savePlace}>
                {preInput('Country','Mention the country.')}
                <input type="text" value={country} onChange={ev => setCountry(ev.target.value)} placeholder="Country"/>
                {preInput('Stay Name',"Hotel's name or bnb's name or owner's name.")}
                <input type="text" value={stayName} onChange={ev => setStayName(ev.target.value)} placeholder="Hotel's name or airbnb's name or owner's name"/>
                {preInput('Photos',"Add photos (mandatory).")}
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
                {preInput('Review',"Good, bad or ugly, share everything.")}
                <textarea value={review} onChange={ev => setReview(ev.target.value)} />
                {preInput('Perks',"Select all the perks included in the price.")}
                <Perks selected={perks} onChange={setPerks}/>
                {preInput("Check-in, check-out and maximum guests","Add check-in, check-out and maximum occupancy allowed.")}
                <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-4">
                    <div>
                        <h3 className="mt-2 mb-1">Check in time</h3>
                        <input type="text" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} placeholder="14:00"/>
                    </div>
                    <div>
                        <h3 className="mt-2 mb-1">Check out time</h3>
                        <input type="text" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} placeholder="12:00"/>
                    </div>
                    <div>
                        <h3 className="mt-2 mb-1">Maximum guests</h3>
                        <input type="number" value={maxGuests} onChange={ev => setMaxGuests(ev.target.value)} placeholder="2"/>
                    </div>
                    <div>
                        <h3 className="mt-2 mb-1">Price per night</h3>
                        <input type="number" value={price} onChange={ev => setPrice(ev.target.value)} placeholder="$100"/>
                    </div>
                </div>
                <button className="primary my-4">Save</button>
            </form>
        </div>
    )
}