import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateJoinPanel from './household/CreateJoinPanel';
import PlannerPanel from './PlannerPanel';
import './DashPanel.scss';

class DashPanel extends Component {
  render() {
    if (this.props.household !== null) {
      return (
        <div id="dash">
          <PlannerPanel />
        </div>
      );
    } else {
      return (
        <div id="dash">
          <CreateJoinPanel />
        </div>
      );
    }
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
)(DashPanel);
