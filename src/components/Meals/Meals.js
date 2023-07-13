import React from "react";
import AvailableMeals from "./AvailableMeals";
import MealsSummary from "./MealsSummary";

const Meals = props => {
    return (
        <React.Fragment>
            <AvailableMeals />
            <MealsSummary />
        </React.Fragment>
    );
};

export default Meals;