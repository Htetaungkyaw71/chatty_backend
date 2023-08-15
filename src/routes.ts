import {Router} from "express";
import { createMessage, deleteMessage, getAllMessages, updateMessage } from "./handlers/message";
import { body } from "express-validator";
import { validateInput } from "./modules/middleware";

const router = Router()

/**
 * Message
 */
router.get("/messages/:roomId", getAllMessages );
  
router.post("/message", 
body("text").isString(),
body("roomId").isString(),
validateInput, createMessage);
  
router.put("/message/:id",
body("text").isString(),
validateInput, updateMessage);
  
router.delete("/message/:id", deleteMessage);


/**
 * Contact
 */
router.get("/contact/", (req, res) => {
    res.json({ message: "contact" });
  });
  
  router.post("/contact", (req, res) => {});
  
  router.delete("/contact/:id", (req, res) => {});


export default router;