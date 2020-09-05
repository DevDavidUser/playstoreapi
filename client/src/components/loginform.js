import React, {Component} from 'react';
import axios from "axios";

class LoginForm extends Component {
		state = {
			  username: '',
			  password: ''
			}
		onChangeUsername = e =>{
			this.setState({
			  username: e.target.value
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
			  username: this.state.username,
			  password:this.state.password
			}
			axios.post('https://wde-server.run-us-west2.goorm.io/api/users/login',user)
			.then(res => {
					console.log(res.data);
					if(res.data !== null){
						console.log("acess");
						return res.data
					}else{
						console.log("not acess");
						window.location = '/login';
					}
				})
			.then((result) => { 
				window.location = '/home/'+result._id;
			 });
			 }
	render(){
		return ( 
		<div>
			<h1>Welcome to login form</h1>
			<form onSubmit={this.onSubmit}>
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
			 <input type="submit" value="Enter"/>
			</form>
		</div>
		)
	}
}

export default LoginForm;