import {v4 as uuidv4} from "uuid"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import UserModel from "../models/user.js"

export const SIGN_UP = async (req, res) => {
    try{
        const salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(req.body.password, salt);

        const user = new UserModel({
            id: uuidv4(),
            name: req.body.name,
            email: req.body.email,
            password: hash,
            created_at: new Date(),
        })

        const response = await user.save();

        return res.status(200).json({ user:response })
    } catch (err) {
        return res.status(400).json({message: "ERR", err})
    }
};

export const LOG_IN = async (req, res) => {
    try{
        const user = await UserModel.findOne({email: req.body.email});

       if (!user) {
        return res.status(400).json({message: "User does not excist"})
       }

       const isPasswordMatch = bcrypt.compareSync(
        req.body.password,
        user.password
       );

       if (!isPasswordMatch) {
        return res.status(400).json({ message: "password does not match" });
        }
        
        const jwt_token = jwt.sign(
            { email: user.email, user_id: user.id },
            process.env.JWT_SECRET,
            {
                expiresIn: "2h"
            }
        );

        const jwt_refresh_token = jwt.sign(
            { user_id: user.id },
            process.env.JWT_REFRESH_SECRET,
            {
                expiresIn: "12h"
            }
        );

        return res.status(200).json({
            jwt_token: jwt_token,
            jwt_refresh_token: jwt_refresh_token
        })
    } catch (err) {
        return res.status(400).json({message: "ERR", err})
    }
};

export const GET_NEW_JWT_TOKEN = async (req, res) => { 
    try {
        const { jwt_refresh_token } = req.body;
      
        if (!jwt_refresh_token) {
          return res.status(400).json({ message: "Refresh token was not provided" });
        }
      
      
          jwt.verify(jwt_refresh_token, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
            if(err){
              return res.status(400).json({
                message: "Dude, refresh token aint valid or might be expired"
              });
            }
            
            const newJwtToken = jwt.sign(
              { email: decoded.email ,user_id: decoded.id },
              process.env.JWT_SECRET,
              { expiresIn: "2h" } 
            );
            
            const jwt_refresh_token = jwt.sign(
              {email: decoded.email ,user_id: decoded.id},
              process.env.JWT_REFRESH_SECRET,
              { expiresIn: "24h" }
            )
      
            return res.status(200).json({ 
              message: "successfully refreshed",
              jwt_token: newJwtToken, 
              jwt_refresh_token: jwt_refresh_token,
            });
            
          })
        } catch (err) {
          console.log("error at hand: ", err);
          return res.status(500).json({message: "Error occurred"})
        }
}