const {Router} = require('express');
const authController = require('../controllers/authController')
const { requireAuth } = require('../middleware/authMiddleware');
const router = Router();
router.post('/login',authController.handleLogin)
const dashboardRouter = Router();
router.use('/dashboard',requireAuth,dashboardRouter)



dashboardRouter.post('/',requireAuth,authController.dashboard)
dashboardRouter.get('/manager',requireAuth,authController.getUsers )
module.exports = router;
