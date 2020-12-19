import React,{ Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
//import witherrorhandler from '../../hoc/errorhandler/errorhandler';
import * as Actions from '../../Store/Actions/order';

class Orders extends Component{
    
    componentDidMount(){
        
     this.props.onFetchOrders(this.props.token);
    }
    render(){
        return(
            <div>
             {
                 this.props.orders.map(order=>{
                     return <Order key={order.id} ingredients={order.ingredients} />
                 })
             }
           </div>
        )
    }
}
const mapStateToProps=(state)=>{
  return{
    orders:state.order.orders,
    token:state.auth.token
  }
}
const mapDispatchToProps=(dispatch)=>{
    return{
       onFetchOrders:(token)=>dispatch(Actions.fetchOrderInit(token))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Orders);