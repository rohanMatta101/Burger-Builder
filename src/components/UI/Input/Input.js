import React from 'react';
import classes from '../Input/Input.css';

const input=(props)=>{
    let inputElement=null;
    let inputclasses=[classes.InputElement];
    if(props.invalid&&props.touched){
         inputclasses.push(classes.Invalid);
    }
    switch(props.elementType){
        case('input'):
          inputElement=<input onChange={props.changed} className={inputclasses.join(' ')} {...props.elementConfig} value={props.value} />
          break;
        case('textarea'):
          inputElement=<textarea onChange={props.changed} className={inputclasses.join(' ')} {...props.elementConfig} value={props.value}/>
          break;
        case('select'):
          inputElement=(<select onChange={props.changed} className={inputclasses.join(' ')} >
                 {props.elementConfig.options.map(op=>{
                      return <option key={op.value}>
                          {op.displayValue}
                     </option>
                 })}
          </select>)
          break;    
        default:
            inputElement=<input onChange={props.changed} className={inputclasses.join(' ')} {...props.elementConfig} value={props.value}/>
            

    }
   return (
       <div className={classes.Input}>
           <label className={classes.Label}>{props.label}</label>
           {inputElement}
       </div>
   )
}
export default input