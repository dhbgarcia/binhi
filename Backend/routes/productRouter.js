import {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  removeProduct,
  getProductTypes
} from '../controllers/productController.js';


const productRouter = (app) =>{
  app.get('/api/product/', getAllProducts);
  app.get('/api/product/:id', getProduct);
  app.post('/api/product/create', createProduct);
  app.patch('/api/product/update/:id', updateProduct);
  app.delete('/api/product/delete/:id', removeProduct);
  app.get('/api/product-types', getProductTypes)
} 

export default productRouter;
  
