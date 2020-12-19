import React, { Fragment,Component } from 'react';
import Button from '../../UI/Button/Button';

class orderSummary extends Component{
    componentWillUpdate(){
        console.log('hello');
    }
    render(){
        const ingredientsummary=Object.keys(this.props.ingredients)
       .map(igkey=>{
       return (<li>{igkey}+{this.props.ingredients[igkey]}</li>)
       });
     return (
     <Fragment>
     <p>YOUR ORDER</p>
     {ingredientsummary}
     <p>{this.props.price.toFixed(2)}$</p>
     <p>Proceed to Checkout</p>
     <Button btnType="Danger" key={1} clicked={this.props.purchaseCancel}>CANCEL</Button>
     <Button btnType="Success" key={2} clicked={this.props.purchaseContinue}>CONTINUE</Button>
     </Fragment>
 )
}
}
export default orderSummary;