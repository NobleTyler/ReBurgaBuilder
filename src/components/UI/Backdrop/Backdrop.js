import React from 'react'
import classes from './Backdrop.css'
/**
 *  This backdrop is the reason a modal pops up the background goes grey
 * @param {*} props
 */
const backdrop = props =>
  props.show ? (
    <div className={classes.Backdrop} onClick={props.clicked}></div>
  ) : null

export default backdrop
