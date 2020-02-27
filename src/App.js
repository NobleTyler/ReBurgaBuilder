import React, { Component } from 'react'
import './index.css'
import Layout from './components/Layout/Layout'
import Checkout from './containers/Checkout/Checkout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import { Route, Switch } from 'react-router-dom'
import Orders from './containers/Orders/Orders'
class App extends Component {
  state = {
    show: true
  }
  componentDidMount () {
    setTimeout(() => {
      this.setState({ show: false })
    }, 5000)
  }
  render () {
    // Add for testing eject <Layout>{this.state.show ? <BurgerBuilder /> : null}</Layout>
    return (
      <div>
        <Layout>
          <Switch>
            <Route path='/checkout' component={Checkout} />
            <Route path='/orders' component={Orders} />
            <Route path='/' exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    )
  }
}

export default App
