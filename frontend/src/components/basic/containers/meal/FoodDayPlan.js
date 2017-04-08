import React, { Component, PropTypes } from 'react';
import PlannedMealList from './PlannedMealList';
import FoodPrepList from './FoodPrepList';
import './FoodDayPlan.scss';

export default class FoodDayPlan extends Component {
  render() {
    return (
      <div className="foodDayPlan" >
        <h2 className="dayPlanDate">{this.getDayString()}</h2>
        <PlannedMealList plannedMeals={this.props.plan.plannedMeals} />
        <FoodPrepList plannedPrep={this.props.plan.plannedPrep} />
     </div>
    );
  }

  getDayString() {
    // TODO
    return this.props.plan.date.toString();
  }
}

FoodDayPlan.propTypes = {
  plan: PropTypes.object
};
