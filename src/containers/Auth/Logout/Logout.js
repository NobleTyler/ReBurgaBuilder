import React, { useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import * as actions from '../../../store/actions/index'
import { connect } from 'react-redux'
/**
 * Takes in props and then when onLogout changes executes on logout from the actions store
 * @param {*} props
 */
const logout = props => {
  const { onLogout } = props
  useEffect(() => {
    onLogout()
  }, [onLogout])

  return <Redirect to='/' />
}
/**
 * updates the store by dispatching the logout from actions
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout())
  }
}
/**
 * The connect function just matches the dispatch to props so that it works when called
 */
export default connect(null, mapDispatchToProps)(logout)
