import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.css'

/**
 *  JSX code for teh checkout summary,
 *  It's all in the modal the clicked calls functions passed through props to bring them back via Cancelled
 *  Or the checkout page via continue 
 * @param {*} props 
 */
const checkoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>Your order is almost ready!</h1>
      <div style={{ width: '100%', margin: 'auto' }}>
        <Burger ingredients={props.ingredients}></Burger>
      </div>
      <Button clicked={props.checkoutCancelled} btnType='Danger'>
        Cancel
      </Button>
      <Button clicked={props.checkoutContinued} btnType='Success'>
        Continue
      </Button>
    </div>
  )
}

export default checkoutSummary
