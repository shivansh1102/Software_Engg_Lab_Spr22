const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const Order = require('../models/order');
const Food = require('../models/food');
const users = require('../controllers/users');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });

//Getting Profile
router.get('/profile/:id',catchAsync(async (req,res) => {
    const user = await User.findById(req.params.id)
    res.render('users/profile',{ user });
}))

//Updating Address in the Profile
router.put('/edit', catchAsync( async (req,res) => {
    if(!req.user){
        req.flash('error',"User Must LOGGED IN")
        res.redirect('/login')
    } else {
    const user = await User.findById(req.user)
    const geoData = await geocoder.forwardGeocode({
        query: req.body.location,
        limit: 1
    }).send()
    user.location = req.body.location
    user.geometry = geoData.body.features[0].geometry;
    await user.save();
    res.redirect(`/profile/${req.user._id}`)
}
}))

//Order History of User
router.get('/orderhistory',catchAsync( async (req,res) => {
    if(!req.user){
        req.flash('error',"User Must LOGGED IN")
        res.redirect('/login')
    } else {
        const user = await User.findById(req.user._id).populate({
            path: 'order',
            populate: {
                path: 'NGO'
            }
        }).populate({
            path:'order',
            populate: {
                path: 'user'
            }
        }).populate({
            path: 'order',
            populate: {
                path: 'order',
                populate: {
                    path: 'food',
                    populate:{
                        path: 'restaurant'
                    }
                }
            }
        })
        const orders = user.order
        console.log(orders)
        res.render('order',{ orders, str: "Orders" })
    }
}))

//Donation History of the NGOs
router.get('/donationhistory',catchAsync( async (req,res) => {
    if(!req.user){
        req.flash('error',"User Must LOGGED IN")
        res.redirect('/login')
    } else {
        const user = await User.findById(req.user._id)
        const orders = await Order.find({ NGO: user._id }).populate({
            path: 'NGO'
        }).populate({
            path: 'user'
        }).populate({
            path: 'order',
            populate: {
                path: 'food',
                populate:{
                    path: 'restaurant'
                }
            }
        })
        console.log(orders)
        res.render('order',{ orders, str: "Donation" })
    }
}))

//Order Details
router.get('/orderhistory/:orderid', catchAsync(async(req,res) => {
    if(!req.user){
        req.flash('error',"User Must LOGGED IN")
        res.redirect('/login')
    } else {
        const order = await Order.findById(req.params.orderid).populate({path: 'order',
        populate: {
            path: 'food',
            populate: {
                path: 'restaurant'
            }
        }} );
        res.render('admin/orderFood.ejs', {order})
    }
}))

//Register
router.route('/register')
    .get(users.renderRegister)
    .post(upload.single('image'),catchAsync(users.register));

//Login
router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)

//Logout
router.get('/logout', users.logout)

module.exports = router;