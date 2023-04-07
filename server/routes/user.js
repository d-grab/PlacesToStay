const express = require('express');
const UserRouter = express.Router();
const auth = require("../controllers/authentication");
const login = require('../controllers/login')
const HomePageController= require('../controllers/HomePageController');
const logout = require('../controllers/logout')
const login_check= require('../controllers/isLogged')
var multer = require('multer');

UserRouter.get("/" , HomePageController);
UserRouter.get("/login", login);
UserRouter.post('/login', auth.login);
UserRouter.get('/logout', logout);

//Upload Image
const upload = multer({
       dest: 'views/images',
       limits: {
         fileSize: 5000000, },
         fileFilter(req, file, callback) {

         if (!file.originalname.match(/\.(png|jpg|jpeg)$/))
         {
         callback(new Error('Please upload an image.')) }
         callback(undefined, true)
         }})
     
       
     
UserRouter.post('/upload',login_check, upload.single('upload'), (req, res) => {
       res.send("Uploaded image to /images"), (error, req, res, next) => {
       res.status(400).send({error: error.message}) 
       }})


module.exports = UserRouter;