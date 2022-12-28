const express = require('express');
const router = express.Router();
const User = require("../models/user")
const Food = require('../models/food');
const Order = require('../models/order')
const Razorpay = require('razorpay')
const razorpay = new Razorpay({
    key_id:process.env.RAZORPAY_KEY,
    key_secret:process.env.RAZORPAY_SECRET
})

const catchAsync = require('../utils/catchAsync')

//Cart Route for Customer
router.get('/', catchAsync(async(req,res) => {
    if(!req.user) {
        req.flash('error',"User Must LOGGED IN")
        res.redirect('/login')
    }
    else {
        const user = await User.findById(req.user._id).populate({
            path: 'cart',
            populate: {
                path: 'food',
                populate: {
                    path: 'restaurant'
                }
            }
        })
        const cart = user.cart
        var money = 0
        for(let i in cart){
           money += cart[i].count*cart[i].food.price
        }
        res.render('cart/index',{ cart, money })
    }
}))

//Updating Item in Cart
router.put('/:foodid', catchAsync(async(req,res) => {
    const { count } = req.body
    if(!req.user){
        req.flash('error',"User Must LOGGED IN")
        res.redirect('/login')
    } else {
        const food = await Food.findById(req.params.foodid)
        const user = await User.findById(req.user._id)
        const index = user.cart.findIndex((element) => {
            return element.food.equals(req.params.foodid)
        })
        if(index === -1)
            req.flash('error',"Something Went Wrong")
        else {
            const diff = req.body.count - user.cart[index].count
            user.cart[index].count += parseInt(diff)
            food.count = food.count - diff
            await food.save();
            await user.save();
        }
        res.redirect('/cart')
    }
}))

//Deleting Item in Cart
router.delete('/:foodid', catchAsync(async(req,res) => {

    if(!req.user){
        req.flash('error',"User Must LOGGED IN")
        res.redirect('/login')
    } else {
        const food = await Food.findById(req.params.foodid)
        const user = await User.findById(req.user._id)
        const index = user.cart.findIndex((element) => {
            return element.food.equals(req.params.foodid)
        })
        if(index === -1)
            req.flash('error',"Something Went Wrong")
        else {
            food.count = food.count + user.cart[index].count
            const cart = user.cart.filter(c => {
                if(!c.food.equals(req.params.foodid))
                    return c
            })
            user.cart = cart
            await food.save();
            await user.save();
        }
        res.redirect('/cart')
    }
}))

//Online Payment
router.post('/pay/online',catchAsync(async(req,res) => {
    if(!req.user){
        req.flash('error',"User Must LOGGED IN")
        res.redirect('/login')
    } else {
    let options = {
        amount:req.body.amount*100,
        currency: "INR"
    }
    const user = await req.user.populate({
        path: 'cart',
        populate: {
            path: 'food',
            populate: {
                path: 'restaurant'
            }
        }
    })
    const restaurant = await User.findById(user.cart[0].food.restaurant._id)
    const cart = user.cart
    const newCart = []
    cart.forEach(item=> {
        let  newItem = {}
        if(req.user.roles === 'customer'){
            newItem = {
                food: item.food._id,
                count: item.count,
                money: item.food.price*item.count*0.8
            }
        } else {
            newItem = {
                food: item.food._id,
                count: item.count,
                money: item.food.price*item.count*0.6
            }
        }
        newCart.push(newItem)
    })

    const newOrder = new Order({ 
        user: user._id,
        order: newCart, 
        money: req.body.amount,
        modeOfPayment:"ONLINE",
        selfpickup: req.body.selfpickup
    })
    restaurant.order.unshift(newOrder._id)
    user.order.unshift(newOrder._id)
    await user.save()
    await newOrder.save()
    await restaurant.save()
    razorpay.orders.create(options, (err,order) => {
        res.json(order)
    })
}
}))

//Successful Payment
router.post('/',catchAsync(async(req,res) => {
    if(!req.user){
        req.flash('error',"User Must LOGGED IN")
        res.redirect('/login')
    } else {
    const user = await User.findById(req.user._id)
    const order = await Order.findById(user.order[0])
    order.status = 'Success'
    const transaction = {
        payment_id : req.body.razorpay_payment_id,
        order_id : req.body.razorpay_order_id,
        signature : req.body.razorpay_signature
    }
    order.transaction = transaction
    await order.save()
    user.cart = []
    await user.save()
    if(!order.selfpickup && !order.NGO)
        req.flash('success','Payment Successful! You will receive a call from Delivery Agent assigned by NPO')
    else if(!order.NGO)
        req.flash('success','Payment Successful!')
    else
        req.flash('success', 'Payment Successful! Your Order will be arrived to your choosen NGO by NPO')
    res.redirect('/cart')
}
}))

//Payment through COD
router.get('/pay/cod', catchAsync(async(req,res) => {
    if(!req.user){
        req.flash('error',"User Must LOGGED IN")
        res.redirect('/login')
    } else {
    const user = await req.user.populate({
        path: 'cart',
        populate: {
            path: 'food',
            populate: {
                path: 'restaurant'
            }
        }
    })
    const restaurant = await User.findById(user.cart[0].food.restaurant._id)
    const cart = user.cart
    const newCart = []
    let money = 0
    cart.forEach(item=> {
        let  newItem = {}
        if(req.user.roles === 'customer'){
            newItem = {
                food: item.food._id,
                count: item.count,
                money: item.food.price*item.count*0.8
            }
            money = money + item.food.price*item.count*0.8
        } else {
            newItem = {
                food: item.food._id,
                count: item.count,
                money: item.food.price*item.count*0.6
            }
            money = money + item.food.price*item.count*0.8
        }
        newCart.push(newItem)
    })

    const newOrder = new Order({ 
        user: user._id,
        order: newCart, 
        money: money,
        modeOfPayment:"COD",
        selfpickup: false
    })
    newOrder.status = 'Success'
    restaurant.order.unshift(newOrder._id)
    user.order.unshift(newOrder._id)
    await restaurant.save()
    await newOrder.save()
    user.cart = []
    await user.save()
    req.flash('success','NPO will assign your order to delivery agent.')
    res.redirect('/cart')
}
}))

//Donate To NGO route
router.get('/donation', catchAsync(async(req,res) => {
    if(!req.user){
        req.flash('error',"User Must LOGGED IN")
        res.redirect('/login')
    } else {
    const NGOs = await User.find({ roles: 'NGO' })
    const user = await req.user.populate({
        path: 'cart',
        populate: {
            path: 'food',
            populate: {
                path: 'restaurant'
            }
        }
    })
    const cart = user.cart
    res.render('cart/NGO',{ NGOs, cart })
}
}))

//Paying Donation Amount
router.post('/pay/donate', catchAsync(async(req,res) => {
    if(!req.user){
        req.flash('error',"User Must LOGGED IN")
        res.redirect('/login')
    } else {
    if(!req.body.NGO){
        req.flash('error','Select the NGO')
        res.redirect('/cart/donation')
    }
    let options = {
        amount:req.body.amount*100,
        currency: "INR"
    }

    const user = await req.user.populate({
        path: 'cart',
        populate: {
            path: 'food',
            populate: {
                path: 'restaurant'
            }
        }
    })
    const restaurant = await User.findById(user.cart[0].food.restaurant._id)

    const cart = user.cart
    const newCart = []
    cart.forEach(item=> {
        let  newItem = {}
        
        newItem = {
            food: item.food._id,
            count: item.count,
            money: item.food.price*item.count*0.6
        }
        newCart.push(newItem)
    })

    const newOrder = new Order({ 
        user: user._id,
        order: newCart, 
        money: req.body.amount,
        modeOfPayment:"ONLINE",
        NGO: req.body.NGO
    })
    restaurant.order.unshift(newOrder._id)

    user.order.unshift(newOrder._id)
    await user.save()
    await newOrder.save()
    await restaurant.save()

    razorpay.orders.create(options, (err,order) => {
        res.json(order)
    })
}
}))


module.exports = router;