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
        <PlannedMealList plannedMeals={this.props.plannedMeals} />
        <FoodPrepList plannedPrep={this.props.plannedPrep} />
      </div>
    );
  }

  getDayString() {
    var startOfToday = moment().startOf('day');
    var dayDiff = startOfToday.diff(this.props.day, 'days');
    var result;
    if (dayDiff === 1) {
      result = 'Yesterday';
    } else if (dayDiff === 0) {
      result = 'Today';
    } else if (dayDiff === -1) {
      result = 'Tomorrow';
    } else {
      result = this.props.day.format('LL');
    }

    return result;
  }
}

FoodDayPlan.propTypes = {
  plannedMeals: PropTypes.array.isRequired,
  plannedPrep: PropTypes.array.isRequired,
  day: PropTypes.object.isRequired
};
