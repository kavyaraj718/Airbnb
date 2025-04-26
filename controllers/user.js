const User = require("../models/user.js");

module.exports.signUp = (req, res) => {
    res.render("users/signup.ejs");
};

module.exports.postSignUp = async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if(err) {
                return next();
            }
            req.flash("success", "Welcome to WanderLust");
            res.redirect("/listings");
        });
    } catch(e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.login = (req, res) => {
    res.render("users/login.ejs");
};

module.exports.postLogin = async (req, res) => {
    req.flash("success", "Welcome to WanderLust you Are loged in!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        req.flash("success", "You are logged out now!");
        res.redirect("/listings");
    })
};