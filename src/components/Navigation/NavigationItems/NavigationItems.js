import React from 'react'
import classes from '../NavigationItems/NavigationItems.css'
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem'
const navigationItems = props => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link='/' exact >Burger Builder</NavigationItem>
    <NavigationItem link='/orders'>Orders</NavigationItem>
    {!props.isAuthenticated? 
    <NavigationItem link='/auth'>Sign Up/In</NavigationItem>
    :<NavigationItem link='/logout'>Logout</NavigationItem>}
  </ul>
)
export default navigationItems
