import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt"

export const createJWT = (user) => {
    const token = jwt.sign({id:user.id,email:user.email},process.env.JWT_SECRET)
    return token
}

export const protect = (req, res, next)=>{
    const bearer = req.headers.authorization;
    if(!bearer){
        res.status(401)
        res.json({message:"Not authorized"})
        return;
    }
    const [,token] = bearer.split(" ");
    if(!token){
        res.status(401)
        res.json({message:"There is no token"})
        return;
    }

    try {
        const payload = jwt.verify(token,process.env.JWT_SECRET)
        req.user = payload;
        next();
        return;
    } catch (error) {
        console.error(error)
        res.status(401)
        res.json({message:"Token is invalid"})
        return;
    }
}

export const comparepassword = (password, hash)=>{
    return bcrypt.compare(password,hash)
}

export const hashpassword = (password)=>{
    return bcrypt.hash(password, 5)
}