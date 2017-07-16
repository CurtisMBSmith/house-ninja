import React, { Component } from 'react';
import { connect } from 'react-redux';
import FoodDayPlan from '../../basic/containers/meal/FoodDayPlan';
import MealPlanPanel from './meal/MealPlanPanel';
import './PlannerPanel.scss';

class PlannerPanel extends Component {
  render() {
    return (
      <div id="planner">
        { this.conditionallyRenderLookback() }
        <div id="dayPlanner">
          <MealPlanPanel />
        </div>
      </div>
    );
  }

  conditionallyRenderLookback() {
    if (this.props.showLookback) {
      return (
        <div id="dayLookback">
          <FoodDayPlan />
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    household: state.domain.household.household,
    showLookback: state.ui.meal.showLookback
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlannerPanel);
