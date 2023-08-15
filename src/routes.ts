import {Router} from "express";
import { createMessage, deleteMessage, getAllMessages, updateMessage } from "./handlers/message";
import { body } from "express-validator";
import { validateInput } from "./modules/middleware";
import { createContact, deleteContact, getAllContact } from "./handlers/contact";

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
router.get("/contact/", getAllContact);
    
router.post("/contact",
    body("otherUserId").isString(),
    body("otherUserName").isString(),
    body("otherUserEmail").isString(),
    body("otherUserAvater").isString(),    
    validateInput, createContact);
    
router.delete("/contact/:id", deleteContact);


export default router;