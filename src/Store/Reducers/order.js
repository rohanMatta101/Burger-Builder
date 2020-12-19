import * as Actions from '../Actions/actionTypes';

const initialState={
  orders:[],
  loading:false,
  purchased:false
}
const reducer=(state=initialState,action)=>{
    switch(action.type){
        case(Actions.PURCHASE_INIT):
        return{
            ...state,
            purchased:false
        }
        case(Actions.PURCHASE_BURGER_START):
          return{
              ...state,
              loading:true
          }
        case(Actions.PURCHASE_BURGER_SUCCESS):
        const newOrder={
            ...action.orderData,
            id:action.orderId
        }
        return{
           ...state,
           loading:false,
           purchased:true,
           orders:state.orders.concat(newOrder)
        }
        case(Actions.PURCHASE_BURGER_FAIL):
        return {
            ...state,
            loading:false
        }
        case(Actions.FETCH_ORDER_START):
         return{
             ...state,
             loading:true
         }
        case(Actions.FETCH_ORDERS_SUCCESS):
        return{
            ...state,
            loading:false,
            orders:action.orders
        }
        case(Actions.FETCH_ORDERS_FAIL):
        return{
            ...state,
            loading:false
        } 
        default:
            return state
    }
  
}
export default reducer;