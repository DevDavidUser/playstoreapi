import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./home"
import Product from "./product"
import CreateProduct from "./createproduct"
import Cart from "./cart"
import Buy from "./buy"
import EditProduct from "./editproduct"

class Landing extends Component {

	render(){
		return ( 
		<div>
			<Router>
      			<div>
					<Switch>
						<Route path="/home/:userid" exact component={Home} />
						<Route path="/home/:userid/product/new" exact component={CreateProduct} />
						<Route path="/home/:userid/product/:id" exact component={Product} />
						<Route path="/home/:userid/product/:id/edit" component={EditProduct} />
						<Route path="/home/:userid/cart" exact component={Cart} />
						<Route path="/home/:userid/buy" exact component={Buy} />
					</Switch>
    		    </div>
		    </Router>
		</div>
		)
	}
}

export default Landing;