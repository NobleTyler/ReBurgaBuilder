import React from 'react'
import Button from '../../UI/Button/Button'

/**
 *  Takes in props and then maps keys then returns jsk based on the key
 *  igKey is the ingredient key
 * @param {*} props 
 */
const orderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: 'capitalize' }}>{igKey}</span>:{' '}
        {props.ingredients[igKey]}
      </li>
    )
  })
/**
 * Displays the price of the order as well as teh entirity of the summary.
 * price is passed through props as well as the purchase which is then sent off.
 */
  return (
    <React.Fragment>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total Price: {props.price.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button btnType='Danger' clicked={props.purchaseCancelled}>
        CANCEL
      </Button>
      <Button btnType='Success' clicked={props.purchaseContinued}>
        CONTINUE
      </Button>
    </React.Fragment>
  )
}

export default orderSummary
