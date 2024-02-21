import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { create, deletepost, getposts, likePost, lovePost, updatepost, getPostDetails } from "../controllers/post.controller.js";

const router = express.Router();


router.post("/create", verifyToken, create);
router.get("/getposts", getposts);
router.post("/likepost/:postId", verifyToken, likePost);
router.post("/lovepost/:postId", verifyToken, lovePost);
router.delete("/deletepost/:postId", verifyToken, deletepost);
router.put("/updatepost/:postId", verifyToken, updatepost);
router.get("/:postId", getPostDetails);



export default router;