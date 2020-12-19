import React, { Fragment } from  'react';
import classes from '../SideDrawer/SideDrawer.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import BackDrop from '../../UI/BackDrop/BackDrop';

const sidedrawer=(props)=>{
    let attatchedClasses=[classes.SideDrawer,classes.Close];
    if(props.open){
        attatchedClasses=[classes.SideDrawer,classes.Open];
    }
    return(
        <Fragment>
           
            <BackDrop show={props.open} clicked={props.closed}/>

           
            <div className={attatchedClasses.join(' ')}>
         <Logo height="11%"/>
         <nav>
          <NavigationItems isAuthenticated={props.isAuth}/>
         </nav>
         </div>
         </Fragment>
    )
}
export default sidedrawer;