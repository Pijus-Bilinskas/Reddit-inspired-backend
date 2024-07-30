import express from "express"
import {
    SIGN_UP,
    LOG_IN,
    GET_NEW_JWT_TOKEN
} from "../controllers/user.js"
import { auth } from "../middleware/auth.js"

const router = express.Router()

router.post("/register",  SIGN_UP);
router.post("/login",  LOG_IN);
router.get("/refresh-token", auth, GET_NEW_JWT_TOKEN);


export default router;