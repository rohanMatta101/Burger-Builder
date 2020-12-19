import React,{ Component,Fragment } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/orderSummary/OrderSummary';
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner';
import errorhandler from '../../hoc/errorhandler/errorhandler';
import * as  burgerBuilderActions from '../../Store/Actions/index';
import { connect } from 'react-redux';


class BurgerBuilder extends Component{
    state={
        purchasing:false,
        
    }
    componentDidMount(){
        this.props.onFetchingIngredients();
    }
    updatePurchase(ingredients){
        const sum=Object.keys(ingredients)
        .map(igkey=>{
            return ingredients[igkey];
        })
        .reduce((sum,el)=>{
            return sum+el;
        },0);
         return sum>0;
    }
    
    purchaseCancel=()=>{
        this.setState({purchasing:false})
    }
    purchaseContinue=()=>{
        console.log(this.props);
        //this.props.history.push('/checkout');
       /* this.setState({loading:true})
      const order={
          ingredients:this.state.ingredients,
          price:this.state.totalPrice,
          deliverymethod:'fastest',
          customer:{
              name:'Rohan Matta'
          }

      };
      axios.post('/orders',order)
      .then(response=>{
          this.setState({loading:false,purchasing:false})
      }).catch(error=>{
          this.setState({loading:false,purchasing:false})
      })  */

       /*const queryParams=[];
        for(let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        const queryString=queryParams.join('&');*/
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
                
    }
    purchaseHandler=()=>{
        if(this.props.isAuthenticated){
            this.setState({purchasing:true});
        }
        else{
            this.props.history.push("/auth");
        }
        
    }
    
    
    render(){
        const disabledInfo={...this.props.ings};
        for( let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0;
        }
        let orderSummary=null;
        
        let burger=this.props.error?<p>ingredients can't be loaded</p>:<Spinner /> 
        if(this.props.ings){
            burger=
            (<Fragment>
                <Burger ingredients={this.props.ings} />
                <BuildControls addIngredient={this.props.onIngredientAdd} removeIngredient={this.props.onIngredientRemove} 
                disabledinfo={disabledInfo}
                currentPrice={this.props.price}
                isAuth={this.props.isAuthenticated}
                purchaseinfo={this.updatePurchase(this.props.ings)}
                ordered={this.purchaseHandler}/>
            </Fragment>);
            orderSummary=(<OrderSummary ingredients={this.props.ings} price={this.props.price} purchaseCancel={this.purchaseCancel}
                purchaseContinue={this.purchaseContinue}  />)

        }
        
        return (
            <Fragment>
                <Modal show={this.state.purchasing} modalclosed={this.purchaseCancel}>
                 {orderSummary}
                </Modal>
                {burger}
            </Fragment>
        )
    }
}
const mapStateToProps=state=>{
  return {
      ings:state.burger.ingredients,
      price:state.burger.totalPrice,
      error:state.burger.error,
      purchase:state.order.purchased,
      isAuthenticated:state.auth.token !== null
  }
}
const mapDispatchToProps=dispatch=>{
  return{
      onIngredientAdd:(ingName)=>dispatch(burgerBuilderActions.addIngredient(ingName)),
      onIngredientRemove:(ingName)=>dispatch(burgerBuilderActions.removeIngredient(ingName)),
      onFetchingIngredients:()=>dispatch(burgerBuilderActions.fetchIngredients()),
      onInitPurchase:()=>dispatch(burgerBuilderActions.purchaseInit())
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(errorhandler(BurgerBuilder,axios));

/*
addIngredientHandler=(type)=>{
    const oldcount=this.state.ingredients[type];
    const updatedCount=oldcount+1;
    this.state.ingredients[type]=updatedCount;
    const updatedIngredients={...this.state.ingredients}
    const oldprice=this.state.totalPrice;
    const newPrice=oldprice+Ingredient_Prices[type];
    this.setState({ingredients:updatedIngredients,totalPrice:newPrice});
    this.updatePurchase(updatedIngredients);
}
removeIngredientHandler=(type)=>{
    const oldcount=this.state.ingredients[type];
    if(oldcount<=0){
       return;
    }
    const updatedCount=oldcount-1;
    this.state.ingredients[type]=updatedCount;
    const updatedIngredients={...this.state.ingredients}
    const oldprice=this.state.totalPrice;
    const newPrice=oldprice - Ingredient_Prices[type];
    this.setState({ingredients:updatedIngredients,totalPrice:newPrice});
    this.updatePurchase(updatedIngredients);
  
}*/