import React,{ Component,Fragment } from 'react';
import Modal from '../../components/UI/Modal/Modal';

const errorhandler=(WrappedComponent,axios)=>{
    return class extends Component{
        state={
            error:null
        };
        componentWillMount(){
            this.reqInterceptor=axios.interceptors.request.use(request=>{
               this.setState({error:null});
               return request;
            })
            this.resInterceptor=axios.interceptors.response.use(res=>res,error=>{
               this.setState({error:error});
            });

        }
        componentWillUnmount(){
            console.log('will unmount');
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }
        errorConfirmHandler=()=>{
          this.setState({error:null})
        }
        render(){
            return (
                 <Fragment>
                  <Modal show={this.state.error} modalclosed={this.errorConfirmHandler}>
                    {this.state.error ? this.state.error.message:null  }
                  </Modal>
                  <WrappedComponent {...this.props}/>

                 </Fragment>
            )
        }
    }

}
export default errorhandler;