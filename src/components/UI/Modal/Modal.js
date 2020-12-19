import React,{ Fragment, Component } from 'react';
import classes from './Modal.css';
import BackDrop from '../BackDrop/BackDrop';

class Modal extends Component{
    shouldComponentUpdate(nextProps,nextState){
        return nextProps.show!==this.props.show || nextProps.children !== this.props.children;
    }
    componentWillUpdate(){
        console.log('MODAL WILL update');
    }
    render(){
    return (
     <Fragment>
         <BackDrop show={this.props.show} clicked={this.props.modalclosed}/> 
    <div 

     className={classes.Modal}
      style={{
          transform : this.props.show ? 'translateY(0)':'translateY(-100h)',
          opacity:this.props.show ? '1':'0'
      }}>
        {this.props.children}
    </div>
    </Fragment>
    )
    } 
}

export default Modal;