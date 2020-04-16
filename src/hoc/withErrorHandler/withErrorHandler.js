import React from 'react'
import useHttpErrorHandler from '../../hooks/http-error-handler'
import Modal from '../../components/UI/Modal/Modal'

/**
 * Used to wrap anything we want eror handling on
 * It hanldes http errors from axios
 * And shows a modal if things fail
 * @param {*} WrappedComponent
 * @param {*} axios
 */
const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    const [error, clearError] = useHttpErrorHandler(axios)
    return (
      <React.Fragment>
        <Modal show={error} modalClosed={clearError}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </React.Fragment>
    )
  }
}

export default withErrorHandler
