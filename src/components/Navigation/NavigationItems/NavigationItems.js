import React from 'react';
import classes from '../NavigationItems/NavigationItems.css';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';

const navitems=(props)=>{
  return (
      <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>

        {!props.isAuthenticated?<NavigationItem link="/auth" exact>Authenticate</NavigationItem>:<NavigationItem link="/logout" exact>Logout</NavigationItem>}
        {props.isAuthenticated?<NavigationItem link="/orders">Orders</NavigationItem>:null}
      </ul>
  )
}
export default navitems;
