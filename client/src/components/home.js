import React, {Component} from 'react';
import Navbar from "./navbar"
import Appcontent from "./appcontent"
import Footer from "./footer"

class Home extends Component {

	render(){
		return ( 
		<div>
			<Navbar />
			<h1>Welcome to landing page</h1>
			<hr/>
			<Appcontent />
			<hr/>
			<Footer />
		</div>
		)
	}
}

export default Home;