import React from 'react'
import classes from '../NavigationItem/NavigationItem.css'
import { NavLink } from 'react-router-dom'

/**
 * Component for the navigation Item
 * uses navlink from react-router-dom to set up links via props
 * Navlink just allows for more styling
 * @param {*} props
 */
const navigationItem = props => (
  <li className={classes.NavigationItem}>
    <NavLink
      exact={props.exact}
      activeClassName={classes.active}
      to={props.link}
    >
      {props.children}
    </NavLink>
  </li>
)

export default navigationItem
