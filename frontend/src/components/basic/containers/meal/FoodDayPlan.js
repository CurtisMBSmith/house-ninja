import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import PlannedMealList from './PlannedMealList';
import FoodPrepList from './FoodPrepList';
import './FoodDayPlan.scss';

export default class FoodDayPlan extends Component {
  render() {
    return (
      <div className="foodDayPlan" >
        <div className="dayPlanDate">
          <h2>{this.getDayString()}</h2>
        </div>
        <PlannedMealList plannedMeals={this.props.plan.plannedMeals} />
        <FoodPrepList plannedPrep={this.props.plan.plannedPrep} />
      </div>
    );
  }

  getDayString() {
    var startOfToday = moment().startOf('day');
    var dayDiff = startOfToday.diff(this.props.plan.date, 'days');
    var result;
    if (dayDiff === 1) {
      result = 'Yesterday';
    } else if (dayDiff === 0) {
      result = 'Today';
    } else if (dayDiff === -1) {
      result = 'Tomorrow';
    } else {
      result = this.props.plan.date.format('LL');
    }

    return result;
  }
}

FoodDayPlan.propTypes = {
  plan: PropTypes.object
};
