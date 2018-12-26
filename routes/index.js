var express = require('express');
var router = express.Router();
var monk=require('monk');
var db=monk('localhost:27017/csr');
var users=db.get('users');
var categories=db.get('categories');
var events=db.get('events');
router.post('/home',function(req,res){
     console.log(req.body.email);
     console.log(req.body.Password);
     var data={
           email: req.body.email,
           password: req.body.password
              }   
    // console.log("login success");
     users.findOne(data,function(err,docs){
      if(docs){
          console.log(docs);
         var data = {"owner" : docs._id}
           console.log(data);
       req.session.user = docs;
       res.locals.user = req.session.user;
          
           categories.find({ }, function(e, categories){   
          events.find({ }, function(e, events){ 
         res.render('home', {title:'valid' ,'events' : events,'categories':categories});    }); });
       }
       else{
       res.render('login', {title:'Invalid'})
       }
});
});
router.post('/addevent',function(req,res){
   

    var data={
         name : req.body.name,
      location : req.body.location,
        date:req.body.date,
        owner:req.body.owner,
        tags:req.body.tags,
         category:req.body.category,
        registered:req.body.registered
       
         
          } 
    events.insert(data,function(err,docs){
  
    if(err)
  {
    console.log(err);
  }
  else
  {
    console.log(docs);

  }
   
    categories.find({ }, function(e, categories){   
          events.find({ }, function(e, events){ 
         res.render('home', {title:'valid' ,'events' : events,'categories':categories});    }); });
});
});
router.post('/addcategory',function(req,res){
   

    var data={
         name : req.body.c_name,
         } 
    categories.insert(data,function(err,docs){
  
    if(err)
  {
    console.log(err);
  }
  else
  {
    console.log(docs);

  }
  categories.find({ }, function(e, categories){   
          events.find({ }, function(e, events){ 
         res.render('home', {title:'valid' ,'events' : events,'categories':categories});    }); });
});
});

router.post('/add_user',function(req,res){
    console.log(req.body.name);
    console.log(req.body.email);
    console.log(req.body.password);

    var data={
         fname : req.body.f_name,
        lname : req.body.l_name,
        gender:req.body.gender,
        contact:req.body.contact,
          email : req.body.email,
        organisation:req.body.organisation,
          profession:req.body.profession,
     location:req.body.location,
        question:req.body.question,
        answer:req.body.answer,
          password : req.body.password,
        purpose:req.body.purpose
         
          } 
    users.insert(data,function(err,docs){
  
    if(err)
  {
    console.log(err);
  }
  else
  {
    console.log(docs);

  }
    res.redirect('/login');  
});
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CSR' });
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'CSR' });
});
router.get('/test', function(req, res, next) {
  res.render('test', { title: 'CSR' });
});
module.exports = router;
