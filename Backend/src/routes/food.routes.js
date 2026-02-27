const express=require('express');
const foodController=require('../controller/food.controller')
const foodPartnerController=require('../controller/food-partner.controller')
const authMiddleware=require('../middlewares/auth.middlewares')
const router=express.Router();
const multer=require('multer') //for server read the file 
//beacuse express cant read the file directly

const upload=multer({
    storage:multer.memoryStorage(),
})
router.post('/',authMiddleware.authFoodPartnerMiddleware,upload.single("video"),foodController.createFood)
router.get('/',authMiddleware.authFoodPartnerMiddleware,foodController.getFoodItems)
router.post('/like',authMiddleware.authUserMiddleware,foodController.likeFood)

router.get('/saved',authMiddleware.authUserMiddleware,foodController.getSavedFoods)

module.exports=router;

// upload.single("video") "video" is the name of the file wat u send from frontend as same name is wtite here