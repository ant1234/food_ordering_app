import React from "react";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem";
import Card from "../UI/Card";

let responseMeals;

const DUMMY_MEALS = await fetch('https://react-http-f885f-default-rtdb.firebaseio.com/meals.json');

if(DUMMY_MEALS.ok) {
  responseMeals = await DUMMY_MEALS.json();
} 

const AvailableMeals = () => {

  const responseMealsArray = Object.keys(responseMeals).map(key => {
    return { meals: responseMeals[key] };
  });

    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                {responseMealsArray.map(meal => 
                  <MealItem 
                    id={meal.meals.id} 
                    name={meal.meals.name}
                    description={meal.meals.description}
                    price={meal.meals.price}
                  />)}
                    
                </ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;