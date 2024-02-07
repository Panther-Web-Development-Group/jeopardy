import bluebird from 'bluebird';
import flash from 'connect-flash';
import MongoStore from "connect-mongo";
import 'dotenv/config';
import express from "express";
import session from "express-session";
import http from "http";
import mongoose from "mongoose";
import logger from "morgan";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import path from "path";
import { Server as SocketIOServer } from "socket.io";
import { fileURLToPath } from "url";
import User from "./models/User.js";
import indexRoute from "./routes/index.js";


const app = express();

// MongoDB connection
mongoose.connect(process.env.URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));


mongoose.Promise = bluebird;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));

// Session and Passport setup
var sessionConfig = {
    secret: "aioedfhjTGEDkdVFAN",
    name: "aioedfhjTGEDkdVFAN",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.URI,
    }),
};
app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Socket.IO setup
const server = http.createServer(app);
const io = new SocketIOServer(server);

const __dirname = fileURLToPath(path.dirname(
    import.meta.url));
app.set('view engine', 'pug');
app.set("views", path.join(__dirname, "/views"));
app.use(logger('dev'));

// Middleware for CORS and body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());


// Routes
app.use("/", indexRoute);
app.get("/", indexRoute);
app.get("*", indexRoute);

// Socket.IO connection handler
io.on("connection", (socket) => {

});

// Server listening setup
const port = process.env.PORT || 5501;
app.set('port', port);
server.listen(port, () => {
    console.log(`Server listening on PORT ${port}`);
});