import React, { Component } from 'react'
import './index.css'
import * as actions from './store/actions/index'
import {connect} from 'react-redux'
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import { Route, Switch,withRouter,Redirect } from 'react-router-dom'
import Logout from './containers/Auth/Logout/Logout'
import asyncComponent from './hoc/asyncComponent/asyncComponent'

//Lazy Loading Modules
const asyncCheckout = asyncComponent(()=>{
  return import('./containers/Checkout/Checkout')
})
const asyncOrders = asyncComponent(()=>{
  return import('./containers/Orders/Orders')
})
const asyncAuth = asyncComponent(()=>{
  return import('./containers/Auth/Auth')
})

class App extends Component {
  componentDidMount () {
  this.props.onTryAutoSignup()
  }
  render () {
    let routes = (
      <Switch>
            <Route path='/auth' component={asyncAuth} />
            <Route path='/' exact component={BurgerBuilder} />
            <Redirect to='/'/>
      </Switch>
    )
    if(this.props.isAuthenticated){
      routes =(<Switch>
        <Route path='/checkout' component={asyncCheckout} />
            <Route path='/orders' component={asyncOrders} />
            <Route path='/auth' component={asyncAuth} />
            <Route path='/logout' component={Logout} />
            <Route path='/' exact component={BurgerBuilder} />
            <Redirect to='/'/>
            </Switch>)
   }
    // Add for testing eject <Layout>{this.state.show ? <BurgerBuilder /> : null}</Layout>
    return (
      <div>
        <Layout>
          <Switch>
            {routes}
          </Switch>
        </Layout>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return{
    isAuthenticated:state.auth.token!==null
  }
}
const mapDispatchToProps= dispatch =>{
  return{
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App))
