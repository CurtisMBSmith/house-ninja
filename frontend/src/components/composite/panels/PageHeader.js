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
          <UserDetailsPanel displayName={this.props.userDisplayName}
            onLogOut={this.props.onLogOut} />
        </div>
      );
    } else {
      return (
        <div className="pageHeader">
          <UserDetailsPanel displayName={this.props.userDisplayName}
            onLogOut={this.props.onLogOut} />
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    household: state.household.household,
    userDisplayName: state.auth.display_name
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogOut: () => {
      dispatch(doLogOut());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageHeader);