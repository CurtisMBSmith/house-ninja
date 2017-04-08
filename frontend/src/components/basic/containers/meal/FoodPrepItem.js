import React, { Component, PropTypes } from 'react';
import './FoodPrepItem.scss';

export default class PlannedMeal extends Component {
  render() {
    return (
      <li className="prepItem">
        <span className="cookTime">
          {this.props.cookTimeMins}
        </span>
        <span className="servings">
          {this.props.servings}
        </span>
        <span className="desc">
          {this.props.desc}
        </span>
        <span className="completed">
          <input type="checkbox" />
        </span>
      </li>
    );
  };

  // TODO: Add checkbox.
}

PlannedMeal.propTypes = {
  cookTimeMins: PropTypes.number.isRequired,
  servings: PropTypes.number.isRequired,
  desc: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired
}

