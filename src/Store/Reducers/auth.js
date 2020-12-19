import * as Action from '../Actions/actionTypes';

const initialState={
  token:null,
  userId:null,
  error:null,
  loading:false
}
const reducer=(state=initialState,action)=>{
    switch(action.type){
        case(Action.AUTH_START):
        return{
            ...state,
            loading:true,
            error:null
        }
        case(Action.AUTH_SUCCESS):
         return{
             ...state,
             token:action.token,
             userId:action.userId,
             loading:false
         }
         case(Action.AUTH_FAIL):
         return{
            ...state,
            error:action.error,
            loading:false
         }
         case(Action.AUTH_LOGOUT):
         return{
           ...state,
           token:null,
           userId:null
         }
        default:
            return state; 
    }
  
}
export default reducer;