import React, { Component } from 'react';
import { connect } from 'react-redux';
import FoodDayPlan from '../../basic/containers/meal/FoodDayPlan';
import MealPlanPanel from './meal/MealPlanPanel';
import { retrievePlannedMeals } from '../../../actions/meal';
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

  componentWillMount() {
    this.props.fetchMeals();
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
    fetchMeals: () => {
      dispatch(retrievePlannedMeals('2017-07-19', '2017-07-26'));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlannerPanel);
