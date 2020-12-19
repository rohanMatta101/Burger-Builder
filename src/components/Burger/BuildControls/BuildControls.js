import React from 'react';
import classes from '../BuildControls/BuildControls.css';
import BuildControl  from '../BuildControls/BuildControl/BuildControl';

const controls=[
    
    {label:'Salad',type:'salad'},
    {label:'Bacon',type:'bacon'},
    {label:'Cheese',type:'cheese'},
    {label:'Meat',type:'meat'},

]

const buildcontrols = (props) => {
    return (
    <div className={classes.BuildControls}>
        <p>Current Price:<strong>{props.currentPrice.toFixed(2)}$</strong></p>
      {controls.map(x=>{
          return <BuildControl label={x.label} key={x.label} added={()=>props.addIngredient(x.type)} 
          removed={()=>props.removeIngredient(x.type)}
          disable={props.disabledinfo[x.type]} />
      })}
      <button className={classes.OrderButton} disabled={!props.purchaseinfo} onClick={props.ordered}>{props.isAuth?'ORDER NOW':'SIGN UP TO ORDER'}</button>
    </div>
    )

}

export default  buildcontrols;