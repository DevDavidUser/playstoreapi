import React, {Component} from 'react';
import Navbar from "./navbar"
import Footer from "./footer"
import ProductForm from "./productform"

class CreateProduct extends Component {

	render(){
		return ( 
		<div>
			<Navbar />
			<h1>Welcome to create product page</h1>
			<hr />
			<ProductForm />
			<hr />
			<Footer />
		</div>
		)
	}
}

export default CreateProduct;