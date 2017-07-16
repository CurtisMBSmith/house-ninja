import React, { Component } from 'react';
import { connect } from 'react-redux';
import { advanceDayView } from '../../../../actions/meal/';
import FoodDayPlan from '../../../basic/containers/meal/FoodDayPlan';
import PlannerNav from '../../../basic/containers/meal/PlannerNav';
import './MealPlanPanel.scss';

class MealPlanPanel extends Component {
  render() {
    return (
      <div id="mealPlanPanel">
        <PlannerNav forwardBackwardAction={this.props.changeDayView} />
        <FoodDayPlan plannedMeals={this.props.plannedMeals[this.props.currentPlanningDay] || [] }
            plannedPrep={this.props.plannedPrep[this.props.currentPlanningDay] || [] }
            day={this.props.currentPlanningDay} />
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    plannedMeals: state.domain.meal.plannedMeals,
    plannedPrep: state.domain.meal.plannedPrep,
    currentPlanningDay: state.ui.meal.currentPlanningDay
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
