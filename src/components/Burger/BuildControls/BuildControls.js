import React from 'react'

const buildControls =(props)=> {
<div>
    <div className={classes.BuildControl}>
    <div>{props.label}</div>
    <button>Less</button>
    <button>More</button>
    </div>
</div>
};
export default buildControls;