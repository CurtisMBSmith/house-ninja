import React, { Component } from 'react';
import { connect } from 'react-redux';
import FoodDayPlan from '../../../basic/containers/meal/FoodDayPlan';
import './MealPlanPanel.scss';

class MealPlanPanel extends Component {
  render() {
    return (
      <div id="dash">
        <FoodDayPlan plan={this.getCurrentDayPlan} />
      </div>
    );
  }

  getCurrentDayPlan() {
    let index = this.props.plannedDays.dayIndex;
    let days = this.props.plannedDays.days;
    return index >= 0 && index < days.length ? days[index] : null;
  }
}

const mapStateToProps = (state) => {
  return {
    plannedDays: state.mealPlan.plannedDays
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MealPlanPanel);