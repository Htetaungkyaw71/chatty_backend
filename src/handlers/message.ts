import prisma from "../db";

export const getAllMessages = async(req,res)=>{
    const roomId = req.params.roomId
    const messsages = await prisma.message.findMany({
        where:{
            roomId:roomId
        }
    })
    res.json({data:messsages})
}

export const createMessage = async(req,res)=>{
    const user = await prisma.user.findUnique({
        where:{
            id:req.user.id
        }
    })
    if(!user){
        res.status(400)
        res.json({messgae:"user is not found"})
    }
    const messsage = await prisma.message.create({
        data:{
            text:req.body.text,
            roomId:req.body.roomId,
            senderId:user.id
        }
    })
    res.json({data:messsage})
}

export const deleteMessage = async (req,res) => {
    const message = await prisma.message.delete({
        where:{
            id:req.params.id
        }
    })
    res.json({data:message})
}

export const updateMessage = async (req,res) => {
    const message = await prisma.message.update({
        where:{
            id:req.params.id
        },
        data:{
            text:req.body.text
        }
    })
    res.json({data:message})
}