const mongoose= require("mongoose");

var order = new mongoose.Schema({
			userid:String,
			cart:{
				items:[{productname:String}]
			},
			buy:{
				items:[{productname:String}]
			}
});
var Order = mongoose.model("Order",order);

module.exports = Order;