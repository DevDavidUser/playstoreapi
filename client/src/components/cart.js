import React, {Component} from 'react';
import Navbar from "./navbar"
import Footer from "./footer"
import InfoCart from "./infocart"

class Cart extends Component {

	render(){
		return ( 
		<div>
			<Navbar />
			<h1>Welcome to cart page</h1>
			<hr />
			<InfoCart />
			<hr />
			<Footer />
		</div>
		)
	}
}

export default Cart;