import axios from '../../axios-orders';
import * as ActionTypes from '../Actions/actionTypes';
import order from '../../components/Order/Order';
export const purchaseBurgerSuccess=(id,orderData)=>{
 return{
     type:ActionTypes.PURCHASE_BURGER_SUCCESS,
     orderId:id,
     orderData:orderData
 }
}
export const purchaseBurgerFailed=(error)=>{
    return{
        type:ActionTypes.PURCHASE_BURGER_FAIL,
        error:error
    }
}
export const purchaseBurgerStart=()=>{
    return{
       type:ActionTypes.PURCHASE_BURGER_START
    }
}
export const purchaseInit=()=>{
    return{
       type:ActionTypes.PURCHASE_INIT
    }
}
//async code
export const purchaseBurger=(orderData,token)=>{
    return dispatch=>{
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth='+token,orderData)
      .then(response=>{
          console.log(response.data)
             dispatch(purchaseBurgerSuccess(response.data.name,orderData))
      }).catch(error=>{
          dispatch(purchaseBurgerFailed(error))
      }) 
    }
}
export const fetchOrderSuccess=(orders)=>{
    return{
        type:ActionTypes.FETCH_ORDERS_SUCCESS,
        orders:orders
    }
}
export const fetchOrderFail=(error)=>{
    return{
        type:ActionTypes.FETCH_ORDERS_FAIL,
        error:error
    }
}
export const fetchOrderStart=()=>{
    return{
        type:ActionTypes.FETCH_ORDER_START
    }
}
//async code for fetching orders
export const fetchOrderInit=(token)=>{
    return dispatch=>{
        dispatch(fetchOrderStart());
        axios.get('/orders.json?auth='+token)
        .then(response=>{
            
            const fetchedorders=[];
            for( let key in response.data){
                
                fetchedorders.push({
                    ...response.data[key],
                    id:key
                })
            }
            dispatch(fetchOrderSuccess(fetchedorders));
            
        })
        .catch(err=>{
            dispatch(fetchOrderFail(err));
        })
    }
}