//Order Model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Declaring Order Schema
const OrderSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    order: [
        {
            food : {
                type: Schema.Types.ObjectId,
                ref: 'food'
            },
            count : Number,
            money : Number,
        }
    ],
    money: Number,
    modeOfPayment: String,
    transaction: {
        payment_id: String,
        order_id: String,
        signature: String
    },
    status: {
        type: String,
        default: "Failed"
    },
    NGO: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    selfpickup: {
        type: Boolean,
        default: false
    }
})

//Creating and Exporting Order Model
module.exports = mongoose.model('order', OrderSchema);