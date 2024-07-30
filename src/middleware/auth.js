import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
    const token = req.headers.authorization;

    if(!token) {
        return res.status(401).json({message: "authentication not found"})
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) {
            return res.status(401).json({ message: "Bad authentication" })
        }
        req.user = { user_id: decoded.user_id }
        return next();
    });
};