import React from "react";
import classes from "./Modal.module.css";
import ReactDOM  from "react-dom";

const BackDrops = props => {
    return <div className={classes.backdrop}></div>
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
            {ReactDOM.createPortal(<BackDrops/>, portalOverlay)}
            {ReactDOM.createPortal(<ModalOverLay>{props.children}</ModalOverLay>, portalOverlay)}
        </React.Fragment>
    );
};

export default Modal;