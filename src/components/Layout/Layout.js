import React from 'react';
import Ax from '../../hoc/Ax';
const layout = (props) => (
   <Ax>
    <div> Toolbar,Sidebar, Backdrop</div>
    <main>
       {props.children} 
    </main>
    </Ax>
);

export default layout; 