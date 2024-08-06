const carController = require('../controllers/carController')
const express = require('express');
<<<<<<< HEAD
const { requireAuth } = require('../middleware/authMiddleware');
const router = express.Router()

router.post('/cars',requireAuth, carController.getCars)
router.post('/addCar',requireAuth,carController.addCar)
router.get('/getCarsContext',requireAuth, carController.forCarContext)
=======
const router = express.Router()

router.post('/cars', carController.getCars)
router.post('/addCar',carController.addCar)
router.get('/getCarsContext', carController.forCarContext)
>>>>>>> ceb6c71f01006460900f92daa38f3823bedae667
module.exports = router;
