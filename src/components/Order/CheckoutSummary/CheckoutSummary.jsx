import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.css'

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
