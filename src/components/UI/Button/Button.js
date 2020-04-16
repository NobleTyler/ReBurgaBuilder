import React from 'react'
import classes from './Button.css'

/**
 *  This is just a button but allows for better styling now rather than styling buttons in each seperate component we do it here
 * @param {*} props 
 */
const button = props => (
  <button
    disabled={props.disabled}
    className={[classes.Button, classes[props.btnType]].join(' ')}
    onClick={props.clicked}
  >
    {props.children}
  </button>
)
export default button
