import React, { useState } from 'react'
import { connect } from 'react-redux'
import classes from './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

/**
 * creates the layout for the side drawer as well as tool bar
 * Then adds the visibility handlers to the state so it can be set from other components.
 * @param {*} props 
 */
const layout = props => {
  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false)

  const sideDrawerClosedHandler = () => {
    setSideDrawerIsVisible(false)
  }
  const sideDrawerToggleHandler = () => {
    setSideDrawerIsVisible(!sideDrawerIsVisible)
  }
  
  return (
    <React.Fragment>
      <Toolbar
        isAuth={props.isAuthenticated}
        drawerToggleClicked={sideDrawerToggleHandler}
      />
      <SideDrawer
        isAuth={props.isAuthenticated}
        closed={sideDrawerClosedHandler}
        open={sideDrawerIsVisible}
      />
      <main className={classes.Content}>{props.children}</main>
    </React.Fragment>
  )
}
/**
 * Subscribes compontent to the redux store so when any changes in state are made it's sent to props
 * @param {*} state 
 */
const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}
export default connect(mapStateToProps)(layout)
