import {
  getAllUsers,
  getUser,
  removeUser
} from '../controllers/userController.js';


const userRouter = (app) =>{
  app.get('/api/user/', getAllUsers);
  app.get('/api/user/:id', getUser);
  app.delete('/api/user/delete/:id', removeUser);
}


export default userRouter;
