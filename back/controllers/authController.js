const User  = require('../models/user')
const { hashPassword , comparePassword } = require('../helpers/auth') ;
const jwt = require('jsonwebtoken');

 const test = (req, res) => {
    res.json('test is working')
 }

//  registerEndPoint..
const registerUser = async(req,res) => {
   try{
      const {name, password, email} = req.body;
    //   Check if name was entered
    if(!name) {
        return res.json({
            error:'name is required'
        })
    };
    // check password is good

    if(!password || password.length < 6){
        return res.json({
            error:'Password is required and should be at least 6 character long'
        })
    };
    // check email
    const exist = await User.findOne({email});
    if(exist) {
        return res.json({
            error:'Email is taken already'
        })
    }
     const hashedPasword = await hashPassword(password)
    const user = await User.create({
        name, email, password:hashedPasword,
    })

    return res.json(user)

   }catch (error) {
     console.log(error);
   }
}


// login EndPoint

const loginUser = async(req, res) => {
    
    try{
    const { email, password} = req.body;

    //check if user exists..

    const user = await User.findOne({email});
    if(!user) {
        return res.json({
            error: "No user found"
        })
    }

    // check if passwords match
    const match = await comparePassword(password, user.password)

    if(match) {
        jwt.sign({email:  user.email, id: user._id, name: user.name}, process.env.JWT_SECRET, {} , (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json(user)
        })
       res.json('passwords match')
    }
    if(!match){
        res.json({
            error: "Password do not match"
        })
    }
    } catch (error) {
  console.log(error)
    }
}


// const getProfile = (req, res) => {
//       const {token} = req.cookies
// }

module. exports = {
    test,
    registerUser,
    loginUser,
   
   

}