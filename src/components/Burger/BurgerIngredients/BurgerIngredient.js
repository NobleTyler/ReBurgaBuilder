import React from 'react'
import PropTypes from 'prop-types'
import classes from './BurgerIngredient.css'

/**
 * Takes in props and based on the type it creates said ingredient.
 * The ingredient is just a div with CSS noted at the top
 * @param {*} props 
 */
const burgerIngredient = props => {
  let ingredient = null
  switch (props.type) {
    case 'bread-bottom':
      ingredient = <div className={classes.BreadBottom}></div>
      break
    case 'bread-top':
      ingredient = (
        <div className={classes.BreadTop}>
          <div className={classes.Seeds1}></div>
          <div className={classes.Seeds2}></div>
        </div>
      )
      break
    case 'meat':
      ingredient = <div className={classes.Meat}></div>
      break
    case 'cheese':
      ingredient = <div className={classes.Cheese}></div>
      break
    case 'bacon':
      ingredient = <div className={classes.Bacon}></div>
      break
    case 'salad':
      ingredient = <div className={classes.Salad}></div>
      break
    default:
      ingredient = null
  }
  return ingredient
}

burgerIngredient.propTypes = {
  type: PropTypes.string.isRequired
}
export default burgerIngredient
