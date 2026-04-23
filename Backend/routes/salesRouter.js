import {
  createSales,
  getAllSales,
  getSalesById,
  toggleStatus,
  deleteSales,
  ordersReport,
  totalSales,
} from "../controllers/salesController.js";

const salesRouter = (app) => {
  app.get("/api/sale/:id", getSalesById); // getting one sale
  app.get("/api/sale/", getAllSales); // getting all sales
  app.get("/api/report/", ordersReport); // getting the report of all products
  app.get("/api/total/", totalSales); // getting the total amount of sales
  app.post("/api/sale/create", createSales); // creating sale
  app.post("/api/sale/toggle/", toggleStatus); // updating sale status
  app.delete("/api/sale/delete/:id", deleteSales); // updating sale status
};

export default salesRouter;
