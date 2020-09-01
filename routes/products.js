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
router.route('/new').post((req, res) => {
	const name = req.body.name;
	const category = req.body.category;
	const price= req.body.price;
	const image= req.body.image;
	const author = req.body.author;
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
module.exports = router;