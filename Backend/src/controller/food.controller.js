const foodModel = require('../models/food.models');
const storageServes = require("../Storage/storage.service")
const { v4: uuid } = require("uuid");
const likeModel = require('../models/likes.model');
const saveModel = require('../models/save.model');

async function createFood(req, res) {
    // console.log(req.foodPartner)
    // console.log(req.body);
    // console.log(req.file);
    const fileUploadResult = await storageServes.uploadFile(req.file.buffer, uuid());
    // console.log(fileUploadResult);
    const foodItem = await foodModel.create({
        name: req.body.name,
        description: req.body.description,
        video: fileUploadResult.url,
        foodPartner: req.foodPartner._id
    })
    res.status(201).json({
        message: "food created Successully",
        food: foodItem
    })
    // res.send("Food Item created")
}
async function getFoodItems(req, res, next) {
    const foodItems = await foodModel.find({});
    res.status(200).json({
        message: "Food Item fetched Successfully",
        foodItems
    })
}
async function likeFood(req, res) {
    const { foodId } = req.body;
    const user = req.user;
    if (!foodId) {
        return res.status(400).json({ message: "foodId is required" });
    }
    if (!user) {
        return res.status(401).json({ message: "User not authenticated" });
    }
    const food = await foodModel.findById(foodId);
    if (!food) {
        return res.status(404).json({ message: "Food not found" });
    }
    const isAlreadyLiked = await likeModel.findOne({
        user: user._id,
        food: foodId
    });
    if (isAlreadyLiked) {
        await likeModel.deleteOne({
            user: user._id,
            food: foodId
        });
        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { likeCount: -1 }
        });
        return res.status(200).json({
            message: "Food unliked successfully"
        });
    }
    const like = await likeModel.create({
        user: user._id,
        food: foodId
    });
    await foodModel.findByIdAndUpdate(foodId, {
        $inc: { likeCount: 1 }
    });
    res.status(201).json({
        message: "food liked successfully",
        like
    });

}
async function saveFood(req, res) {
    const { foodId } = req.body;
    const user = req.user;
    if (!foodId) {
        return res.status(400).json({ message: "foodId is required" });
    }
    if (!user) {
        return res.status(401).json({ message: "User not authenticated" });
    }
    const food = await foodModel.findById(foodId);
    if (!food) {
        return res.status(404).json({ message: "Food not found" });
    }
    const isAlreadySaved = await saveModel.findOne({
        user: user._id,
        food: foodId
    });
    if (isAlreadySaved) {
        await saveModel.deleteOne({
            user: user._id,
            food: foodId
        });
        return res.status(200).json({
            message: "Food unSaved successfully"
        });
    }
    const save = await saveModel.create({
        user: user._id,
        food: foodId
    });
    res.status(201).json({
        message: "food saved successfully",
        save
    });
}
async function getSavedFoods(req, res) {
    const userId = req.user._id;
    // Find all saves for this user, populate food details
    const saves = await require('../models/save.model').find({ user: userId }).populate({
        path: 'food',
        populate: { path: 'foodPartner' }
    });
    const savedVideos = saves.map(s => s.food);
    res.status(200).json({ savedVideos });
}

module.exports = {
    createFood, getFoodItems, likeFood, saveFood, getSavedFoods
}
