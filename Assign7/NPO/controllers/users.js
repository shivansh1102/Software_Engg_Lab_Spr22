//Controller for Login and Logout
const User = require('../models/user');
const PortalTime = require('../models/portal');
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });

//Rendering Register Form
module.exports.renderRegister = (req, res) => {
    res.render('users/register');
}

//Creating User, Storing it in Database and Logging him/her in.
module.exports.register = async (req, res, next) => {    
    try {
        const { email, username, password,option,location } = req.body;
        const geoData = await geocoder.forwardGeocode({
            query: location,
            limit: 1
        }).send()
        const user = new User({ email,roles:option,location, username });
        user.geometry = geoData.body.features[0].geometry;
        if(req.file){
            user.image = {
            url: req.file.path,
                filename: req.file.filename
            }
        }
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, async (err) => {
            if (err) return next(err);
            req.flash('success', 'Welcome to NPO!');
            if(req.user.roles === 'restaurant'){
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
                res.redirect(`/restaurants/${req.user._id}`);
            } else if(req.user.roles === 'Admin') {
                res.redirect('/admin');
            } else {
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
                res.redirect('/restaurants')
            }
        })
    } catch (e) {
        if (e.name === 'MongoServerError' && e.code === 11000) {
            e.message = 'Email must be unique'
        }
        req.flash('error', e.message);
        res.redirect('register');
    }
}

//Render Login Form
module.exports.renderLogin = (req, res) => {
    res.render('users/login');
}

//Logging User In
module.exports.login = async (req, res) => {
    req.flash('success', 'Welcome back!');
    if(req.user.roles === 'restaurant'){
        const portalTime=await PortalTime.find();
        const start=portalTime[0]['start'];
        const end=portalTime[0]['end'];
        let today = new Date();
        let time = today.getHours() + ":" + today.getMinutes();
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
        res.redirect(`/restaurants/${req.user._id}`);
    } else if(req.user.roles === 'Admin') {
        res.redirect('/admin');
    } else {
        const portalTime=await PortalTime.find();
        const start=portalTime[0]['start'];
        const end=portalTime[0]['end'];
        let today = new Date();
        let time = today.getHours() + ":" + today.getMinutes();
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
        res.redirect('/restaurants')
    }
}

//Logging Out User
module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', "Goodbye!");
    res.redirect('/');
}
