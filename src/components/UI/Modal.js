import React from "react";
import classes from "./Modal.module.css";
import ReactDOM  from "react-dom";

const BackDrops = props => {
    return <div className={classes.backdrop} onClick={props.onCloseCart}></div>
};

const ModalOverLay = props => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    );
};

const portalOverlay = document.getElementById('overlays');

const Modal = props => {
    return (
        <React.Fragment>
            {ReactDOM.createPortal(<BackDrops onCloseCart={props.onCloseCart}/>, portalOverlay)}
            {ReactDOM.createPortal(<ModalOverLay onCloseCart={props.onCloseCart}>{props.children}</ModalOverLay>, portalOverlay)}
        </React.Fragment>
    );
};

export default Modal;