const billingsRouter = require('express').Router();

const Billing = require('../models/Billing');


billingsRouter.get('/:billingId', async (request, response) => {
  // return a single billing info
  const {billingId} = request.params;
  if (!billingId) response.status(400).send({error: "missing billing id"});

  try {
    const billing = await Billing.findById(billingId);
    response.status(200).json(billing); 
  } catch (error) {
    console.log(error);
  }

})

billingsRouter.post('/', async (request, response) => {
  // create a new billing info
  try {
    const newBilling = new Billing({
      ...request.body
    })

    const createdBilling = await newBilling.save();
    response.status(201).json(createdBilling);

  } catch (error) {
    console.log(error);
  }
})

module.exports = billingsRouter;