const express = require('express');
const router =  express.Router();
let User = require("../models/user");
// landing route get: retrieved all users
router.route('/').get((req, res) => {
	User.find()
	.then((users) => res.json(users))
	  .catch(err => res.status(400).json('Error: ' + err));
});
// add route post: add a new user
router.route('/new').post((req, res) => {
	const name = req.body.name;
	const username = req.body.username;
	const password = req.body.password;
	const type= req.body.type;
 	const newUser = new User({name,username,password,type});
 	 newUser.save()
    .then((user) => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});
// add login post route: check if the user is register
router.route('/login').post((req, res) => {
	const username = req.body.username;
	const password = req.body.password;
 	User.findOne({username:username,password:password})
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));	
});
// user get route: retrieve specified user data
router.route('/:userid').get((req, res) => {
 	User.findById(req.params.userid)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));	
});
module.exports = router;