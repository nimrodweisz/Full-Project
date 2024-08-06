const carController = require('../controllers/carController')
const express = require('express');
const { requireAuth } = require('../middleware/authMiddleware');
const router = express.Router()

router.post('/cars',requireAuth, carController.getCars)
router.post('/addCar',requireAuth,carController.addCar)
router.get('/getCarsContext',requireAuth, carController.forCarContext)
module.exports = router;
