import express from "express"
import {
    INSERT_ANSWER,
    GET_ALL_ANSWERS_WITH_POST,
    DELETE_ANSWER,
    LIKE_ANSWER,
    DISLIKE_ANSWER
} from "../controllers/answer.js"
import { auth } from "../middleware/auth.js"

const router = express.Router()

router.get("/post/:id/answers",  GET_ALL_ANSWERS_WITH_POST);

router.post("/post/:id/answers", auth,  INSERT_ANSWER);
router.post("/answer/:id/like", auth,  LIKE_ANSWER);
router.post("/answer/:id/dislike", auth,  DISLIKE_ANSWER);

router.delete("/answer/:id", auth, DELETE_ANSWER);


export default router;