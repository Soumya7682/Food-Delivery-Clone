const foodPartnerModel=require('../models/foodpartner.models');
const foodModel=require('../models/food.models');
const mongoose = require('mongoose');


async function getFoodPartnerProfile(req,res){

    const foodPartnerId = req.params.id;
    const foodPartner = await foodPartnerModel.findById(foodPartnerId);
    const foodItemsByFoodPartner = await foodModel.find({ foodPartner: foodPartnerId });
    console.log('DEBUG: foodPartnerId:', foodPartnerId);
    console.log('DEBUG: foodItemsByFoodPartner:', foodItemsByFoodPartner);
    if (!foodPartner) {
        return res.status(404).json({ message: "Food partner not Found" });
    }
    res.status(200).json({
        message: "Food partner retrived successfully",
        foodPartner: {
            ...foodPartner.toObject(),
            foodItems: foodItemsByFoodPartner
        }
    });
}
module.exports={
    getFoodPartnerProfile
};