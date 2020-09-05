import React, {Component} from 'react';
import Navbar from "./navbar"
import Footer from "./footer"
import ProductContent from "./productcontent"

class Product extends Component {

	render(){
		return ( 
		<div>
			<Navbar />
			<h1>Welcome to product page</h1>
			<hr/>
			<ProductContent/>
			<hr />
			<Footer />
		</div>
		)
	}
}

export default Product;