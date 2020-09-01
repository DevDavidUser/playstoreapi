const mongoose= require("mongoose");

var product = new mongoose.Schema({
		name:String,
		category: String,
		price:Number,
		image:String,
		author:String
});
var Product = mongoose.model("Product",product);

module.exports = Product;