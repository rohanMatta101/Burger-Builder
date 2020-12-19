import React from 'react';
import classes from '../NavigationItem/NavigationItem.css';
import { NavLink } from 'react-router-dom';

const navitem=(props)=>{
    return (
    <li className={classes.NavigationItem}>
        <NavLink exact={props.exact} to={props.link} activeClassName={classes.active}>{props.children}</NavLink>
        </li>
    )
}
export default navitem;