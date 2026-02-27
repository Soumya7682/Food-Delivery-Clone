const userModel=require("../models/user.models");
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken');
const foodpartnersModel = require("../models/foodpartner.models");

async function registerUser(req,res){
    const {fullname,email,password}=req.body;

    // Validate required fields
    if(!fullname || !email || !password){
        return res.status(400).json({
            message:"fullname, email, and password are required"
        })
    }

const isUserAlreaduExists=await userModel.findOne({
    email
})

if(isUserAlreaduExists){
    return res.status(400).json({
        message:"User already exists"
    })
}

const hashedPassword=await bcrypt.hash(password,10);

const user=await userModel.create({
    fullname,
    email,
    password:hashedPassword
})
const token=jwt.sign({
    id:user._id,
}, process.env.JWT_SECRET)
res.cookie("token",token)
res.status(201).json({
    message:"User registered successfully",
    user:{
        _id:user._id,
        email:user.email,
        fullname:user.fullname

    }
})

}

async function loginUser(req,res){
    const{email,password}=req.body;
    const user=await userModel.findOne({
        email
    })
    if(!user){
        return res.status(400).json({
            message:"invalid email or Password"
        })
    }
    const isPasswordValid= await bcrypt.compare(password,user.password);
    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }
   const token=jwt.sign({
    id:user._id,
}, process.env.JWT_SECRET)
res.cookie("token",token)
res.status(200).json({
    message:"User logged in successfully",
    user:{
        _id:user._id,
        email:user.email,
        fullname:user.fullname

    }
})

}
async function logoutUser(req,res){
    res.clearCookie("token");
    res.status(200).json({
        message:"User logged out Successfully"
    });
}

async function registerfoodPartner(req,res){
    const {fullname,email,password,contactName,phoneNumber,address}=req.body;
    
    // Validate required fields
    if(!fullname || !email || !password || !contactName || !phoneNumber || !address){
        return res.status(400).json({
            message:"fullname, email, password, contactName, phoneNumber, and address are required"
        })
    }
    
    const isFoodPartnerExists=await foodpartnersModel.findOne({
    email
})

if(isFoodPartnerExists){
    return res.status(400).json({
        msg:"FoodPartner already Exist"
    })
}

const hashedPassword=await bcrypt.hash(password,10);

const foodpartner=await foodpartnersModel.create({
    fullname,
    email,
    password:hashedPassword,
    contactName,
    phoneNumber,
    address
})
const token=jwt.sign({
    id:foodpartner._id,
}, process.env.JWT_SECRET)
res.cookie("token",token)
res.status(201).json({
    message:"FoodPartner registered successfully",
    foodpartner:{
        _id:foodpartner._id,
        email:foodpartner.email,
        fullname:foodpartner.fullname,
        contactName:foodpartner.contactName,
        phoneNumber:foodpartner.phoneNumber,
        address:foodpartner.address

    }
})
}


async function loginFoodPartner(req,res){
    const{email,password}=req.body;
    const foodpartner=await foodpartnersModel.findOne({
        email
    })
    if(!foodpartner){
        return res.status(400).json({
            message:"invalid email or Password"
        })
    }
    const isPasswordValid= await bcrypt.compare(password,foodpartner.password);
    if(!isPasswordValid){
        return res.status(400).json({
            message:"Invalid email or password"
        })
    }
   const token=jwt.sign({
    id:foodpartner._id,
}, process.env.JWT_SECRET)
res.cookie("token",token)
res.status(200).json({
    message:"FoodPartner logged in successfully",
    foodpartner:{
        _id:foodpartner._id,
        email:foodpartner.email,
        fullname:foodpartner.fullname

    }
})

}
async function logoutfoodPartner(req,res){
    res.clearCookie("token");
    res.status(200).json({
        message:"foodpartner logged out Successfully"
    });
}

module.exports={
    registerUser,
    loginUser,
    logoutUser,
    registerfoodPartner,
    loginFoodPartner,
    logoutfoodPartner
}