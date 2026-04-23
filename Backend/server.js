import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors';
import mongoose from 'mongoose'

const app = express();
const PORT = 3000;
dotenv.configDotenv({path:'.env'})         // Change path of .env file to inside the backend folder

const MONGO_URI = process.env.MONGO_URI
app.use(express.urlencoded({extended: true}));
app.use(express.json());

mongoose.connect(MONGO_URI)
.then(()=>{
    app.listen(PORT, () => {
        console.log(`Listening on port: ${PORT}`)
    })  
})
.catch((error) => {
    console.log(error)
})


import orderRouter from './routes/orderRouter.js';
import productRouter from './routes/productRouter.js';
import userRouter from './routes/userRouter.js';
import salesRouter from './routes/salesRouter.js';
import authRouter from './routes/authRouter.js';
import cartRouter from './routes/cartRouter.js';

app.use(cors({
    origin: 'http://localhost:5173',    // This should be the url of the client/frontend when deployed
    credentials: true                   // Allow credentials (cookies) to be sent with requests
  }));




orderRouter(app);
productRouter(app);
userRouter(app);
salesRouter(app);
authRouter(app);
cartRouter(app);
