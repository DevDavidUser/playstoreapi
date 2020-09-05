import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Navbar extends Component {
	state = {
	  username: '',
	  type: '',
	  userid: ''
	}
	componentDidMount() {
		const url = window.location.pathname;
		const res = url.split("/");
		axios.get("https://wde-server.run-us-west2.goorm.io/api/users/"+res[2])
		  .then(response => {
			this.setState({username:response.data.username})
			this.setState({type:response.data.type})
			this.setState({userid:response.data._id})
		  })
		  .catch(function (error) {
			console.log(error);
		  })
	}
	render(){
		return ( 
		<div>
			<nav>
			<ul>
				<li>{this.state.username}</li>
				<li>
					<Link to={`/home/${this.state.userid}`}>Home</Link>
				</li>
				{this.state.type==="Developer" ? 
					<li><Link to={`/home/${this.state.userid}/product/new`}>Create</Link></li> : 
					<div>
						<li><Link to={`/home/${this.state.userid}/cart`}>Cart</Link></li>
						<li><Link to={`/home/${this.state.userid}/buy`}>Buy</Link></li>
					</div>}
			</ul>
			</nav>
		</div>
		)
	}
}

export default Navbar;