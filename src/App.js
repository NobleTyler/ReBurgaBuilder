import React, { useEffect,Suspense } from 'react'
import './index.css'
import * as actions from './store/actions/index'
import {connect} from 'react-redux'
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import { Route, Switch,withRouter,Redirect } from 'react-router-dom'
import Logout from './containers/Auth/Logout/Logout'
import spinner from './components/UI/Spinner/Spinner'

//Lazy Loading Modules
const Checkout = React.lazy(()=>{
  return import('./containers/Checkout/Checkout')
})
const Orders = React.lazy(()=>{
  return import('./containers/Orders/Orders')
})
const Auth = React.lazy(()=>{
  return import('./containers/Auth/Auth')
})

const app = props =>  {
  useEffect(() => {
    props.onTryAutoSignup()
  },[])

    let routes = (
      <Switch>
            <Route path='/auth' render={(props)=><Auth {...props} />} />
            <Route path='/' exact component={BurgerBuilder} />
            <Redirect to='/'/>
      </Switch>
    )
    if(props.isAuthenticated){
      routes =(<Switch>
        <Route path='/checkout' render={(props)=> <Checkout {...props} />} />
            <Route path='/orders' render={(props)=> <Orders {...props} />} />
            <Route path='/auth' render={(props)=> <Auth  {...props}/>} />
            <Route path='/logout' component={Logout} />
            <Route path='/' exact component={BurgerBuilder} />
            <Redirect to='/'/>
            </Switch>)
   }
    // Add for testing eject <Layout>{this.state.show ? <BurgerBuilder /> : null}</Layout>
    return (
      <div>
        <Layout>
          <Suspense fallback={spinner}>
            {routes}
          </Suspense>
        </Layout>
      </div>
    )
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
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(app))
