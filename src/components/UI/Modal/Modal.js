import React from 'react'
import Backdrop from '../Backdrop/Backdrop'
import classes from './Modal.css'

/**
 * Creates the modal with a style that makes it pop down and opens up a backdrop.
 * Also exports a memo so this only changes if the props changes. in this case props show namely
 * @param {*} props 
 */
const modal = props => {
  return (
    <React.Fragment>
      <Backdrop show={props.show} clicked={props.modalClosed} />
      <div
        className={classes.Modal}
        style={{
          transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
          opacity: props.show ? '1' : '0'
        }}
      >
        {props.children}
      </div>
    </React.Fragment>
  )
}

export default React.memo(
  modal,
  (prevProps, nextProps) =>
    nextProps.show === prevProps.show &&
    nextProps.children === prevProps.children
)
