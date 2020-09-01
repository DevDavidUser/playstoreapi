const express = require('express');
const router =  express.Router();
let Order = require("../models/orders");

// new Order cart route post: add a new Order with a specified userid and product id
router.route('/cart/new').post((req, res) => {
	const userid = req.body.userid;
	const productname = req.body.productname;
 	const newOrder = new Order({userid,cart:{items:{productname}}});
 	 newOrder.save()
    .then(() => res.json('Cart product added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});
// cart get route: retrieved a cart order specified by a userid
router.route('/cart/:userid').get((req, res) => {
	Order.find({userid:req.params.userid})
	.then((order) => res.json(order))
	  .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;