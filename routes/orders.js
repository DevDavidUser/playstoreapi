const express = require('express');
const router =  express.Router();
let Order = require("../models/orders");

// landing route get: retrieved all orders
router.route('/cart').get((req, res) => {
	Order.find()
	.then((order) => res.json(order))
	  .catch(err => res.status(400).json('Error: ' + err));
});
// Product route get: retrieved all orders associated with a specified product
router.route('/order/:id').delete((req, res) => {
	const productid = req.params.id;
	Order.find({"cart.productid":productid},function(err,cartdata){
		if(err){
			console.log(err);
		}else{
			res.json(cartdata);
			console.log(cartdata.length);
			for(var i=0; i<cartdata.length; i++){
				cartdata[i].updateOne({$pull:{ cart:{ productid:productid}}},
				function(err, respond) {
				   if(err){
					   res.json(err);
				   }else{
					   res.json(respond);
				   }
				});
			}
		}
	});
});
// order get cart route: retrieved a specified order cart by a userid
router.route('/cart/:userid').get((req, res) => {
	const userid = req.params.userid;
	const cartlistnames =[];
	const cartlistids =[];
	let nullname;
	let nullid;
	let nullcart;
	const cartselected =[];
	Order.find({userid:userid},function(err,cartdata){
		if(err){
			console.log(err);
		}else{
			if(cartdata[0] == undefined){
				nullname = '';
				nullid = '';
				nullcart={"productid":nullid,"productname":nullname};
				res.json(nullcart);
			}else{
				for(var i=0;i<cartdata[0].cart.length;i++){
				cartlistnames[i]=cartdata[0].cart[i].productname;
				cartlistids[i]=cartdata[0].cart[i].productid;
				const cartproduct = {"productid":cartlistids[i],"productname":cartlistnames[i]};
				cartselected.push(cartproduct);
				}
				res.json(cartselected);
			}
		}
	})
});
// Order cart get post: retrieved a cart productname linked to a specified productid and userid
router.route('/cart/:userid/:id').get((req, res) => {
	const userid = req.params.userid;
	const productid = req.params.id;
	const idlist =[];
	let selectedproductname;
	let selectedposition;
	Order.find({ $and: [ {"cart.productid":productid}, {userid:userid}]},function(err,cartdata){
		if(err){
			console.log(err);
		}else{
			if(cartdata[0] == undefined){
				selectedproductname = '';
				res.json(selectedproductname);
			}else{
				for(var i=0;i<cartdata[0].cart.length;i++){
				idlist[i]=cartdata[0].cart[i].productid;
			}
			for(var j=0;j<cartdata[0].cart.length;j++){
				if(idlist[j] == productid){
					selectedposition = j;
					j=cartdata[0].cart.length;
				}
			}
			selectedproductname = cartdata[0].cart[selectedposition].productname;
			res.json(selectedproductname);
			}
		}
	})
});
// new Order cart route post: add a new cart to an Order with a specified userid and product id
router.route('/cart/:userid/:id').post((req, res) => {
	const userid = req.params.userid;
	const productname = req.body.productname;
	const productid = req.params.id;
	Order.exists({userid:userid},function(err,orderexist){
		if(err){
			console.log(err);
		}else{
			if(true == orderexist){
					Order.findOne({userid:userid},function(err,order){
					if(err){
						console.log(err);
					}else{
						order.cart.push({productname,productid});
						order.save();
						res.json("Product on cart");
					}
					});
			}else{
				 const newOrder = new Order({userid,cart:{productname,productid}});
				 newOrder.save()
    			 .then(() => res.json('New order added!'))
    			 .catch(err => res.status(400).json('Error: ' + err));
			}
		}
	});
});
//cart delete route: remove a product from the cart items
router.route('/cart/:userid/:id').delete((req, res) => {
    const userid = req.params.userid;
	const productid = req.params.id;

	Order.findOne({userid:userid},function(err,cartdata){
		if(err){
			console.log(err);
		}else{
			cartdata.updateOne({$pull:{ cart:{ productid:productid}}},
    		function(err, respond) {
			   if(err){
				   res.json(err);
			   }else{
				   res.json(respond)
			   }
			});
		}
	});
});
// order get buy route: retrieved a specified buy by a userid
router.route('/buy/:userid').get((req, res) => {
	const userid = req.params.userid;
	const buylistnames =[];
	const buylistids =[];
	let nullname;
	let nullid;
	let nullbuy;
	const cartselected =[];
	Order.find({userid:userid},function(err,buydata){
		if(err){
			console.log(err);
		}else{
			if(buydata[0] == undefined){
				nullname = '';
				nullid = '';
				nullbuy={"productid":nullid,"productname":nullname};
				res.json(nullbuy);
			}else{
				for(var i=0;i<buydata[0].buy.length;i++){
				buylistnames[i]=buydata[0].buy[i].productname;
				buylistids[i]=buydata[0].buy[i].productid;
				const buyproduct = {"productid":buylistids[i],"productname":buylistnames[i]};
				cartselected.push(buyproduct);
				}
				res.json(cartselected);
			}
		}
	})
});
// Order buy get route: retrieved a buy productname linked to a specified productid and userid
router.route('/buy/:userid/:id').get((req, res) => {
	const userid = req.params.userid;
	const productid = req.params.id;
	const idlist =[];
	let selectedproductname;
	let selectedposition;
	Order.find({ $and: [ {"buy.productid":productid}, {userid:userid}]},function(err,buydata){
		if(err){
			console.log(err);
		}else{
			if(buydata[0] == undefined){
				selectedproductname = '';
				res.json(selectedproductname);
			}else{
				for(var i=0;i<buydata[0].buy.length;i++){
				idlist[i]=buydata[0].buy[i].productid;
			}
			for(var j=0;j<buydata[0].buy.length;j++){
				if(idlist[j] == productid){
					selectedposition = j;
					j=buydata[0].buy.length;
				}
			}
			selectedproductname = buydata[0].buy[selectedposition].productname;
			res.json(selectedproductname);
			}
		}
	})
});
// new Order buy route post: add a new buy to an Order with a specified userid and product id
router.route('/buy/:userid/:id').post((req, res) => {
	const userid = req.params.userid;
	const productname = req.body.productname;
	const productid = req.params.id;
	Order.exists({userid:userid},function(err,orderexist){
		if(err){
			console.log(err);
		}else{
			if(true == orderexist){
					Order.findOne({userid:userid},function(err,order){
					if(err){
						console.log(err);
					}else{
						order.buy.push({productname,productid});
						order.save();
						res.json("Product buy");
					}
					});
			}else{
				 const newOrder = new Order({userid,buy:{productname,productid}});
				 newOrder.save()
    			 .then(() => res.json('New order added!'))
    			 .catch(err => res.status(400).json('Error: ' + err));
			}
		}
	});
});
//buy delete route: remove a product from the buy items
router.route('/buy/:userid/:id').delete((req, res) => {
    const userid = req.params.userid;
	const productid = req.params.id;

	Order.findOne({userid:userid},function(err,buydata){
		if(err){
			console.log(err);
		}else{
			buydata.updateOne({$pull:{ buy:{ productid:productid}}},
    		function(err, respond) {
			   if(err){
				   res.json(err);
			   }else{
				   res.json(respond)
			   }
			});
		}
	});
});

module.exports = router;