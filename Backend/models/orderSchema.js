import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    quantity: {type: Number,  required: true},
    product_id: {type: mongoose.Schema.Types.ObjectId, ref: 'product', required: true},
    sales_id: {type: mongoose.Schema.Types.ObjectId, ref: 'sales', required: true}
},)

const order = mongoose.model("order", orderSchema)

export default order