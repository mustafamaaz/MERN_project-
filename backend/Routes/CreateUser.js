const express = require('express');
const router = express.Router();
const user = require('../models/User');
const {body,ValidatorResult, validationResult } = require('express-validator');
// npm install --save express-validator

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtsecret = "mynameismaazmustafafromrawalpind";


// for signup page
router.post("/createuser",[
body('email','enter correct email').isEmail(),
body('name','increase length').isLength({min: 3}),
body('password','length must be 5').isLength({min: 5})
]
,async(req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    let salt = await bcrypt.genSalt(10);
    let secuirepass = await bcrypt.hash(req.body.password,salt);


  try {
   await user.create({
    // if we want to testing to adding data to database throught thunder client body then we change header and replace req.body.name etc
   // for static data enty{
        // name:"maaz mustafa",
        // password:"1234",
        // email: "email@example",
        // location:"sadiqabad"
        // }

          name:req.body.name,
        password:secuirepass,
        email: req.body.email,
        location:req.body.location
    })
    res.json({success:true});
  } catch (error) {
    console.log("error in createuser file ",error);
    res.json({success:false});
  }
});


// for login page

// from frontend all data travell through url in this page which is server side and backend

router.post("/login",[
  body('email','enter correct email').isEmail(),
  body('password','length must be 5').isLength({min: 5})
  ]
  ,async(req,res)=>{
  

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }


  let email = req.body.email;
  // this user is schema and database and we find spacific detail by pass as arrgumrnts
  
    try {
     let userdata =  await user.findOne({email}); 
      // in this line if email is match with db then whole data of that is email is store in userdata
      if(!userdata){
        return res.status(400).json({errors: "Enter Correct Email"});
      }

      const comparepass = await bcrypt.compare(req.body.password ,userdata.password)

      if(!comparepass){
        return res.status(400).json({errors: "Enter Correct password"});
      }

      const data = {
        user:{
          id: userdata.id 
           // taking id of data from database
        }
      }

      const authToken = jwt.sign(data,jwtsecret); 
       //data is payout and jwtsecret is signature

      return res.json({success:true,authToken:authToken});    

    } catch (error) {
      console.log("error");
      res.json({success:false});
    }
  });

module.exports = router;