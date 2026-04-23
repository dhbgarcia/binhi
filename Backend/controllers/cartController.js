import Cart from "../models/cartSchema.js";

const createCart = async (req, res) => {
  const { userId, cartItems } = req.body;

  try {
    // Delete all existing carts for the user
    await Cart.deleteMany({ userId });

    // Create new cart
    const newCart = new Cart({ userId, cartItems });
    await newCart.save();

    res.status(200).json(newCart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const fetchCart = async (req, res) => {
    const { userId } = req.params;
    try {
        const cart = await Cart.find({userId: userId});
        if (!cart) {
            return res.status(404).send("Cart not found");
        }
        if (cart.length === 0) {
            return res.status(404).send("Cart is empty");
        }
        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export {  createCart, fetchCart  };