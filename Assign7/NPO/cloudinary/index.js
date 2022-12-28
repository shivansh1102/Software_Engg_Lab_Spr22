const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

//Configuring Cloudinary Storage
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

//Creating Storage
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'NPO',
        allowedFormats: ['jpeg', 'png', 'jpg','pdf','*']
    }
});

//Exporting Storage
module.exports = {
    cloudinary,
    storage
}

