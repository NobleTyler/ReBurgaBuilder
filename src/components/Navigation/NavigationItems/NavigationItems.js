import React from 'react'
import classes from '../NavigationItems/NavigationItems.css'
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem'
/**
 * Takes the navigation item and passes the props to thelinks to them
 * Also creates an unordered list of them
 * @param {*} props 
 */
const navigationItems = props => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link='/' exact>
      Burger Builder
    </NavigationItem>
    {props.isAuthenticated ? (
      <NavigationItem link='/orders'>Orders</NavigationItem>
    ) : null}
    {props.isAuthenticated ? (
      <NavigationItem link='/logout'>Logout</NavigationItem>
    ) : (
      <NavigationItem link='/auth'>Sign Up/In</NavigationItem>
    )}
  </ul>
)
export default navigationItems
