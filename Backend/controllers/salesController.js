import mongoose from "mongoose";
import sales from "../models/salesSchema.js";

// create sales gets the quantity
const createSales = async (req, res) => {
  const { user_id } = req.body;
  try {
    const newsales = new sales({
      user_id,
    });
    await newsales.save();
    res.status(200).json(newsales);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getSalesById = async (req, res) => {
  const id = req.params.id; // obtain request id

  // if id is not in valid format tell user that the id is not valid
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("sales not found id is not valid");

  try {
    // finding sales by the id
    const obtained = await sales.findById(id);
    // if null throw error
    if (!obtained) {
      return res.status(404).send("sales not found id does not exist");
    }
    res.status(200).json(obtained);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// obtains all saless
const getAllSales = async (req, res) => {
  try {
    const user = {};
    const { status } = req.query;

    if (status) {
      user.status = status;
    }

    console.log();

    const obtained = await sales
      .find(user)
      .collation({ locale: "en", strength: 2 })
      .sort({ status: -1 });

    res.status(200).json(obtained);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const toggleStatus = async (req, res) => {
  // const id = req.params.id; // obtain request id
  const { sales_id, status } = req.body;
  // if id is not in valid format tell user that the id is not valid
  if (!mongoose.Types.ObjectId.isValid(sales_id))
    return res.status(404).send("sales not found id is not valid");

  try {
    //gets the value of status
    const doesExist = await sales.findById(sales_id).select("status");

    // if null throw error
    if (!doesExist) {
      return res.status(404).send("sales not found id does not exist");
    }

    // toggles the value of status
    const updated = await sales.findByIdAndUpdate(sales_id, { status: status });

    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// deletes sales
const deleteSales = async (req, res) => {
  const id = req.params.id; // obtain request id

  // if id is not in valid format tell user that the id is not valid
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("sales not found id is not valid");

  try {
    // toggles the value of status
    const deleted = await sales.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).send("sales not found id does not exist");
    }

    res.status(200).json(deleted);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const ordersReport = async (req, res) => {
  try {
    let { startDate } = req.query;
    startDate = new Date(startDate);
    let endDate = new Date();
    console.log(startDate);
    const obtained = await sales.aggregate([
      // First Stage
      // Compares throught the dates
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lt: endDate,
          },
          status: "Completed"
        },
      },
      // goes through the orders table and finds the sales id being referenced and takes all its data
      {
        $lookup: {
          from: "orders",
          localField: "_id",
          foreignField: "sales_id",
          as: "transactions",
        },
      },
      {
        $unwind: "$transactions",
      },
      {
        $lookup: {
          from: "products",
          localField: "transactions.product_id",
          foreignField: "_id",
          as: "bought", // creates a new document
        },
      },
      {
        $unwind: "$bought",
      },
      // Second Stage
      {
        $group: {
          _id: "$bought._id",
          name: { $first: "$bought.pname" },
          price: { $first: "$bought.price" },
          bprice: { $first: "$bought.basePrice" },
          img: { $first: "$bought.image" },
          type: { $first: "$bought.type" },
          totalSaleAmount: {
            $sum: { $multiply: ["$bought.price", "$transactions.quantity"] },
          },
          count: { $sum: "$transactions.quantity" },
        },
      },
      // Third Stage
      {
        $sort: { totalSaleAmount: -1 },
      },
    ]);
    console.log(obtained);
    res.status(200).json(obtained);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const totalSales = async (req, res) => {
  try {
    let { startDate } = req.query;
    startDate = new Date(startDate);
    let endDate = new Date();
    console.log(startDate);
    const obtained = await sales.aggregate([
      // First Stage
      // Compares throught the dates
      {
        $match: {
          createdAt: {
            $gte: startDate,
            $lt: endDate,
          },
           status: "Completed"
        },
      },
      // goes through the orders table and finds the sales id being referenced and takes all its data
      {
        $lookup: {
          from: "orders",
          localField: "_id",
          foreignField: "sales_id",
          as: "transactions",
        },
      },
      {
        $unwind: "$transactions",
      },
      {
        $lookup: {
          from: "products",
          localField: "transactions.product_id",
          foreignField: "_id",
          as: "bought", // creates a new document
        },
      },
      {
        $unwind: "$bought",
      },
      // Second Stage
      {
        $group: {
          _id: "",
          totalSaleAmount: {
            $sum: { $multiply: ["$bought.price", "$transactions.quantity"] },
          },
          count: { $sum: "$transactions.quantity" },
        },
      },
    ]);
    console.log(obtained);
    res.status(200).json(obtained);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export {
  createSales,
  getSalesById,
  getAllSales,
  deleteSales,
  toggleStatus,
  ordersReport,
  totalSales,
};
