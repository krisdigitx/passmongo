var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { user: req.user, title: "KSHK!" });
});


router.get('/register', function(req,res){
  res.render('index', {});
});

router.post('/register', function(req,res){
  Account.register(new Account({username: req.body.username, email: req.body.email}),
      req.body.password, function(err,account){
        if (err){
          return res.render('index',{catcherror: "Sorry that username already exists. Try signing up as another user."});
        }
        passport.authenticate('local')(req,res,function(){
          res.redirect('/');
        });
      });
});

router.get('/login', function(req,res){
    res.render('login', {user: req.user});
});

router.post('/login',  function(req,res,next){
    passport.authenticate('local', function(err, user, info){
        if (err){
            return next(err);
        }

        if (!user){
            return res.render ('index', {catcherror: "Invalid username or password."})
        }
        req.logIn(user, function(err){
            if (err) { return next(err);}
            return res.redirect('/success');

        });
    })(req,res,next);

});

router.get('/success', function(req,res){
    res.render('chat.ejs', {title: "dummy", user: req.user.username})
});

router.get('/logout', function(req,res){
   req.logout();
   res.redirect('/');
});

router.get('/ping', function(req,res){
   res.status(200).send("pong!");
});

module.exports = router;
