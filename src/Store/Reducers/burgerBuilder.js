import * as ActionTypes from '../Actions/actionTypes';

const initialState={
    ingredients:null,
    totalPrice:4,
    error:false,
    building:false

}
const Ingredient_Prices={
    salad:0.7,
    meat:1.4,
    bacon:1.2,
    cheese:0.6
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case(ActionTypes.ADD_INGREDIENTS):
          return{
              ...state,
              ingredients:{
                  ...state.ingredients,
                  [action.ingredName]:state.ingredients[action.ingredName] + 1
              },
              totalPrice:state.totalPrice + Ingredient_Prices[action.ingredName],
              building:true
          }
        case(ActionTypes.REMOVE_INGREDIENTS):
            return{
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingredName]:state.ingredients[action.ingredName] - 1
                },
                totalPrice:state.totalPrice - Ingredient_Prices[action.ingredName],
                building:true
            }

        case(ActionTypes.SET_INGREDIENTS):
            return{
                ...state,
                ingredients:{
                    salad:action.ingredients.salad,
                    bacon:action.ingredients.bacon,
                    cheese:action.ingredients.cheese,
                    meat:action.ingredients.meat
                },
                totalPrice:4,
                error:false,
                building:false
            }
        case(ActionTypes.FETCH_FAILED):
            return{
                ...state,
                error:true
            }        
            default:
                return {...state}
        }
    
    }


export default reducer;