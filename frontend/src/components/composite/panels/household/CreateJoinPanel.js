import React, { Component } from 'react';
import { connect } from 'react-redux';
import HouseholdCreateForm from '../../../basic/forms/household/HouseholdCreateForm';
import HouseholdJoinForm from '../../../basic/forms/household/HouseholdJoinForm';
import { createHousehold, joinHousehold, showJoinForm, showCreateForm } from '../../../../actions/household';

class CreateJoinPanel extends Component {
  render() {
    return (
      <div className="householdCreateJoinPanel" >
        <div className="householdCreateTab">
          <a href="#" onClick={e=> {
            e.preventDefault();
            this.props.toggleCreateForm();
          }} >Create</a>
        </div>
        <div className="householdJoinTab">
          <a href="#" onClick={e=> {
            e.preventDefault();
            this.props.toggleJoinForm();
          }} >Join</a>
        </div>
        {this.props.showJoinForm ? <HouseholdJoinForm /> : <HouseholdCreateForm create={this.props.createHousehold}/>}
     </div>
    );
  };

}

const mapStateToProps = (state) => {
  return {
    showJoinForm: state.ui.household.showJoinForm,
    createErr: state.app.household.createErr,
    joinErr: state.app.household.joinErr
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleCreateForm: () => dispatch(showCreateForm()),
    toggleJoinForm: () => dispatch(showJoinForm()),
    createHousehold: (name) => dispatch(createHousehold(name)),
    joinHousehold: (code) => dispatch(joinHousehold(code))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateJoinPanel);