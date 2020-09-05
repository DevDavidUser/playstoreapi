const express = require('express');
const router =  express.Router();
let Product = require("../models/product");

// landing route get: retrieved all products
router.route('/').get((req, res) => {
	Product.find()
	.then((product) => res.json(product))
	  .catch(err => res.status(400).json('Error: ' + err));
});
// new product route post: add a new product
router.route('/:userid').post((req, res) => {
	const name = req.body.name;
	const category = req.body.category;
	const price= req.body.price;
	const image= req.body.image;
	const author = req.params.userid;
 	const newProduct = new Product({name,category,price,image,author});
 	 newProduct.save()
    .then(() => res.json('Product added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});
// product get route: retrieve specified product data
router.route('/:id').get((req, res) => {
 	Product.findById(req.params.id)
    .then(product => res.json(product))
    .catch(err => res.status(400).json('Error: ' + err));	
});
//product route delete: delete specified product
router.route('/:id').delete((req, res) => {
  Product.findByIdAndDelete(req.params.id)
    .then(() => res.json('Product deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
// product dev get route: retrieve specified products from a dev
router.route('/dev/:userid').get((req, res) => {
 	Product.find({author:req.params.userid})
    .then(products => res.json(products))
    .catch(err => res.status(400).json('Error: ' + err));	
});
// product post edit route: update a product information
router.route('/edit/:id').post((req, res) => {
 	Product.findById(req.params.id)
    .then(product => {
      product.name = req.body.name;
	  product.category = req.body.category;
      product.price = req.body.price;
	  product.image = req.body.image;
      product.author = req.body.author;
      product.save()
        .then(() => res.json('Product updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;