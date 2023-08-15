import {Router} from "express";

const router = Router()

/**
 * Message
 */
router.get("/messages/:roomId", (req, res) => {
    res.json({ message: "product" });
  });
  
  router.post("/message", (req, res) => {});
  
  router.put("/message/:id", (req, res) => {});
  
  router.delete("/message/:id", (req, res) => {});


/**
 * Contact
 */
router.get("/contact/", (req, res) => {
    res.json({ message: "product" });
  });
  
  router.post("/contact", (req, res) => {});
  
  router.delete("/contact/:id", (req, res) => {});


export default router;