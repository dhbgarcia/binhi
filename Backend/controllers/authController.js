import mongoose from "mongoose";
import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from 'dotenv';

dotenv.configDotenv({path:'.env'})

// Secret key for JWT
const JWT_SECRET = process.env.JWT_SECRET_KEY;

// Signup handler
const signUp = async (req, res) => {
    try {
        const { firstName, lastName, username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const existingUsername = await User.findOne({ username });
        if(existingUsername){
            return res.status(400).json({ message: "Username already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ 
            email: email, 
            password: hashedPassword,
            username: username,
            First_name: firstName,
            Last_name: lastName,
        });

        await newUser.save();

        const token = jwt.sign({ 
            id: newUser._id, 
            userType: "User",
            email: newUser.email,
            username: newUser.username,
            firstName: newUser.First_name,
            lastName: newUser.Last_name,
        }, JWT_SECRET, { expiresIn: "1h" });

        res.status(201).json({ message: "User created", token });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(email, password)

        const existingUser = await User.findOne({ email });
        if(!existingUser){
            return res.status(404).json({message: "Email not found, sign up first"})
        }
        
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Incorrect password" });
        }
        console.log("User found:", existingUser);
        const token = jwt.sign(
            {
                id: existingUser._id,
                email: existingUser.email,
                userType: existingUser.userType,
                username: existingUser.username,
                firstName: existingUser.First_name,
                lastName: existingUser.Last_name,
            }, JWT_SECRET, { expiresIn: "1h" }
        );
        res.status(200).json({
            message: "Login successful",
            token,
            userType: existingUser.userType,
        });

    } catch (err) {
        console.error("Sign in error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};


export { signUp, signIn }
