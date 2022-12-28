const express = require('express');
const router = express.Router();
const User = require("../models/user")
const Food = require('../models/food');
const PortalTime=require('../models/portal');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
const catchAsync = require('../utils/catchAsync');

// All restaurant Route
router.get('/',catchAsync(async (req,res) => {
    if(!req.user){
        req.flash('error',"User Must LOGGED IN")
        res.redirect('/login')
    } else {
    const restaurants = await User.find({ roles : 'restaurant'})
    res.render('restaurants/index',{restaurants});
    }
}))

//Menu of Particular Restaurant
router.get('/:id', catchAsync(async(req,res) => {
    if(!req.user){
        req.flash('error',"User Must LOGGED IN")
        res.redirect('/login')
    } else {
    if(req.user.roles !== 'Admin'){
        const portalTime=await PortalTime.find();
        const start=portalTime[0]['start'];
        const end=portalTime[0]['end'];
        let today = new Date();
        let time = today.getHours() + ":" + today.getMinutes();
        if(today.getMinutes() <= 9)
            time = today.getHours() + ":0" + today.getMinutes();
        if(start<=time && time<=end){
            const userfind=await User.findById(req.user._id);
            userfind.isOpen=true;
            await userfind.save();
        }
        else{
            const userfind=await User.findById(req.user._id);
            userfind.isOpen=false;
            await userfind.save();
        }
    }
    const restaurant = await User.findById(req.params.id).populate({
        path: 'cart',
        populate: {
            path: 'food'
        }
    })
    if(restaurant.roles != 'restaurant')
    {
        req.flash('error','Invalid ID')
        res.redirect('/restaurants');
        return;
    }
    res.render('restaurants/showmenu',{restaurant})
}
}))

//Rendering Add Food Item To The Menu Form
router.get('/:id/add', (req,res) => {
    if(!req.user){
        req.flash('error',"User Must LOGGED IN")
        res.redirect('/login')
    } else {
        if(req.user._id.equals(req.params.id)) {
            res.render('restaurants/addFood');
        } else {
            req.flash('error','Not Authorized')
            res.redirect('/restaurants')
        }
    }
})

//Adding Food to the Menu
router.post('/:id',upload.single('image'), catchAsync(async (req,res) => {
    if(!req.user){
        req.flash('error',"User Must LOGGED IN")
        res.redirect('/login')
    } else {
    const { name,count,price,description } = req.body
    const food = new Food({ name,count,price,description })
    if(req.file) {
        food.image = {
            url: req.file.path,
            filename: req.file.filename
        }
    }
    food.restaurant = req.params.id;
    const restaurant = await User.findById(req.params.id);
    const cart = {
        food: food._id,
        count: 0
    }
    restaurant.cart.unshift(cart)
    await restaurant.save()
    await food.save();
    res.redirect(`/restaurants/${restaurant._id}`)
}
}))

// Rendering Editing Food in the Menu Form
router.get('/:id/:foodid/edit', catchAsync(async(req,res) => {
    if(!req.user){
        req.flash('error',"User Must LOGGED IN")
        res.redirect('/login')
    } else {
    const food = await Food.findById(req.params.foodid)
    res.render('restaurants/editFood',{food})
    }
}))

//Updating Food in the Menu Form
router.put('/:id/:foodid', catchAsync(async (req,res) => {
    if(!req.user){
        req.flash('error',"User Must LOGGED IN")
        res.redirect('/login')
    } else {
    const {price,count,description} = req.body
    const food = await Food.findById(req.params.foodid)
    food.price = price
    food.description = description
    food.count = count
    await food.save()
    res.redirect(`/restaurants/${req.params.id}`);
    }
}))

//Adding to Cart
router.post('/:foodid/add',catchAsync(async (req,res) => {
    const food = await Food.findById(req.params.foodid).populate('restaurant') 
    if(!req.user){
        req.flash('error',"User Must LOGGED IN")
        res.redirect('/login')
    } else {
        const user = await User.findById(req.user._id);
        const index = user.cart.findIndex((element) => {
            return element.food.equals(req.params.foodid)
        })
        if(index === -1){
            const cartFood = {
                food: food._id,
                count: req.body.count
            }
            user.cart.unshift(cartFood);
        } else {
            user.cart[index].count += parseInt(req.body.count)
        }
        await user.save()
        food.count = food.count - req.body.count
        await food.save()
    }
    res.redirect(`/restaurants/${food.restaurant._id}`)
}))

//Deleting Food From Menu
router.delete('/:id/:foodid', catchAsync(async(req,res) => {
    const {id ,foodid} = req.params;
    if(!req.user) {
        req.flash('error',"User Must LOGGED IN")
        res.redirect('/login')
    } else if(!req.user._id.equals(id)) {
        req.flash('error',"User is not Authorized")
        res.redirect('/login')
    } else {
        const restaurant = await User.findById(id)
        const menu = restaurant.cart.filter(c => {
            if(!c.food.equals(foodid))
                return c
        })
        restaurant.cart = menu
        await restaurant.save()
        await Food.findByIdAndDelete(foodid)
        res.redirect(`/restaurants/${id}`)
    }
}))

module.exports = router;