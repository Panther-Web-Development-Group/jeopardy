import express from "express";
import passport from 'passport';
import User from '../models/User.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.render("home");
});

router.get('/register', (req, res) => {
    res.render("register");
});

router.post('/user/register', async(req, res) => {
    const { username, password, schoolemail } = req.body;
    const user = new User({ username, schoolemail, type: 'student', password1: req.body.password });

    try {
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            res.redirect('/dashboard');
        });
    } catch (error) {
        console.log(error);
        res.redirect('/register');
    }
});

router.get('/login', (req, res) => {
    res.render('login', { errorMessages: req.flash('error') });
});

router.post('/user/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) { return next(err); }
        if (!user) {
            req.flash('error', 'Invalid username or password');
            return res.redirect('/login');
        }
        req.logIn(user, (err) => {
            if (err) { return next(err); }
            return res.redirect('/dashboard');
        });
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

export default router;