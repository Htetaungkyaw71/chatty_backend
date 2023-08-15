import prisma from "../db";
import { comparepassword, createJWT, hashpassword } from "../modules/auth";


export const createNewUser = async(req, res)=>{


    const user = await prisma.user.findUnique({
        where:{
            email:req.body.email
        }
    })
    if(user){
        res.status(401)
        res.json({message:"email is already exists"})
        return;
    }
    const hash = await hashpassword(req.body.password)
    const newUser = await prisma.user.create({
        data:{
                name:req.body.name,
                email:req.body.email,
                password: hash
            }
        })
    const token = createJWT(newUser)
    res.json({data:{...newUser,token}})
   
}

export const signin = async(req,res)=>{
    const user = await prisma.user.findUnique({
        where:{
            email:req.body.email
        }
    })
    if(!user){
        res.status(401)
        res.json({message:"email is incorrect"})
        return;
    }
    const isValid = await comparepassword(req.body.password,user.password)
    
    if(!isValid){
        res.status(401)
        res.json({message:"password is incorrect"})
        return;
    }
    
    const token = createJWT(user);
    res.json({data:{...user,token}})
}