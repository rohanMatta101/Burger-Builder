import React from 'react';
import Burgeringredient from './BurgerIngredients/BugerIngredients';
import classes from '../Burger/Burger.css';

const burger=(props)=>{
    let transformedingred=Object.keys(props.ingredients)
    .map(igkey=>{
        
        return [...Array(props.ingredients[igkey])].map((_,i)=>{
            return <Burgeringredient key={igkey + i} type={igkey} />
        })
    })
    .reduce((arr,el)=>{
        return arr.concat(el)
    },[]);
    if(transformedingred.length === 0){
       transformedingred = <p>No ingredients used!</p>
    }
    console.log(transformedingred);
    return ( 
      <div className={classes.Burger}>
        <Burgeringredient type="bread-top" />
        {transformedingred}
        <Burgeringredient type="bread-bottom" />          
      </div>
    )
}
export default burger;
//line 9 
// this helps construct a new array having a certain amount of cheese,salad etc.
//like 2 cheese will have an array.after this array is formed map method is applied to return the burgeringredient component with that cheese,salad data/number of cheese,salad.

//reduce method used for flattening arrays having arrays nested in them i.e we convert the main array into an array having all the elements of the inside nested arrays
// this [[1,2,3],['one','two']] becomes [1,2,3,'one','two']