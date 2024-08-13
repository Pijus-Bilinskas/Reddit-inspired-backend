import express from "express"
import {
    INSERT_POST,
    GET_ALL_POSTS,
    DELETE_POST,
    REACT_TO_POST
} from "../controllers/post.js"
import { auth } from "../middleware/auth.js"

const router = express.Router()

router.get("/group/:id/posts",  GET_ALL_POSTS);

router.post("/group/:id/posts", auth,  INSERT_POST);
router.post("/post/:id/react", auth, REACT_TO_POST);

router.delete("/post/:id", auth, DELETE_POST);


export default router;
