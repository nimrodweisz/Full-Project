const jwt = require("jsonwebtoken");
const carData = require('../models/cardatas')
const User = require('../models/users')
exports.getCars = async(req,res) =>{
    const { userIde } = req.body;
    const token = await req.cookies.jwt;
    const user = await User.login(userIde)
    console.log(1)
    if(!token){
        
        res.status(401);
       
    }
    else if(user === null) {
        res.status(401)
        return
    }
    else if(user.isManager === '0'){
        
        const cars = await carData.find({gdud : user.gdud})
        console.log(cars)
        res.send(cars)
    }
    else{

        const ManCars = await carData.find()
        res.send(ManCars)
    }

}
exports.forCarContext = async(req,res) => {
    const cars = await carData.find()
    res.send(cars)
}
exports.addCar = async(req,res) => {
    const {gdud,makat,kshirot,carNumber}= req.body
    const existingCar = await carData.findOne({ carNumber });
    
    try {
        if(existingCar){
            console.log('not Saved')
             res.status(400).send('car Cannot be saved')
             console.log('not saveeeeed')
        }
        else if(carNumber.length > 7 || carNumber.length < 6){
            res.status(403).send('car not saved')
        }
        else{
            console.log('saved')
            const newCar = new carData({ gdud, makat, kshirot, carNumber });
            
        await newCar.save();
        res.status(200).json({ message: 'Car added successfully!' });

        }
        
      } catch (error) {
        console.error('Error saving car:', error);
        res.status(500).json({ message: 'Internal server error.' });
      }
    
}
