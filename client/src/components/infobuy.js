import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Buy = props => (
  	 <tr>
    <td>{props.buydata.productname}</td>
	<td>
	 <Link to={"/home/"+props.getuserid()+"/product/"+props.buydata.productid}>See</Link>|| <button onClick={() => { props.deleteProduct(props.buydata.productid) }}>Cancel</button>
	</td>
  </tr>
)
class InfoBuy extends Component {
	state ={
		buy :[],
		userid:'',
		productid:''
	}
	deleteProductBuy =(id) =>{
    axios.delete("https://wde-server.run-us-west2.goorm.io/api/buy/"+this.getuserid()+"/"+id)
      .then(response => { console.log(response.data)})
	  .then(() => {
		window.location = '/home/'+this.getuserid()+"/buy";
		})
		.catch(function (error) {
			console.log(error);
		  })
  }
	getuserid = () =>{
		return this.state.userid;
	}
	buylist = () =>{
			return this.state.buy.map(currentbuy =>{
				return <Buy buydata={currentbuy} getuserid={this.getuserid} deleteProduct={this.deleteProductBuy} key={currentbuy.productid}/>;
			})
	}
	componentDidMount() {
		const url = window.location.pathname;
		const res = url.split("/");
		axios.get("https://wde-server.run-us-west2.goorm.io/api/buy/"+res[2])
		  .then(response => {
			console.log(response.data);
			this.setState({buy:response.data,
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
						 {this.buylist()}
         			 </tbody>
			 </table>
		</div>
		)
	}
}

export default InfoBuy;