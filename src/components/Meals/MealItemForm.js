import React from "react";
import classes from "./MealItemForm.module.css";
import Input from "../UI/Input";

const MealItemForm = props => {

    const onOrderHandler = event => {
        event.preventDefault();
        console.log(event.target.elements);
    };

    return (
        <form onSubmit={onOrderHandler} className={classes.form} type="submit">
            <div>
                <Input 
                    input={{
                        id: Math.random().toFixed(10), 
                        type: "number",
                        step: "1",
                        label: "Enter amount",
                        min: "1",
                        max: "5",
                        defaultValue: "1",
                    }}
                />
                <button>Add + </button>
            </div>
        </form>
    );
};

export default MealItemForm;