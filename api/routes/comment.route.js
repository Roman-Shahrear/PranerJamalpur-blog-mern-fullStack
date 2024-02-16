import express from "express";
import veryfyToken from "../utils/verifyUser.js";
import { createComment } from "../controllers/comment.controller.js";

const router = express.Router();

router.post("/create", veryfyToken, createComment);


export default router;