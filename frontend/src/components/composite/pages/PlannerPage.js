import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageHeader from '../panels/PageHeader';
import PlannerPanel from '../panels/PlannerPanel';
import { retrieveHousehold } from '../../../actions/household';

class PlannerPage extends Component {

  render() {
    return (
      <div>
        <PageHeader />
        <div id="content">
          <PlannerPanel />
        </div>
      </div>
    )
  }

  componentWillMount() {
    this.props.retrieveHousehold();
  }
}

const mapStateToProps = (state) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    retrieveHousehold: () => {
      dispatch(retrieveHousehold());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlannerPage);