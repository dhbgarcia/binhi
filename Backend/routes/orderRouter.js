import {
  createOrder,
  getOrderById,
  getAllOrders,
  toggleOrder,
  deleteOrder,
} from "../controllers/orderController.js";

const orderRouter = (app) => {
  app.get("/api/order/:id", getOrderById); // getting one order
  app.get("/api/order/", getAllOrders); // getting all orders
  app.post("/api/order/create", createOrder); // creating order
  app.put("/api/order/toggle/:id", toggleOrder); // updating order status
  app.delete("/api/order/delete/:id", deleteOrder); // updating order status
};

export default orderRouter;
