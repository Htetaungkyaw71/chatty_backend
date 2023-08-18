import prisma from "../db";

export const getAllMessages = async(req,res)=>{
    try {
        const roomId = req.params.roomId;
        const messages = await prisma.message.findMany({
          where: {
            roomId: roomId,
          },
          include: {
            sender: true,
          },
        });
        res.json({ data: messages });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
}

export const createMessage = async(req,res)=>{
    try {
        const user = await prisma.user.findUnique({
          where: {
            id: req.user.id,
          },
        });
        if (!user) {
          res.status(400).json({ message: 'User not found' });
          return;
        }
    
        const message = await prisma.message.create({
          data: {
            text: req.body.text,
            roomId: req.body.roomId,
            senderId: user.id,
          },
        });
    
        res.json({ data: message });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
}

function generateUniqueRoomId(userId1, userId2) {
  const sortedUserIds = [userId1, userId2].sort();
  const roomId = sortedUserIds.join('_');
  return roomId;
}

export const createRoom = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });
    if (!user) {
      res.status(400).json({ message: 'User not found' });
      return;
    }
  
    

    const otherUserId = req.body.otherUserId;
    const roomId = generateUniqueRoomId(user.id, otherUserId);

    res.json({ roomId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteMessage = async (req,res) => {
    try {
        const message = await prisma.message.delete({
            where:{
                id:req.params.id
            }
        })
        res.json({data:message})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
   
}

export const updateMessage = async (req,res) => {
    try {
        const message = await prisma.message.update({
            where:{
                id:req.params.id
            },
            data:{
                text:req.body.text
            },
        })
        res.json({data:message})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
   
}