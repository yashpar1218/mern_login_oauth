const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("./config/passport");
require("dotenv").config();


const path = require("path");
const bodyParser = require("body-parser"); // Make sure this line is correct
//const authRoutes = require("./routes/auth.js"); // Import auth routes
const flash = require("connect-flash");
const cors = require("cors");



const app = express();

app.use(express.static(path.join(__dirname, "public")));



// Middleware
const corsOptions = {
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"], // Allow both
    credentials: true,
};

app.use(cors(corsOptions));

// Middleware to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Express session middleware
app.use(
    session({
        secret: "mysecretkey",
        resave: false,
        saveUninitialized: false,
    })
);






// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});

// Flash middleware
app.use(flash());

// Use authentication routes
console.log("Auth routes are being used...");
console.log("Trying to load auth routes...");
const authRoutes = require("./routes/auth");
console.log("Auth routes loaded successfully!");



app.use("/auth", authRoutes);

// Connect to MongoDB
mongoose
    .connect("mongodb://localhost:27017/loginSystem", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
