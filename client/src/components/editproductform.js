import React, {Component} from 'react';
import axios from "axios";

class EditProductForm extends Component {
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
			 axios.post('https://wde-server.run-us-west2.goorm.io/api/products/edit/'+res[4],product)
			.then(product => {
				return product.data
				})
			.then((result) => { 
			 	window.location = '/home/'+res[2];
			 });
		}
		componentDidMount() {
		const url = window.location.pathname;
		const res = url.split("/");
		axios.get("https://wde-server.run-us-west2.goorm.io/api/products/"+res[4])
		  .then(response => {
			this.setState({name:response.data.name,
						   category:response.data.category,
						   price:response.data.price,
						   image:response.data.image,
						   author:response.data.author})
		  })
		  .catch(function (error) {
			console.log(error);
		  });
		  }
	render(){
		return ( 
		<div>
			<h1>Welcome to edit product form</h1>
			<form onSubmit={this.onSubmit}> 
			<label>Name</label>
			<input placeholder={this.state.name} type="text"
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

export default EditProductForm;