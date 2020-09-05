import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Welcome extends Component {

	render(){
		return ( 
		<div>
			<h1>Welcome to playstore api</h1>
			<button>
				<Link to="/register" className="nav-link">New user</Link>
			</button>
			<button>
				<Link to="/login" className="nav-link">Login</Link>
			</button>
		</div>
		)
	}
}

export default Welcome;