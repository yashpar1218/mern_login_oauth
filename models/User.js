const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    googleId: { type: String, unique: true, sparse: true },
    githubId: { type: String, unique: true, sparse: true},
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    
});

module.exports = mongoose.model("User", UserSchema);
