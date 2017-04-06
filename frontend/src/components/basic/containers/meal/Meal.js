import React, { Component, PropTypes } from 'react';
import './Meal.scss';

export default class Meal extends Component {
  render() {
    return (
      <li class="meal">
        {this.props.desc} <span class="mealPlannedFor">{this.mealPlannedFor()}</span>
      </li>
    );
  };

  mealPlannedFor() {
    return "(All)"; // TODO
  }
}

Meal.propTypes = {
  desc: PropTypes.string.isRequired
}
