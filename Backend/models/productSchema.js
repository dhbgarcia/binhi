import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    pname: {type: String, required: true},
    type: {type: String, required: true},
    price: {type: Number, required: true},
    basePrice: {type: Number, required: true},
    description: {type: String},
    quantity: {type: Number, required: true},
    image: {type: String},
})

const product = mongoose.model("product", productSchema)

export default product
