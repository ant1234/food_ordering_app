import classes from "./MealItem.module.css";

const MealItem = props => {

    return (
        props.meals.map(meal => 
        <li className={classes.meal}>
            <div key={meal.id} >
                <h3>{meal.name}</h3>
                <div key={meal.id} className={classes.description}>
                {meal.description}
                </div>
                <div key={meal.id} className={classes.price}>
                    {meal.price}
                </div>
            </div>
            <div>
                
            </div> 
        </li>
        )
    );
}; 

export default MealItem;