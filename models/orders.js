const mongoose= require("mongoose");

var order = new mongoose.Schema({
			userid:String,
			cart:[{productname:String, productid:String}],
			buy:[{productname:String, productid:String}]
});
var Order = mongoose.model("Order",order);

module.exports = Order;