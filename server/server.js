var flash = require('express-flash');
const express = require('express');
const app = express();
const locationRouter = require('./routes/location.js');
const sessionMiddleware = require('./middleware/session');
const userRouter = require("./routes/user")
const passport = require('passport');  // authentication
const bodyParser = require('body-parser'); // parser middleware
const cookieParser = require('cookie-parser');
var morgan = require('morgan');
const path = require("path");
const fs = require("fs")
app.use(sessionMiddleware);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash()); // use connect-flash for flash messages stored in ses
app.use(cookieParser());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(morgan('dev')); // log every request to the console
app.use(express.urlencoded({extended: false}))
app.use(express.static(__dirname + '../views'));
app.use(express.json());

app.use(express.static('views'));
//app.use('/views/images', express.static('images'));
app.set("view engine", "ejs");

// images to be stored in uploads
//multer options
const multer = require("multer");

const imageStorage = multer.diskStorage({
    // Destination to store image     
    destination: '../views', 
      filename: (req, file, cb) => {
          cb(null, file.fieldname +  path.extname(file.originalname))
            // file.fieldname is name of the field (image)
            // path.extname get the uploaded file extension
    }
});
const imageUpload = multer({
	storage: imageStorage,
	limits: {
	  fileSize: 1000000000 // 1000000 Bytes = 1 MB
	},
	
}) 

/*
app.use('/a',express.static('/b'));
Above line would serve all files/folders inside of the 'b' directory
And make them accessible through http://localhost:3000/a.
*/


app.post('/upload', imageUpload.single('image'), (req, res) => {
	res.send(req.file)
}, (error, req, res, next) => {
	res.status(400).send({ error: error.message })
})

    
/*
app.use('/a',express.static('/b'));
Above line would serve all files/folders inside of the 'b' directory
And make them accessible through http://localhost:3000/a.
*/





//require('./controllers/passport')(passport)
// routes ======================================================================
//require('./routes/NewRoutes')(app, passport); // load our routes and pass in our app and fully configured passport
app.use(locationRouter);
app.use(userRouter);
app.listen(5000)

