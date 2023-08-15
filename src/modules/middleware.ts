import {validationResult} from "express-validator"

export const validateInput = (req,res,next)=>{
    const errors = validationResult(req)
    console.log(errors)
    if(!errors.isEmpty()){
        res.status(400)
        res.json({errors:errors.array()})
    }else{
        next()
    }
    
}