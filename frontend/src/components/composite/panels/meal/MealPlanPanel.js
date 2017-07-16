import React, { Component } from 'react';
import { connect } from 'react-redux';
import { advanceDayView } from '../../../../actions/meal/';
import FoodDayPlan from '../../../basic/containers/meal/FoodDayPlan';
import PlannerNav from '../../../basic/containers/meal/PlannerNav';
import './MealPlanPanel.scss';

class MealPlanPanel extends Component {
  render() {
    return (
      <div id="dash">
        <PlannerNav forwardBackwardAction={this.props.changeDayView} />
        <FoodDayPlan plan={this.getCurrentDayPlan()}/>
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
    changeDayView: (amount) => dispatch(advanceDayView(amount))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MealPlanPanel);
