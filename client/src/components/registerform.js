import React, {Component} from 'react';
import axios from "axios";

class RegisterForm extends Component {
		state = {
			  name: '',
			  username: '',
			  type: '',
			  password: ''
			}
		onChangeName = e =>{
			this.setState({
			  name: e.target.value
			})
		  }
		onChangeUsername = e =>{
			this.setState({
			  username: e.target.value
			})
		  }
		onChangeType = e =>{
			this.setState({
			  type: e.target.value
			})
		  }
		onChangePassword = e =>{
			this.setState({
			  password: e.target.value
			})
		}
		 onSubmit = e  =>{
			  e.preventDefault();
			  const user = {
			  name: this.state.name,
			  username: this.state.username,
			  type:this.state.type,
			  password:this.state.password
			}
			axios.post('http://localhost:9000/api/users/new',user)
			.then(user => {
				return user.data
				})
			.then((result) => { 
			 	window.location = '/home/'+result._id;
			 });
		}
	render(){
		return ( 
		<div>
			<h1>Welcome to register form</h1>
			<form  onSubmit={this.onSubmit}> 
			<label>Name</label>
			<input type="text"
			value={this.state.name}
            onChange={this.onChangeName}	
			/>
			<label>Username</label>
			<input type="text"
			value={this.state.username}
			onChange={this.onChangeUsername}
			/>
			<label>Password</label>
			<input type="password"
			value={this.state.password}
            onChange={this.onChangePassword}
			/>
			<label>Choose a user type:</label>
			<select id="user-type" name="user-type" value={this.state.type}
            onChange={this.onChangeType}>
  				<option value="Developer">Developer</option>
 				<option value="Client">Client</option>
			</select>
			 <input type="submit" value="Enter"/>
			</form>
		</div>
		)
	}
}

export default RegisterForm;