import React from 'react'
import classes from './DrawerToggle.css'

/**
 * This component is that three horizontal lines that opens the drawer
 * @param {*} props 
 */
const drawerToggle = props => (
  <div className={classes.DrawerToggle} onClick={props.clicked}>
    <div></div>
    <div></div>
    <div></div>
  </div>
)

export default drawerToggle
