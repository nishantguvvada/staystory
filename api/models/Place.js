const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
    owner: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    country: String,
    stayName: String,
    photos: [String],
    review: String,
    perks: [String],
    checkIn: Number,
    checkOut: Number,
    maxGuests: Number,
    price: Number
})

const PlaceModel = mongoose.model("Place", placeSchema);

module.exports = PlaceModel;