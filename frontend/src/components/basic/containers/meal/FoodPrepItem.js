import React, { Component, PropTypes } from 'react';
import './FoodPrepItem.scss';

export default class PlannedMeal extends Component {
  render() {
    return (
      <li class="prepItem">
        <span class="cookTime">
          {this.props.cookTimeMins}
        </span>
        <span class="servings">
          {this.props.servings}
        </span>
        <span class="desc">
          {this.props.desc}
        </span>
        <span class="completed">
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

