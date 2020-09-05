import React, {Component} from 'react';
import Navbar from "./navbar"
import Footer from "./footer"
import InfoBuy from "./infobuy"

class Buy extends Component {

	render(){
		return ( 
		<div>
			<Navbar />
			<h1>Welcome to buy page</h1>
			<hr />
			<InfoBuy />
			<hr />
			<Footer />
		</div>
		)
	}
}

export default Buy;