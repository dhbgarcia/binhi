import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    email: {type: String, required: true, unique:true},
    username: {type: String, required: true, unique: true},
    First_name: {type: String, required: true},
    Last_name: {type: String, required: true},
    password: {type: String, required: true},
    userType: {type: String, default: "User"},
})

const user = mongoose.model("user", userSchema)

export default user