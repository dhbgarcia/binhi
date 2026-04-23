import { createCart, fetchCart } from "../controllers/cartController.js";

const cartRouter = (app) => {
    app.post('/api/cart/create', createCart);
    app.get('/api/cart/:userId', fetchCart)
}

export default cartRouter;