const users = require('../models/userModel')
const jwt = require('jsonwebtoken')

// register logic
exports.registerController = async (req,res)=>{
    console.log("inside registerConroller");
    const {username,email,password} = req.body
    console.log(username,email,password);
    // check email is present in mongodb
    try{
        const existingUser = await users.findOne({email})
        console.log(existingUser);
        if(existingUser){
            // already user
            res.status(406).json("Account already exist!!! Please login")
        }else{
            // register user
            const newUser = new users({
                username,email,password,github:"",linkedin:"",profilePic:""
            })
            await newUser.save()
            res.status(200).json(newUser)
        }
        

    }catch(err){
        res.status(401).json(err)


    }
    
    

    // res.status(200).json("Register request received!!!")
    
    
}

// login logic
exports.loginController = async (req,res)=>{
    console.log("inside logincontroller");
    // get user details from req body 
    const {email,password}= req.body
    console.log(email,password);
    // check email & password in user model
    try{
        const existingUser = await users.findOne({email,password})
        if(existingUser){
            // allow login
            // generate token using jwt
            const token =jwt.sign({userId:existingUser._id},process.env.JWT_PASSWORD)

            res.status(200).json({
                user:existingUser,
                token
            })
        }else{
            // incorrect
            res.status(404).json("invalid email / password")
        }
    }catch(err){
        res.status(404).json(err)

    }
}

// profile updation logic
exports.editProfileController = async (req,res)=>{
    console.log("inside editProfileController");
    const {username,email,password,github,linkedin,profilePic}= req.body
    const uploadImg = req.file?req.file.filename:profilePic
    const userId = req.userId
    try{
        const upadatedUser = await users.findByIdAndUpdate({_id:userId},{
            username,email,password,github,linkedin,profilePic:uploadImg
        },{new:true})
        await upadatedUser.save()
        res.status(200).json(upadatedUser)

    }catch(err){
        res.status(401).json(err)
    }
}