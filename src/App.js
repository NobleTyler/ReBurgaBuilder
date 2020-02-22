import React, { Component } from 'react'
import './index.css'
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
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
          <BurgerBuilder />
        </Layout>
      </div>
    )
  }
}

export default App
