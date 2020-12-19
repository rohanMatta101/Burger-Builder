import React, { Component } from 'react';
import classes from '../ContactData/ContactData.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import axios from '../../../axios-orders';
import Input from  '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import witherrorhandler from '../../../hoc/errorhandler/errorhandler'
import * as orderActions from '../../../Store/Actions/index';

class ContactData extends Component{
    state={
        orderform:{
          name:{
              elementType:'input',
              elementConfig:{
                  type:'text',
                  placeholder:'Your name'
              },
              value:'',
              validation:{
                  required:true
              },
              valid:false,
              touched:false
          },
          email:{
            elementType:'input',
              elementConfig:{
                  type:'email',
                  placeholder:'Your E-mail'
              },
              value:'',
              validation:{
                required:true
            },
            valid:false,
            touched:false
          },
         street:{
            elementType:'input',
              elementConfig:{
                  type:'text',
                  placeholder:'Your Street'
              },
              value:'',
              validation:{
                required:true
            },
            valid:false,
            touched:false
          },
            postalcode:{
                elementType:'input',
                elementConfig:{
                  type:'text',
                  placeholder:'ZIP code'
              },
              value:'',
              validation:{
                required:true,
                minLength:5
            },
            valid:false,
            touched:false

          },
          deliverymethod:{
            elementType:'select',
            elementConfig:{
              options:[
                  
                    {value:'fastest',displayValue:'Fastest'},
                    {value:'cheapest',displayValue:'Cheapest'}


                ]
          },
          value:'fastest',
          validation:{
            required:true,
          },
          valid:false,
          touched:false
        },

    },
   }
    orderhandler=(event)=>{
        //console.log(this.props.ingredients);
       event.preventDefault();
       this.setState({loading:true})
       const formdata={}
       for(let key in this.state.orderform){
           formdata[key]=this.state.orderform[key].value;
       }
      const order={
          ingredients:this.props.ings,
          data:formdata,
          price:this.props.price
          //price:this.state.totalPrice,

      };
      this.props.onPurchaseSuccess(order,this.props.token)
    }
    checkValidity(value,rules){
       let isValid=true;
       if(rules.required){
           

           isValid=value.trim() !== ''&&isValid;
           
       }
       if(rules.minLength){
           isValid=value.length >= rules.minLength&&isValid;
       }
       return isValid;

    }
    inputchangedHandler=(event,inputIdentifier)=>{
      const updatedform={
          ...this.state.orderform
      };
      const updatedformelement={
         ...updatedform[inputIdentifier]
      };
      updatedformelement.value=event.target.value;
      updatedformelement.valid=this.checkValidity(updatedformelement.value,updatedformelement.validation);
      console.log(updatedformelement.valid);
      updatedformelement.touched=true;
      updatedform[inputIdentifier]=updatedformelement;
      
      this.setState({orderform:updatedform});

    }
    render(){
        const formArr=[];
        for ( let key in this.state.orderform){
            formArr.push({
                id:key,
                config:this.state.orderform[key]
            })
        }
        let form=(<form onSubmit={this.orderhandler} className={classes.ContactData}>
             {formArr.map(formelement=>{
                 return <Input key={ formelement.id} invalid={!formelement.config.valid} touched={formelement.config.touched} elementType={formelement.config.elementType} changed={(event)=>this.inputchangedHandler(event,formelement.id)} elementConfig={formelement.config.elementConfig} value={formelement.config.value} />
             })}   

            <Button btnType="Success" clicked={this.orderhandler}>ORDER</Button>
            </form>)
         if(this.props.loading){
             form=<Spinner />
         }
         
        return (
            <div>
                <h4 className={classes.header}>Enter your contact details</h4>
                {form}
            </div>
        )
    }
}
const mapStateToProps=state=>{
    return{
       ings:state.burger.ingredients,
       price:state.burger.totalPrice,
       loading:state.order.loading,
       token:state.auth.token,
       
    }
}
const mapDispatchToProps=dispatch=>{
    return{
       onPurchaseSuccess:(orderData,token)=>dispatch(orderActions.purchaseBurger(orderData,token))
    }
}
//In mapStateToProps the state refers to the state in reducer
//this method is used so that we get the updated state from the reducer accessible on props


export default connect(mapStateToProps,mapDispatchToProps)(witherrorhandler(ContactData,axios));