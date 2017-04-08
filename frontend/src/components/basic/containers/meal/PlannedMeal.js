import React, { Component, PropTypes } from 'react';
import Meal from './Meal';
import './PlannedMeal.scss';

export default class PlannedMeal extends Component {
  render() {
    return (
      <li className="meal" key={this.props.id} >
        <div className="mealName">
          <p>{this.props.name}</p>
        </div>
        <div className="mealList" >
          <ul>
            {this.props.meals.map((meal, i) => <Meal desc={meal.desc} key={i}/>)}
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

