import React, { Component } from 'react';
import { connect } from 'react-redux';
import { nextDayView, previousDayView } from '../../../../actions/meal/';
import FoodDayPlan from '../../../basic/containers/meal/FoodDayPlan';
import './MealPlanPanel.scss';

class MealPlanPanel extends Component {
  render() {
    return (
      <div id="dash">
        <FoodDayPlan plan={this.getCurrentDayPlan()} nextDayView={this.props.nextDayView}
          previousDayView={this.props.previousDayView}/>
      </div>
    );
  }

  getCurrentDayPlan() {
    let index = this.props.dayIndex;
    let days = this.props.plannedDays.days;
    return index >= 0 && index < days.length ? days[index] : null;
  }
}

const mapStateToProps = (state) => {
  return {
    plannedDays: state.domain.meal.plannedDays,
    dayIndex: state.ui.meal.dayIndex
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    nextDayView: () => dispatch(nextDayView()),
    previousDayView: () => dispatch(previousDayView())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MealPlanPanel);