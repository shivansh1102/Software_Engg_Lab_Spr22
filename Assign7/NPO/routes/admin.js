//Admin Routes
const express = require('express');
const router = express.Router();
const User = require("../models/user");
const Food = require('../models/food');
const Order = require("../models/order");
const PortalTime=require('../models/portal');
const catchAsync = require('../utils/catchAsync')

//Admin Home Page
router.get('/', catchAsync(async(req,res) => {
    if(!req.user){
        req.flash('error',"User Must LOGGED IN")
        res.redirect('/login')
    } else {
        const user = await User.findById(req.user._id)
        if(user.roles === 'Admin') {
            res.render('admin/index.ejs')
        } else {
            req.flash('error',"User is not Authorized")
            res.redirect('/restaurants')
        }
    }
}))

//All Customers Route for Admin
router.get('/customer', catchAsync(async(req,res) => {
    if(!req.user){
        req.flash('error',"User Must LOGGED IN")
        res.redirect('/login')
    } else {
        const user = await User.findById(req.user._id)
        if(user.roles === 'Admin') {
            const customers = await User.find({roles : "customer"})
            res.render('admin/customer.ejs', {customers : customers});
        } else {
            req.flash('error',"User is not Authorized")
            res.redirect('/restaurants')
        }
    }
}))

//All NGOs Route for Admin
router.get('/ngo', catchAsync(async(req,res) => {
    if(!req.user){
        req.flash('error',"User Must LOGGED IN")
        res.redirect('/login')
    } else {
        const user = await User.findById(req.user._id)
        if(user.roles === 'Admin') {
            const ngos = await User.find({roles : "NGO"})
            res.render('admin/ngo.ejs', {ngos : ngos})
        } else {
            req.flash('error',"User is not Authorized")
            res.redirect('/restaurants')
        }
    }
}))

//All Restaurants Route for Admin
router.get('/restaurant', catchAsync(async(req,res) => {
    if(!req.user){
        req.flash('error',"User Must LOGGED IN")
        res.redirect('/login')
    } else {
        const user = await User.findById(req.user._id)
        if(user.roles === 'Admin') {
            const restaurants = await User.find({roles : "restaurant"})
            res.render('admin/restaurant.ejs', {restaurants : restaurants})
        } else {
            req.flash('error',"User is not Authorized")
            res.redirect('/restaurants')
        }
    }
}))

//All Orders Route for Admin
router.get('/orders', catchAsync(async(req,res) => {
    if(!req.user){
        req.flash('error',"User Must LOGGED IN")
        res.redirect('/login')
    } else {
        const user = await User.findById(req.user._id)
        if(user.roles === 'Admin') {
            const orders = await Order.find().populate({
                path:'NGO'
            }).populate({
                path:'user'
            }).populate({
                path:'order',
                populate: {
                    path:'food',
                    populate: {
                        path:'restaurant'
                    }
                }
            })
            res.render('admin/orders.ejs', {orders: orders, Food : Food})
        } else {
            req.flash('error',"User is not Authorized")
            res.redirect('/restaurants')
        }
    }
}))

//Window Slotting Route accessible to Admin Only
router.get('/windowslot', catchAsync(async(req,res) => {
    if(!req.user){
        req.flash('error',"User Must LOGGED IN")
        res.redirect('/login')
    } else {
        const user = await User.findById(req.user._id)
        if(user.roles === 'Admin') {
            res.render('admin/windowslot.ejs')
        } else {
            req.flash('error',"User is not Authorized")
            res.redirect('/restaurants')
        }
    }
}))

//Particular Order Route for Admin
router.get('/orders/:orderid', catchAsync(async(req,res) => {
    if(!req.user){
        req.flash('error',"User Must LOGGED IN")
        res.redirect('/login')
    } else {
        const user = await User.findById(req.user._id)
        if(user.roles === 'Admin') {
            const order = await Order.findById(req.params.orderid).populate({path: 'order',
            populate: {
                path: 'food',
                populate: {
                    path: 'restaurant'
                }
            }} );
            res.render('admin/orderFood.ejs', {order})
        } else {
            req.flash('error',"User is not Authorized")
            res.redirect('/restaurants')
        }
    }
}))

//Saving Window Slot
router.post('/windowslot',async(req,res)=>{  
    const {start,end}=req.body;
    let s = new Date('2020-01-14T17:43:37.000Z').toLocaleString(undefined, {timeZone: 'Asia/Kolkata'});
    if(Date.parse("01 Jan 1971 "+start+":00 GMT")>Date.parse("01 Jan 1971 "+end+":00 GMT")){
        req.flash('error','Inavlid time Input');
        res.redirect('/admin/windowslot');
    }else{
        const res2 = await PortalTime.deleteMany({});
        const portalTime = new PortalTime({ start:start, end:end });
        await portalTime.save()
        req.flash('success','Portal Time Saved Successfully')
        res.redirect('/admin')
    }
})

module.exports = router; 