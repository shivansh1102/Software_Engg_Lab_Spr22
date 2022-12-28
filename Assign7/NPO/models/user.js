//User Model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

//Declaring User Schema
const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    roles: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required :true
    },
    image: {
        url: {
            type: String,
            default : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
        },
        filename:String
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    notification: [
        {
            text: {
                type: String,
                required:true
            },
            from: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
            to: {
                type: Schema.Types.ObjectId,
                ref: 'user'
            },
            completed:{
                type:Boolean,
                default: false
            }
        }
    ],
    cart: [
        {
            food:{
                type: Schema.Types.ObjectId,
                ref: 'food'
            },
            count: {
                type:Number,
                required: true
            }
        }
    ],
    order: [
        {
            type: Schema.Types.ObjectId,
            ref: 'order'
        }
    ],
    isOpen:{
        type: Boolean,
        default: false
    }
});

//Plugging In Passport to the User Schema
UserSchema.plugin(passportLocalMongoose);

//Creating and Exporting User Model
module.exports = mongoose.model('user', UserSchema);