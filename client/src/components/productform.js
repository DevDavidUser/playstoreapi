import React, {Component} from 'react';
import axios from "axios";

class Productform extends Component {
	state = {
			  name: '',
			  category: '',
			  price: '',
			  image: '',
			  author: ''
			}
		onChangeName = e =>{
			this.setState({
			  name: e.target.value
			})
		  }
		onChangeCategory = e =>{
			this.setState({
			  category: e.target.value
			})
		  }
		onChangePrice = e =>{
			this.setState({
			  price: e.target.value
			})
		  }
		onChangeImage = e =>{
			this.setState({
			  image: e.target.value
			})
		  }
 		onSubmit = e  =>{
			  e.preventDefault();
			  const url = window.location.pathname;
			  const res = url.split("/");
			  const product = {
			  name: this.state.name,
			  category: this.state.category,
			  price:this.state.price,
			  image:this.state.image,
			  author:res[2]
			}
			axios.post('http://localhost:9000/api/products/'+res[2],product)
			.then(product => {
				return product.data
				})
			.then((result) => { 
			 	window.location = '/home/'+res[2];
			 });
		}
	render(){
		return ( 
		<div>
			<h1>Welcome to register form</h1>
			<form onSubmit={this.onSubmit}> 
			<label>Name</label>
			<input type="text"
			value={this.state.name}
            onChange={this.onChangeName}	
			/>
			<label>Category</label>
			<input type="text"
			value={this.state.category}
            onChange={this.onChangeCategory}	
			/>
			<label>Price</label>
			<input type="text"
			value={this.state.price}
            onChange={this.onChangePrice}	
			/>
			<label>Image url</label>
			<input type="text"
			value={this.state.image}
            onChange={this.onChangeImage}	
			/>
			 <input type="submit" value="Enter"/>
			</form>
		</div>
		)
	}
}

export default Productform;