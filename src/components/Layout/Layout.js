import React, { useState } from 'react'
import {connect} from 'react-redux'
import classes from './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
const layout = props => {
  const [sideDrawerIsVisible,setSideDrawerIsVisible] = useState(false)

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
        drawerToggleClicked={sideDrawerToggleHandler} />
        <SideDrawer
          isAuth={props.isAuthenticated}
          closed={sideDrawerClosedHandler}
          open={sideDrawerIsVisible}
        />
        <main className={classes.Content}>{props.children}</main>
      </React.Fragment>
    )
}
const mapStateToProps = state =>{
  return{
    isAuthenticated: state.auth.token !== null
  }
}
export default connect(mapStateToProps)(layout)
