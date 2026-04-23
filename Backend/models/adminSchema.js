import mongoose from 'mongoose'

const adminSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
})

const admin = mongoose.model("admin", adminSchema)

export default admin