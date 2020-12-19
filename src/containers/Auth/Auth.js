import React,{ Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from '../Auth/Auth.css';
import * as Actions from '../../Store/Actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
class Auth extends Component{
    state={
        controls:{
            email:{
                elementType:'input',
                  elementConfig:{
                      type:'email',
                      placeholder:'Your E-mail'
                  },
                  value:'',
                  validation:{
                    required:true,
                    isEmail:true
                },
                valid:false,
                touched:false
              },
              password:{
                elementType:'input',
                  elementConfig:{
                      type:'password',
                      placeholder:'Your Password'
                  },
                  value:'',
                  validation:{
                    required:true,
                    minLength:6
                },
                valid:true,
                touched:false
              },
              
        },
        isSignup:true
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
     inputchangedHandler=(event,controlName)=>{
       const updatedControls={
           ...this.state.controls,
           [controlName]:{
               ...this.state.controls[controlName],
               value:event.target.value,
               touched:true,
               valid:this.checkValidity(event.target.value,this.state.controls[controlName].validation)
           }
       }
       this.setState({controls:updatedControls})

     }
     submitHandler=(event)=>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignup);
     }
     switchAuthMode=()=>{
         this.setState(prevState=>{
             return{isSignup:!prevState.isSignup}
         })
     }
    render()
    {
        let formArr=[];
        for ( let key in this.state.controls){
            formArr.push({
                id:key,
                config:this.state.controls[key]
            })
        }
        let form=formArr.map(formelement=>{
            return <Input 
            key={formelement.id}
            invalid={!formelement.config.valid} 
            touched={formelement.config.touched} 
            elementType={formelement.config.elementType} 
            changed={(event)=>this.inputchangedHandler(event,formelement.id)} 
            elementConfig={formelement.config.elementConfig} 
            value={formelement.config.value}/>
        })
        if(this.props.loading)
        {
            form = <Spinner />
        }
        let errorMessage=null;
        if(this.props.error)
        {
        errorMessage=<p>{this.props.error.message}</p>
        }
        let authRedirect=null;
         if(this.props.isAuthenticated){
             authRedirect=<Redirect to="/"/>
         }
        return(
          <div className={classes.Auth}>
              {errorMessage}
              {authRedirect}
             <form onSubmit={this.submitHandler}>
                {form}
                <Button btnType="Success">SUBMIT</Button>
             </form>
        <Button btnType="Danger" clicked={this.switchAuthMode}>Switch to{this.state.isSignup?'SIGNIN':'SIGNUP'}</Button>
          </div>
        )
    }
}
const mapStateToProps=(state)=>{
  return{
      loading:state.auth.loading,
      error:state.auth.error,
      isAuthenticated:state.auth.token !== null
  }
}
const mapDispatchToProps=(dispatch)=>{
  return{
      onAuth:(email,password,isSignup)=>dispatch(Actions.auth(email,password,isSignup))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Auth);