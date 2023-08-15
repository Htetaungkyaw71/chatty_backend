import prisma from "../db";

export const getAllContact = async(req,res)=>{
    const user = await prisma.user.findUnique({
        where:{
            id:req.user.id
        }
    })
    if(!user){
        res.status(400)
        res.json({messgae:"user is not found"})
        return;
    }

    const contact = await prisma.contact.findMany({
        where:{
           belongToId:user.id
        }
    })
    res.json({data:contact})
}

export const createContact = async(req,res)=>{
    const user = await prisma.user.findUnique({
        where:{
            id:req.user.id
        }
    })
    if(!user){
        res.status(400)
        res.json({messgae:"user is not found"})
        return;
    }
    const existEmail = await prisma.contact.findUnique({
        where:{
            belongToId:user.id,
            otherUserEmail:req.body.otherUserEmail
        }
    })
    if(existEmail){
        res.status(400)
        res.json({messgae:"Email is already exist"})
        return;
    }
    const contact = await prisma.contact.create({
        data:{
            otherUserId:req.body.otherUserId,
            otherUserName:req.body.otherUserName,
            otherUserEmail:req.body.otherUserEmail,
            otherUserAvater:req.body.otherUserAvater,
            belongToId:user.id
        }
    })
    res.json({data:contact})
}

export const deleteContact = async (req,res) => {
    const contact = await prisma.contact.delete({
        where:{
            id:req.params.id
        }
    })
    res.json({data:contact})
}
