const mongoose= require("mongoose");

var user = new mongoose.Schema({
		name:String,
		username: String,
		type:String,
		password:String
});
var User = mongoose.model("User",user);

module.exports = User;