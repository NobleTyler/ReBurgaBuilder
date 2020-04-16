import React from 'react'
import classes from './BuildControl.css'
/**
 * This class contains the buttons for the build controls. The buttons that allow you to select more or less ingredients.
 * It works by passing props from BuildControls to see if buttons can be clicked or if they are clicked.
 * @param {*} props
 */
const buildControl = props => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button
      className={classes.Less}
      onClick={props.removed}
      disabled={props.disabled}
    >
      Less
    </button>
    <button className={classes.More} onClick={props.added}>
      More
    </button>
  </div>
)
export default buildControl
