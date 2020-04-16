import React from 'react'

import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'
/**
 * This class contains all the controls it updates the box containing all of the build controls
 * The component is functional and is exported to other classes
 */
const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' }
]

/**
 * The build controls constant takes in props and displays the price which is passed in
 * as well as the ingredients which is passed in above.
 * The jsx code here uses .map to create a BuildControl component for each ingredient
 * And passes on ingredient added and removed via props
 * @param {*} props
 */
const buildControls = props => (
  <div className={classes.BuildControls}>
    <p>
      Current Price: <strong>${props.price.toFixed(2)}</strong>
    </p>
    {controls.map(ctrl => (
      <BuildControl
        key={ctrl.label}
        label={ctrl.label}
        added={() => props.ingredientAdded(ctrl.type)}
        removed={() => props.ingredientRemoved(ctrl.type)}
        disabled={props.disabled[ctrl.type]}
      />
    ))}
    <button
      className={classes.OrderButton}
      disabled={!props.purchasable}
      onClick={props.ordered}
    >
      {props.isAuth ? 'ORDER NOW' : 'SIGN IN TO ORDER'}
    </button>
  </div>
)

export default buildControls
