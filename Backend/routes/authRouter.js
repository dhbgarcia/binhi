import { signUp, signIn } from "../controllers/authController.js"

const authRouter = (app) => {
    app.post('/api/auth/signup', signUp);
    app.post('/api/auth/signin', signIn);
}

export default authRouter