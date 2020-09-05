import React, {Component} from 'react';
import Navbar from "./navbar"
import Footer from "./footer"
import EditProductForm from "./editproductform"

class EditProduct extends Component {

	render(){
		return ( 
		<div>
			<Navbar />
			<h1>Welcome to edit product page</h1>
			<hr />
			<EditProductForm />
			<hr />
			<Footer />
		</div>
		)
	}
}

export default EditProduct;