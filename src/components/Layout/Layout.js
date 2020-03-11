import React, { Component } from 'react'
import Ax from '../../hoc/Ax'
import {connect} from 'react-redux'
import classes from './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
class Layout extends Component {
  state = {
    showSideDrawer: false
  }
  SideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false })
  }
  sideDrawerToggleHandler = () => {
    this.setState(prevState => {
      return { showSideDrawer: !prevState.showSideDrawer }
    })
  }
  render () {
    return (
      <Ax>
        <Toolbar 
        isAuth={this.props.isAuthenticated}
        drawerToggleClicked={this.sideDrawerToggleHandler} />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          closed={this.SideDrawerClosedHandler}
          open={this.state.showSideDrawer}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Ax>
    )
  }
}
const mapStateToProps = state =>{
  return{
    isAuthenticated: state.auth.token !== null
  }
}
export default connect(mapStateToProps)(Layout)
