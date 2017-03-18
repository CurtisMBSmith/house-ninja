import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageHeader from '../panels/PageHeader';
import DashPanel from '../panels/DashPanel';
import { retrieveHousehold } from '../../../actions/household';

class MainPage extends Component {

  render() {
    return (
      <div>
        <PageHeader />
        <div id="content">
          <DashPanel />
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
)(MainPage);