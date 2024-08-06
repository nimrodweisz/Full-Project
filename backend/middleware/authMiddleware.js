const jwt = require('jsonwebtoken')

const requireAuth = (req,res,next) => {
    const token = req.cookies.jwt

    if(token){
        jwt.verify(token,"my_secret",(err,decodedToken) => {
            if(err){
                console.log(err.message)
                res.status(401).send('cookieinvalid')
            }
          
            else{
                console.log(decodedToken.id)
                 console.log(decodedToken)
                next()
            }
        })
    }
    else{
        res.status(401).send('nocookie')
    }
}
module.exports = {requireAuth}
