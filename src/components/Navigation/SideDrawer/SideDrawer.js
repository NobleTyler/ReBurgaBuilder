import React from 'react'
import NavigationItems from '../NavigationItems/NavigationItems'
import classes from './SideDrawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop'
import Ax from '../../../hoc/Ax'
const sideDrawer = props => {
  let attachedClasses = [classes.SideDrawer, classes.Close]
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open]
  }
  return (
    <Ax>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Ax>
  )
}

export default sideDrawer
