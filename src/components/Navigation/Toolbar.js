import React from 'react';
import classes from '../Navigation/Toolbar.css';
import Logo from '../../components/Logo/Logo';
import NAV from '../Navigation/NavigationItems/NavigationItems';
import DrawerToggle from '../Navigation/SideDrawer/DrawerToggle/DrawerToggle';

const toolbar=(props)=>{
    return (
        <header className={classes.ToolBar}>
            <DrawerToggle clicked={props.sideDrawerToggle}/>
            <Logo height="80%"/>
           <nav className={classes.DesktopOnly}>
               <NAV isAuthenticated={props.isAuth} />
           </nav>
        </header>
    )
}
export default toolbar;