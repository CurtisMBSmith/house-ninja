import React, { Component, PropTypes } from 'react';
import '../styles/components/HouseholdBanner.scss';

export default class HouseholdBanner extends Component {
  render() {
    return (
      <div className="householdBanner" >
        <h1 className="householdName">{this.props.displayName}</h1>
        <p>{this.props.householdId}</p>
     </div>
    );
  };
}

HouseholdBanner.propTypes = {
  displayName: PropTypes.string.isRequired,
  householdId: PropTypes.number.isRequired
}
