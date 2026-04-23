import user from '../models/userSchema.js';
import mongoose from 'mongoose';


// Get all users
const getAllUsers = async (req, res) => {
  try {
    const { userType } = req.query;  // get userType from query params
    const filter = {};

    if (userType) {
      filter.userType = userType;  // add to filter if present
    }

    const users = await user.find(filter);  // apply filter here
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Failed to Retrieve Users', error: error.message });
  }
}

// Get a user
const getUser = async(req,res) => {
    const id = req.param.id;
     if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid User ID format' });
      }
    
    try {
        const findUser = await user.findById(id);
        if(!findUser) return res.status(404).send('User not found');
        res.status(200).json(findUser);
    }catch(error){
        res.status(500).json({message: 'Error retrieving user', error: error.message})
    }
}
// remove user
const removeUser = async (req, res) => {
    const id = req.params.id;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid User ID format' });
    }
  
    try {
      const deleted = await user.findByIdAndDelete(id); 
      if (!deleted) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete user', error: error.message });
    }
  };




export {getAllUsers, getUser, removeUser}
