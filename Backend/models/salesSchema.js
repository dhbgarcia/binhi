import mongoose from 'mongoose'

const salesSchema = new mongoose.Schema({
    user_id: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    status: {type: String, default: "Pending"}
}, {timestamps: true})

const sales = mongoose.model("sales", salesSchema)

export default sales