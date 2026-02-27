const foodPartnerModel=require('../models/foodpartner.models');
const userModel=require('../models/user.models')
const jwt=require("jsonwebtoken");

async function authFoodPartnerMiddleware(req,res,next){
  const token=req.cookies.token;
    if(!token){
        return res.status(401).json({
            msg:"Please login First"
        })
    }
    try{
        const decode=jwt.verify(token,process.env.JWT_SECRET)
        const foodPartner=await foodPartnerModel.findById(decode.id);
        req.foodPartner=foodPartner;
        next();
    } catch(err){
        return res.status(401).json({
            msg:"Invalid token"
        })

    }

}
async function authUserMiddleware(req,res,next){
  const token=req.cookies.token;
    if(!token){
        return res.status(401).json({
            msg:"Please login First"
        })
    }
    try{
        const decode=jwt.verify(token,process.env.JWT_SECRET)
        const user=await userModel.findById(decode.id);
        req.user=user;
        next();
    } catch(err){
        return res.status(401).json({
            msg:"Invalid token"
        })

    }

}

module.exports={
    foodPartnerModel,authFoodPartnerMiddleware,authUserMiddleware
}