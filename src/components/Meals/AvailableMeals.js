import React, {useEffect, useState} from "react";
import classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem";
import Card from "../UI/Card";

const AvailableMeals = () => {

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [httpError, setHttpError] = useState();

  useEffect(() => {

    const fetchMeals = async () => {
      
      let mealsArr = []; 
      let responseMeals;
      setIsLoading(true);

      const response = await fetch('https://react-http-f885f-default-rtdb.firebaseio.com/meals.json');

      if(!response.ok) {
         throw new Error('Something went wrong ..');
      }
        responseMeals = await response.json();
       
        for (const key in responseMeals) {
          mealsArr.push({
            id: key,
            name: responseMeals[key].name,
            description: responseMeals[key].description,
            price: responseMeals[key].price,
          });
        }

        setMeals(mealsArr);
        setIsLoading(false);

    }

    fetchMeals().catch(error => {
      setIsLoading(false);
      setHttpError(error.message);
    });

  }, []);

  if(isLoading) {
    return (
      <section className={classes.loading}>
        <p>Loading ...</p>
      </section>
    ); 
  }

  if(httpError) {
    return (
      <section className={classes.error}>
        <p>{httpError}</p>
      </section>
    ); 
  }

  return (
      <section className={classes.meals}>
          <Card>
              <ul>
              {meals.map(meal => 
                <MealItem 
                  id={meal.id} 
                  name={meal.name}
                  description={meal.description}
                  price={meal.price}
                />)}
                  
              </ul>
          </Card>
      </section>
  );
};

export default AvailableMeals;