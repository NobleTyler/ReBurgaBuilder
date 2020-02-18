import React from 'react';
import Ax from '../../hoc/Ax';
import classes from './Layout.css'
import Toolbar from '../Navigation/Toolbar/Toolbar'
const layout = (props) => (
   <Ax>
    <Toolbar/>
    <main className={classes.Content}>
       {props.children} 
    </main>
    </Ax>
);

export default layout; 