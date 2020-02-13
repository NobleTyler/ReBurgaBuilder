import React from 'react';
import Ax from '../../../hoc/Ax';

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
<p>Continue to checkout?</p>
</Ax>
)};
export default orderSummary;