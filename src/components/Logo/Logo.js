import React from 'react';
import classes from '../Logo/Logo.css';
import BurgerLogo from '../../assets/images/burger-logo.png';

const logo=(props)=>{
    return (
        <div className={classes.Logo} style={{height:props.height}}>
            <img src={BurgerLogo} />
        </div>
    )
}
export default logo;