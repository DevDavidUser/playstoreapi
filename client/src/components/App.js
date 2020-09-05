import React, {Component} from 'react';
import Welcome from "./welcome"
import { BrowserRouter as Router, Route} from "react-router-dom";
import RegisterForm from "./registerform"
import LoginForm from "./loginform"
import Landing from "./landing"


class App extends Component {

	render(){
		return ( 
		<div>
			<Router>
      			<div>
      			<Route path="/" exact component={Welcome} />
				<Route path="/register" component={RegisterForm} />
				<Route path="/login"  component={LoginForm} />
				<Route path="/home"  component={Landing} />
    		    </div>
		    </Router>
		</div>
		)
	}
}

export default App;
