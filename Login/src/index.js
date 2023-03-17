


//functions are working with express 

const express = require("express")  // it will aquries express.js
const app = express() // start express.js
const path = require("path") // this used to 
const hbs = require("hbs") // to provide hbs files to render function
const bcrypt = require("bcrypt") // to encrypt the password 
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const flash = require('express-flash')
const collection = require("./mongodb") // mongodb is just file name , in collection we will get whatever is exported(module.export..)
const methodoverride = require('method-override')
const publicPath = path.join(__dirname, '../public')
app.use(express.static(publicPath))
const templatepath = path.join(__dirname, "../templates")

app.use(express.json()) // app.use is mostly used to set up middleware for your application.
app.set("view engine", "hbs") // to make hbs as view engine                        
app.set("views", templatepath) // by default the name of template folder would be views so to change that we use it.
app.use(express.urlencoded({ extended: false }))
app.use(methodoverride('_method'))
app.use(flash())


passport.use(new LocalStrategy(
    { usernameField: 'name' },
    async function (name, password, done) {

        try {
            const result = await collection.findOne({ name: name });
            console.log(result);
            user = result;
            if (user == null) {
                return done(null, false,{ message:'user not available'});

            }
            if (!bcrypt.compareSync(password, result.password)) {
                return done(null, false, {message:'Passpord is incorrect'});
            }
            return done(null, user);
        } catch (error) {
            console.error(error);
        }
    }
));

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());



app.get("/", (req, res) => {     // since it is default page we only give slash  app.get():tells the server what to do when a get request at the given route is called.
    res.render("login")     // res.render() function is used to render a view and sends the rendered HTML string to the client.
})
app.get("/signup", (req, res) => {
    res.render("signup")
})
app.get("/home", (req, res) => {
    res.render("home")
})



// post works when we click the sudmit button
//req.body.name( in forms name:name / name:password) so we use the rhs part to fetch the data 
app.post("/signup", async (req, res) => {
    const passhash = await bcrypt.hash(req.body.password, 10) // it encrypts the password  
    const data = {
        name: req.body.name,
        password: passhash,
        email:req.body.email,
        phone:req.body.phone

    }
    await collection.insertMany([data])  // it will await the connection and insert data into mongodb
    res.render("login")

})


app.post('/login',
    passport.authenticate('local', { failureRedirect: "/", failureFlash: true }),
    function (req, res) {
        res.render("home")
    });

app.post('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

app.listen(3000, () => {                      // Specifies the port we want to listen to
    console.log("port connected")
})


// express.json() function is a built-in middleware function in Express.
// It parses incoming requests with JSON payloads and is based on body-parser.


//what is middle ware ? middleware is software that different applications use to communicate with each other.

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser((id, done) => {
    collection.findById(id, (err, user) => {
        if (err) {
            return done(err);
        }
        done(null, user);
    });
});