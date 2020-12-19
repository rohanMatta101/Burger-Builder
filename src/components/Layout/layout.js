import React,{ Component,Fragment } from 'react';
import classes from '../Layout/layout.css';
import ToolBar from '../Navigation/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';
class Layout extends Component{
    state={
        showSideDrawer:false
    }
    sideDrawerHandler=()=>{
        this.setState({showSideDrawer:false});
    }
    sideDrawerToggle=()=>{
        this.setState((prevState)=>{
           return  {showSideDrawer:!prevState.showSideDrawer}
    })   
    }
    render(){
    return (
        <Fragment>
        <div className={classes.Content}>
            <ToolBar isAuth={this.props.isAuthenticated} sideDrawerToggle={this.sideDrawerToggle}/>
        </div>
        <SideDrawer isAuth={this.props.isAuthenticated} open={this.state.showSideDrawer} closed={this.sideDrawerHandler}/>
        <main className={classes.Content}>
            {this.props.children}
        </main>
        </Fragment>
    
    )
    }
}
const mapStateToProps=state=>{
    return {
       isAuthenticated: state.auth.token !== null
    }
}
export default connect(mapStateToProps,null)(Layout);