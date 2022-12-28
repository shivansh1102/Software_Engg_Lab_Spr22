//Portal Model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Declaring Portal Schema
const PortalSchema = new Schema({
    start:{
        type : String
    },
    end:{
        type : String
    }
})

//Creating and Exporting Portal Model
module.exports = mongoose.model('portal', PortalSchema);