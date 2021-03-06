const express = require('express');
const app = express();
require('dotenv').config();
const http = require("http").Server(app);
let session = require("express-session");
let MongoDBStore = require("connect-mongodb-session")(session);
const userRoutes = require("./routes/userRoutes");
const movieRoutes = require("./routes/movieRoutes");
const searchRoutes = require("./routes/searchRoutes");
const commentRoutes = require("./routes/commentRoutes");
const passport = require("passport");
const bodyParser = require("body-parser");
const User = require("./schemas/User");
const flash = require("connect-flash");
const schedule = require("node-schedule");
const mongoose = require("mongoose");
const PORT = 5000;
const Scrap = require("./database/scraping");

http.listen(PORT, () => {
  console.log("Listening on port: ", PORT);
});

// Connexion to Database
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect(
  process.env.MONGO_URI,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }
); 

let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected!");
});

// Creating session store
var store = new MongoDBStore({
  uri:
    process.env.MONGO_URI,
  collection: "sessions"
});

/* Middleware */
app.use('/static', express.static('src/subtitles'));
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "hyperflix",
    httpOnly: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    store: store,
    resave: false,
    saveUninitialized: false,
    unset: "destroy"
  })
);
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* Routes for API */
app.use("/users", userRoutes.router);
app.use("/search", searchRoutes.router);
app.use("/auth", require("./controllers/auth"));
app.use("/movie", movieRoutes.router);
app.use("/comment", commentRoutes.router);

// Refresh DB everyday at 12:15 AM
schedule.scheduleJob("0 15 0 * * *", () => {
  Scrap();
})