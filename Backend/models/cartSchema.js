import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    cartItems: [
        {
            pname: {type: String, required: true},
            type: {type: String, required: true},
            price: {type: Number, required: true},
            basePrice: {type: Number, required: true},
            description: {type: String},
            quantity: {type: Number, required: true},
            image: {type: String},
        }
    ] 
},)

const cart = mongoose.model("cart", cartSchema)

export default cart