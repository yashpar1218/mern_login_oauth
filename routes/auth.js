const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/User.js");

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Auth routes are working!");
});

// Google Auth Routes
router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get("/google/callback", 
    passport.authenticate("google", { failureRedirect: "/" }), 
    (req, res) => {
        res.redirect("/dashboard");  // Redirecting to /dashboard (not /public/dashboard.html)
    }
);

// GitHub Auth Routes

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

router.get('/github/callback',
    passport.authenticate('github', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/dashboard.html');
    });




// Register Route
router.post("/register", async (req, res) => {
    try{
    const { name, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
        return res.status(400).json({ message: "User already exists" });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    user = new User({
        name,
        email,
        password: hashedPassword
    });

    await user.save();
    res.json({ message: "User registered successfully" });
} catch(err){
    res.json({ message: "Server Error", error: error.message });
}
});

// Login Route
router.post("/login", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(400).json({ message: info.message });

        req.logIn(user, (err) => {
            if (err) return next(err);
            res.json({ message: "Login successful", user });
        });
    })(req, res, next);
});

// Logout
router.get("/logout", (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        req.session.destroy(() => {
            res.redirect("/");  // Redirect to home page after logout
            res.json({ message: "Logged out successfully" });
        });
    });
});

module.exports = router;
