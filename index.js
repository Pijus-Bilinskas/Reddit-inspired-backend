import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import "dotenv/config"
import userRoutes from "./src/routes/user.js"
import groupRoutes from "./src/routes/group.js"
import postRoutes from "./src/routes/post.js"
import answerRoutes from "./src/routes/answer.js"


const app = express()
app.use(cors())
app.use(express.json())

mongoose
.connect(process.env.MONGO_CONNECTION)
.then(() => console.log("Connected to Data Base"))
.catch((err) => {
    console.log("ERR", err)
});

app.use(userRoutes)
app.use(groupRoutes)
app.use(postRoutes)
app.use(answerRoutes)


app.use((req, res) => {
    return res.status(404).json({ message: "This endpoint des not exist" });
  });

app.listen(process.env.PORT, () => {
    console.log("App started on port", process.env.PORT);
  });