import express from "express"
import {
    INSERT_GROUP,
    ALL_GROUPS,
    DELETE_GROUP_BY_ID
} from "../controllers/group.js"
import { auth } from "../middleware/auth.js"

const router = express.Router()

router.get("/groups",  ALL_GROUPS);
router.post("/groups", auth,  INSERT_GROUP);
router.delete("/groups/:id", auth, DELETE_GROUP_BY_ID);


export default router;
