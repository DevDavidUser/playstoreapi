import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Cart = props => (
  	 <tr>
    <td>{props.cartdata.productname}</td>
	<td>
	 <Link to={"/home/"+props.getuserid()+"/product/"+props.cartdata.productid}>See</Link> || <button onClick={() => { props.deleteProduct(props.cartdata.productid) }}>Remove</button>
	</td>
  </tr>
)

class InfoCart extends Component {
	state ={
		cart :[],
		userid:'',
		productid:''
	}
	deleteProductCart =(id) =>{
    axios.delete("https://wde-server.run-us-west2.goorm.io/api/cart/"+this.getuserid()+"/"+id)
      .then(response => { console.log(response.data)})
	  .then(() => {
		window.location = '/home/'+this.getuserid()+"/cart";
		})
		.catch(function (error) {
			console.log(error);
		  })
  }
	getuserid = () =>{
		return this.state.userid;
	}
	cartlist = () =>{
			return this.state.cart.map(currentcart =>{
				return <Cart cartdata={currentcart} getuserid={this.getuserid} deleteProduct={this.deleteProductCart} key={currentcart.productid}/>;
			})
	}
	componentDidMount() {
		const url = window.location.pathname;
		const res = url.split("/");
		axios.get("https://wde-server.run-us-west2.goorm.io/api/cart/"+res[2])
		  .then(response => {
			console.log(response.data);
			this.setState({cart:response.data,
						 userid:res[2]})
		  })
		  .catch(function (error) {
			console.log(error);
		  })
		  
	}
	render(){
		return ( 
		<div>
			<table>
         		 <thead>
           			 <tr>
             			 <th>Productname</th>
          		     </tr>
				</thead>
					  <tbody>
						  {this.cartlist()}
         			 </tbody>
			 </table>
		</div>
		)
	}
}

export default InfoCart;