import React, { Component, PropTypes } from 'react';
import PlannedMeal from './PlannedMeal';
import './PlannedMealList.scss';

export default class PlannedMealList extends Component {
  render() {
    return (
      <div className="plannedMealList" >
        <h3 className="mealListHeader">Meals</h3>
        <ul>
        {
          this.props.plannedMeals.map((meal, i) => <PlannedMeal name={meal.name} meals={meal.meals} key={i} />)
        }
        </ul>
     </div>
    );
  }

}

PlannedMealList.propTypes = {
  plannedMeals: PropTypes.array.isRequired
};
