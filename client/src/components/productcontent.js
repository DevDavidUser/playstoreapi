import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


class Productcontent extends Component {
	state={
		name:'',
		price:'',
		category:'',
		image:'',
		author:'',
		type: '',
		userid: '',
		id:'',
		productbuyname:'',
		productcartname:''
	}
	buyProduct = e =>{
		axios.post('http://localhost:9000/api/buy/'+this.state.userid+"/"+this.state.id, {productname:this.state.name})
		 .then(response => {
			window.location = '/home/'+this.state.userid+"/buy";
		})
		.catch(function (error) {
		console.log(error);
		});
	}
	cartProduct = e =>{
		axios.post('http://localhost:9000/api/cart/'+this.state.userid+"/"+this.state.id, {productname:this.state.name})
		 .then(response => {
			window.location = '/home/'+this.state.userid+"/cart";
		})
		.catch(function (error) {
		console.log(error);
		});
	}
	deleteProductonCart =() =>{
    	axios.delete("http://localhost:9000/api/order/"+this.state.id)
        .then(response => { console.log(response.data)})
		.catch(function (error) {
		console.log(error);
		});
		window.location = '/home/'+this.state.userid;
  }
	deleteProduct =(id) =>{
    	axios.delete("http://localhost:9000/api/products/"+id)
        .then(response => { console.log(response.data)})
		.catch(function (error) {
		console.log(error);
		});
    	this.deleteProductonCart();
  }
	componentDidMount() {
		const url = window.location.pathname;
		const res = url.split("/");
		axios.get("http://localhost:9000/api/products/"+res[4])
		  .then(response => {
			this.setState({name:response.data.name,
						   category:response.data.category,
						   price:response.data.price,
						   image:response.data.image,
						   author:response.data.author,
						   id:response.data._id})
		  })
		  .catch(function (error) {
			console.log(error);
		  });
		
		axios.get("http://localhost:9000/api/users/"+res[2])
		  .then(response => {
			this.setState({type:response.data.type,
						  userid:response.data._id})
		  })
		  .catch(function (error) {
			console.log(error);
		  });
		
		axios.get("http://localhost:9000/api/cart/"+res[2]+"/"+res[4])
		  .then(response => {
			this.setState({productcartname:response.data});
		  })
		  .catch(function (error) {
			console.log(error);
		  });
		axios.get("http://localhost:9000/api/buy/"+res[2]+"/"+res[4])
		  .then(response => {
			this.setState({productbuyname:response.data});
		  })
		  .catch(function (error) {
			console.log(error);
		  });
		}
	render(){
		return ( 
		<div>
			<h1>Product content</h1>
			<ul>
				<li>{this.state.name}</li>
				<li>{this.state.category}</li>
				<li>{this.state.price}</li>
				<li>{this.state.image}</li>
				{this.state.type ==="Developer" ? 
				<div>
					<button> <Link to={"/home/"+this.state.userid+"/product/"+this.state.id+"/edit"}>Edit</Link></button> 
					<button onClick={() => {this.deleteProduct(this.state.id)}}>Delete</button></div>: 
				<div>
				{this.state.productcartname === this.state.name ? 
				<div>
						<button disabled>Add to cart</button>	
				</div>: 
				<div>
						<button onClick={() => {this.cartProduct()}}>Add to cart</button>
				</div>}
				{this.state.productbuyname === this.state.name ? 
				<div>
						<button disabled>Buy</button>	
				</div>: 
				<div>
						<button onClick={() => {this.buyProduct()}}>Buy</button>
				</div>}
				</div>}
				<button> <Link to={"/home/"+this.state.userid}>Go home</Link></button>
			</ul>
		</div>
		)
	}
}

export default Productcontent;