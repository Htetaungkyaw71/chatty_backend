import prisma from "../db";

export const getAllContact = async (req, res) => {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: req.user.id,
        },
        include: {
          contacts: true,
        },
      });
  
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
  
      res.json({ data: user.contacts });
    } catch (error) {
      console.error("Error in getAllContact:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
export const createContact = async(req,res)=>{
    try {
        const existingContact = await prisma.contact.findFirst({
            where: {
                otherUserId: req.body.otherUserId,
                belongToId: req.user.id
            }
        });

      
    
        if (existingContact) {
            res.status(409).json({ message: 'Contact already exists' });
            return;
        }
        const contact = await prisma.contact.create({
            data:{
                otherUserId:req.body.otherUserId,
                otherUserName:req.body.otherUserName,
                otherUserEmail:req.body.otherUserEmail,
                otherUserAvater:req.body.otherUserAvater,
                belongToId:req.user.id
            }
        })
        res.json({data:contact})
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
    
}

export const deleteContact = async (req,res) => {
    try {
        const contact = await prisma.contact.delete({
            where:{
                id:req.params.id
            }
        })
        res.json({data:contact})
    } catch (error) {
        console.error("Error in deleteContact:", error);
        res.status(500).json({ message: "Internal server error" });
    }
   
}
