import React, { useEffect } from 'react'
import axios from '../../axios-orders'
import { connect } from 'react-redux'
import Order from '../../components/Order/Order'
import * as actions from '../../store/actions/index'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'

/**
 * Handles orrder jsx as well as fetches orders from the props.
 * @param {*} props
 */
const orders = props => {
  const { onFetchOrders } = props
  useEffect(() => {
    onFetchOrders(props.token, props.userId)
  }, [onFetchOrders])

  console.log(props)
  let orders = <Spinner />
  if (!props.loading) {
    orders = props.orders.map(order => (
      <Order
        key={order.id}
        ingredients={order.ingredients}
        price={order.price}
      />
    ))
  }
  return <div>{orders}</div>
}
/**
 * Take in the state to props so it can be used in orders
 * @param {*} state
 */
const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  }
}
/**
 * Now we can dispatch our orders to the store
 * @param {*} dispatch
 */
const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) =>
      dispatch(actions.fetchOrders(token, userId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(orders, axios))
