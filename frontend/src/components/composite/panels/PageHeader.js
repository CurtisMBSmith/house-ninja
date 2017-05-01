import React, { Component } from 'react';
import { connect } from 'react-redux';
import { doLogOut } from '../../../actions/user/';
import UserDetailsPanel from './user/UserDetailsPanel';
import HouseholdBanner from '../../basic/containers/household/HouseholdBanner';
import './PageHeader.scss';

class PageHeader extends Component {
  render() {
    if (this.props.household) {
      return (
        <div className="pageHeader">
          <HouseholdBanner displayName={this.props.household.name}
            householdId={this.props.household.id} />
          <UserDetailsPanel />
        </div>
      );
    } else {
      return (
        <div className="pageHeader">
          <UserDetailsPanel />
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    household: state.domain.household.household
  };
};

const mapDispatchToProps = (dispatch) => {
  return { };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageHeader);