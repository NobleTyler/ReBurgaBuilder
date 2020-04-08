import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import * as actions from '../../../store/actions/index'
import { connect } from 'react-redux'
const logout = props => {
  useEffect(() => {
    props.onLogout(this.props.history)
  }, [])
  return <Redirect to='/' />
}
const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout())
  }
}
export default connect(null, mapDispatchToProps)(logout)
