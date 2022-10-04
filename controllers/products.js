const productsRouter = require('express').Router();

const Product = require('../models/Product');


productsRouter.get('/brand', async (request, response) => {
  // return all products from a certain brand

  // ?name={brandName}
  const brandName = request.query.name;
  console.log('brand name:', brandName);
  // basic validation
  try {
    const brandProducts = await Product.find({brand: brandName});
    response.status(200).json(brandProducts);
  } catch (error) {
    console.log(error);
  }
})

productsRouter.get('/:productId', async (request, response) => {
  // return a single product

  const {productId} = request.params;
  // basic validation 
  try {
    const product = await Product.findById(productId);
    response.render('product', {data: product});

  } catch (error) {
    console.log(error);
  }
});


productsRouter.get('/', async (request, response) => {
  // return all products

  try {
  const products = await Product.find({});
  response.status(200).json(products);
  } catch (error) {
    console.log(error);
  }
});



// Post to create products manually...
productsRouter.post('/', async (request, response) => {
  try {
    const newProduct = new Product({
      ...request.body,
    });
    const createdProduct = await newProduct.save();
    response.status(201).json(createdProduct);   
  } catch (error) {
    console.log(error);
  }
});

module.exports = productsRouter;
