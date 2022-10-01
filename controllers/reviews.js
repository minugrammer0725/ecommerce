const reviewsRouter = require('express').Router();

const Review = require('../models/Review');


reviewsRouter.get('/:productId', async (request, response) => {
  // return all reviews for a specific product

  const {productId} = request.params;
  if (!productId) response.status(400).send({error: "missing product id"});

  try {
    const reviews = await Review.find({product: productId});
    response.status(200).json(reviews);
  } catch (error) {
    console.log(error);  
  }
})

reviewsRouter.post('/', async (request, response) => {
  // creates a new review
  
  const {rating, comment, user, product} = request.body;
  if (!rating || !comment) response.status(400).send({error: "missing review info"});

  try {
    const newReview = new Review({
      rating,
      comment,
      user,
      product
    })

    const createdReview = await newReview.save();
    response.status(201).json(createdReview);

  } catch (error) {
    console.log(error);
  }
})


module.exports = reviewsRouter;