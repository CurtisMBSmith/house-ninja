import React, { Component } from 'react';
import { connect } from 'react-redux';
import './PlannerPanel.scss';

class PlannerPanel extends Component {
  render() {
    return (
      <div id="planner">
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    household: state.domain.household.household,
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