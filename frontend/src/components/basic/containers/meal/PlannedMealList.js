import React, { Component, PropTypes } from 'react';
import PlannedMeal from './PlannedMeal';
import './PlannedMealList.scss';

export default class PlannedMealList extends Component {
  render() {
    return (
      <div className="plannedMealList" >
        <h3 className="mealListHeader">Meals</h3>
        <ul>
        { this.renderInterior() }
        </ul>
     </div>
    );
  }

  renderInterior() {
    return (
      this.props.plannedMeals.length !== 0 ? this.renderPlannedMealList() : this.renderNoPlannedMeals()
    )
  }

  renderPlannedMealList() {
    return (
      <ul>
        { this.props.plannedMeals.map((meal, i) => <PlannedMeal name={meal.name}
              meals={meal.meals} key={i} />) }
      </ul>
    )
  }

  renderNoPlannedMeals() {
    return (
      <div className="noPlannedMeals">
        <h3>No meals planned</h3>
        <h4><a href="#">Plan some meals?</a></h4>
      </div>
    )
  }

}

PlannedMealList.propTypes = {
  plannedMeals: PropTypes.array.isRequired
};
