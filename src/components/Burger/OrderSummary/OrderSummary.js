import React from 'react';
import Ax from '../../../hoc/Ax';
import Button from '../../UI/Button/Button'
const orderSummary =(props) => {
const ingredientSummary=Object.keys(props.ingredients).map(igKey=>{
return (
<li key={igKey}>
    <span style={{textTransform:'capitalize'}}>{igKey}</span>:{props.ingredients[igKey]}
</li>);
});

return(
<Ax>
    <h3>Your order</h3>
    <p>A burger with the followint ingredients:</p>
<ul>{ingredientSummary}</ul>
<p><strong>Total Price:{props.price.toFixed(2)}</strong></p>
<p>Continue to checkout?</p>
<Button btnType="Danger"clicked={props.purchaseCanceled}>Cancel</Button>
<Button btnType="Success"clicked={props.purchaseContinued}>Continue</Button>
</Ax>
)};
export default orderSummary;