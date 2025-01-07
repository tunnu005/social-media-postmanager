import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
const Auth = (req, res, next) => {
    // Get the token from cookies
    const token = req.cookies.token;
    
    console.log('token at auth',token)
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    // Verify the token
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decode : ",decode)
    req.userId = decode.id;
    next();
};

export default Auth;
