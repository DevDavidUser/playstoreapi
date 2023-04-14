import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Product = props => (
  <div>
  	<p>{props.product.name}</p>
	<p>{props.product.category}</p>
	<p>{props.product.price}</p>
	<p>{props.product.image}</p>		
	<p>{props.product.author}</p>
	<button> <Link to={"/home/"+props.getuserid()+"/product/"+props.product._id}>See</Link></button>
  </div>
)

class Appcontent extends Component {
		state = {
	  username: '',
	  type: '',
	  products:[],
	  userid: ''
	}
	getuserid = () =>{
		return this.state.userid;
	}
	productslist = () =>{
		return this.state.products.map(currentproduct =>{
			return <Product product={currentproduct}  getuserid={this.getuserid} key={currentproduct._id}/>;
		})
	}
	clientcontent =() =>{
		axios.get("http://localhost:9000/api/products")
	   .then(response => {
		this.setState({products:response.data})
		//console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
	  }
		devcontent =() =>{
		const url = window.location.pathname;
		const res = url.split("/");
		axios.get("http://localhost:9000/api/products/dev/"+res[2])
	   .then(response => {
		this.setState({products:response.data})
		//console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
	  }
	componentDidMount() {
		const url = window.location.pathname;
		const res = url.split("/");
		axios.get("http://localhost:9000/api/users/"+res[2])
		  .then(response => {
			this.setState({username:response.data.username,
						   type:response.data.type,
						   userid:response.data._id})
		  })
		  .then(() => { 
				if(this.state.type === "Client"){
					this.clientcontent();
				}else{
					this.devcontent();
				}
			})
		  .catch(function (error) {
			console.log(error);
		  })
	}
	render(){
		return ( 
		<div>
			<h1>Show app content</h1>
			{ this.productslist()}
		</div>
		)
	}
}

export default Appcontent;