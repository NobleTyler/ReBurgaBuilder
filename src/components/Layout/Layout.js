import React from 'react';
import Ax from '../../hoc/Ax';
import classes from './Layout.css'
const layout = (props) => (
   <Ax>
    <div> Toolbar,Sidebar, Backdrop</div>
    <main className={classes.Content}>
       {props.children} 
    </main>
    </Ax>
);

export default layout; 