const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("../models/User"); // Import User Model
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
require("dotenv").config(); // Import environment variables

passport.use(
    new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
        try {
            // Find user in the database
            const user = await User.findOne({ email });
            if (!user) {
                return done(null, false, { message: "User not found" });
            }

            // Compare password
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return done(null, false, { message: "Incorrect password" });
            }

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    })
);


passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Check if user already exists in DB (You'll need a User model)
          let user = await User.findOne({ googleId: profile.id });
  
          if (!user) {
            // Create new user
            user = new User({
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
            });
            await user.save();
          }
  
          return done(null, user);
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );

  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/github/callback",
    scope: ['user:email']
}, async (accessToken, refreshToken, profile, done) => {
  try {
      // Extract email from profile
      let email = profile.emails && profile.emails.length > 0 ? profile.emails[0].value : null;

      if (!email) {
          // Manually fetch emails if not provided
          const response = await fetch("https://api.github.com/user/emails", {
              headers: { Authorization: `Bearer ${accessToken}` },
          });
          const emails = await response.json();
          email = emails.find(e => e.primary)?.email || null;
      }

      if (!email) {
          return done(new Error("No email found in GitHub profile"), null);
      }

      // ✅ Check if user already exists
      let user = await User.findOne({ email });

      if (!user) {
          user = new User({
              githubId: profile.id,
              email: email,
              name: profile.displayName || profile.username,
          });

          await user.save();
      } else {
          console.log("User already exists:", user);
      }

      return done(null, user);
  } catch (error) {
      return done(error);
  }
}));

// Serialize and Deserialize user
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

module.exports = passport;
