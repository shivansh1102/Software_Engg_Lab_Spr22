//Food Model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Declaring Food Schema
const FoodSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        url: String,
        filename:String
    },
    restaurant: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    count: {
        type: Number,
        default: 0
    },
    price: {
        type:Number,
        required: true
    }
})

//Creating and Exporting Food model
module.exports = mongoose.model('food', FoodSchema);