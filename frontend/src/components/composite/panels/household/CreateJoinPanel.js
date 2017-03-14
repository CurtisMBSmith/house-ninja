import React, { Component } from 'react';
import { connect } from 'react-redux';
import HouseholdCreateForm from '../../basic/forms/household/HouseholdCreateForm';
import HouseholdJoinForm from '../../basic/forms/household/HouseholdJoinForm';
import { createHousehold, joinHousehold, showJoinForm, showCreateForm } from '../../../../actions/household';

export default class CreateJoinPanel extends Component {
  render() {
    return (
      <div className="householdCreateJoinPanel" >
        <div className="householdCreateTab">
          <a href="#" onClick={e=> {
            e.preventDefault();
            this.props.showCreateForm();
          }} >Create</a>
        </div>
        <div className="householdJoinTab">
          <a href="#" onClick={e=> {
            e.preventDefault();
            this.props.showJoinForm();
          }} >Join</a>
        </div>
        {this.props.showJoinForm ? <HouseholdJoinForm /> : <HouseholdCreateForm />}
     </div>
    );
  };

}

const mapStateToProps = (state) => {
  return {
    showJoinForm: state.household.showJoinForm,
    createErr: state.household.createErr,
    joinErr: state.household.joinErr
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    showCreateForm: () => dispatch(showCreateForm()),
    showJoinForm: () => dispatch(showJoinForm()),
    createHousehold: (name) => dispatch(createHousehold(name)),
    joinHousehold: (code) => dispatch(joinHousehold(code))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateJoinPanel);