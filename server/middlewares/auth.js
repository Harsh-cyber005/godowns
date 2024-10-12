const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { z } = require('zod');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const { User } = require('../db');

async function handleSignup(req, res) {
    const requiredBody = z.object({
        username: z.string().min(3).max(100),
        password: z.string().min(5).max(50)
    })
    const parsedDataWithSuccess = requiredBody.safeParse(req.body);
    if (!parsedDataWithSuccess.success) {
        return res.status(400).json({
            message: "Invalid input, provide valid email, name and password",
            error: parsedDataWithSuccess.error.issues
        });
    }

    const password = req.body.password;
    const username = req.body.username;

    if (!password || !username) {
        return res.status(400).json({
            message: "Invalid input"
        });
    }
    
    
    try{
        const exists = await User.findOne({username: username});
        if (exists) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 5);
        
        const user = new User({
            username: username,
            password: hashedPassword,
        })
        await user.save();
        res.status(201).json({
            message: "User created"
        });
    } catch(e){
        console.log(e);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

async function handleSignin(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    
    if (!username || !password) {
        return res.status(400).json({
            message: "Invalid input"
        });
    }
    const user = await User.findOne({
        username: username
    })
    
    
    try{
        if (user) {
            const valid = await bcrypt.compare(password, user.password);
            
            if (!valid) {
                return res.status(401).json({
                    message: "Invalid credentials"
                });
            }
        }
    
        const tokenSecret = JWT_SECRET;
        const token = jwt.sign({
            id: user._id.toString(),
        }, tokenSecret,
            {
                expiresIn: '30d'
            }
        );
        res.json({
            message: "Signin successful",
            token: token,
        });
    } catch(e) {
        console.log(e);
        res.status(500).json({
            message: "Internal server error"
        });
    }
}

module.exports = {handleSignup, handleSignin};