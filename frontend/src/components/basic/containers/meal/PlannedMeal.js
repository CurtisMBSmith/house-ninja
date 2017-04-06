import React, { Component, PropTypes } from 'react';
import FoodPrepList from './Meal';
import './PlannedMeal.scss';

export default class PlannedMeal extends Component {
  render() {
    return (
      <li class="meal">
        <div class="mealName">
          <p>{this.props.name}</p>
        </div>
        <div class="mealList" >
          <ul>
            {this.props.meals.map(meal => <Meal desc={meal.desc} />)}
          </ul>
        </div>
      </li>
    );
  };
}

PlannedMeal.propTypes = {
  name: PropTypes.string.isRequired,
  meals: PropTypes.array.isRequired
}

