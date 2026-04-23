import mongoose from "mongoose";
import order from "../models/orderSchema.js";

// create order gets the quantity
const createOrder = async (req, res) => {
  const { quantity, product_id, sales_id } = req.body;
  try {
    const newOrder = new order({
      quantity,
      product_id,
      sales_id,
    });
    await newOrder.save();
    res.status(200).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getOrderById = async (req, res) => {
  const id = req.params.id; // obtain request id

  // if id is not in valid format tell user that the id is not valid
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Order not found id is not valid");

  try {
    // finding order by the id
    const obtained = await order.findById(id);
    // if null throw error
    if (!obtained) {
      return res.status(404).send("Order not found id does not exist");
    }
    res.status(200).json(obtained);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//obtains all orders
const getAllOrders = async (req, res) => {
  try {
    const user = {};
    const { sales_id } = req.query;

    if (sales_id)
      user.sales_id = mongoose.Types.ObjectId.createFromHexString(sales_id);

    console.log(user);

    // not grouped because we need to list down each and every product the user has bought
    const obtained = await order.aggregate([
      {
        // compares sales_id and only gets those with similar sales ids
        $match: user,
      },
      {
        // Assigns the product id reference key to its proper counterpart in the product database
        $lookup: {
          from: "products",
          localField: "product_id",
          foreignField: "_id",
          as: "bought", // creates a new document
        },
      },
      // breaks down the document to not have annoying arrays
      {
        $unwind: "$bought",
      },
      {
        // creates a new document which will be displayed
        // 1 means to keep the value not place the value as 1
        $project: {
          _id: 1,
          pname: "$bought.pname",
          price: "$bought.price",
          image: "$bought.image",

          quantity: 1,
          sales_id: 1,
        },
      },
    ]);
    res.status(200).json(obtained);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const toggleOrder = async (req, res) => {
  const id = req.params.id; // obtain request id

  // if id is not in valid format tell user that the id is not valid
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Order not found id is not valid");

  try {
    //gets the value of status
    const isCompleted = await order.findById(id).select("status");

    // if null throw error
    if (!isCompleted) {
      return res.status(404).send("Order not found id does not exist");
    }

    // toggles the value of status
    const updated = await order.findByIdAndUpdate(id, { status: !isCompleted });

    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// deletes order
const deleteOrder = async (req, res) => {
  const id = req.params.id; // obtain request id

  // if id is not in valid format tell user that the id is not valid
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("Order not found id is not valid");

  try {
    // toggles the value of status
    const deleted = await order.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).send("Order not found id does not exist");
    }

    res.status(200).json(deleted);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};





export {
  createOrder,
  getOrderById,
  getAllOrders,
  toggleOrder,
  deleteOrder,
};
