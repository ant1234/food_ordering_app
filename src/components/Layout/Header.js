import React from "react";
import classes from './Header.module.css';
import headerImage from '../../assets/meals.jpg';
import HeaderCartButton from "./HeaderCartButton";

const Header = props => {
    return (
        <React.Fragment>
            <header className={classes.header}>
                <h1>Mealing Ordering System</h1>
                <HeaderCartButton onCartClick={props.onCartClick}/>
            </header>
            <div className={classes['main-image']}>
                <img src={headerImage} alt="A table full of food"/>
            </div>
        </React.Fragment>
    );
};

export default Header;