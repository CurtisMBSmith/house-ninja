import React, { Component, PropTypes } from 'react';
import FoodPrepItem from './FoodPrepItem';
import './FoodPrepList.scss';

export default class FoodPrepList extends Component {
  render() {
    return (
      <div className="plannedPrepList" >
        <h3 className="mealListHeader">Food Preparation</h3>
        { this.renderInterior() }
     </div>
    );
  }

  renderInterior() {
    return (
      this.props.plannedPrep.length !== 0 ? this.renderFoodPrepList() : this.renderNoFoodPrep()
    )
  }

  renderFoodPrepList() {
    return (
      <ul>
        { this.props.plannedPrep.map((prep, i) => <FoodPrepItem desc={prep.desc} servings={prep.servings}
              cookTimeMins={prep.cookTimeMins} completed={prep.completed} key={i} />) }
      </ul>
    )
  }

  renderNoFoodPrep() {
    return (
      <div className="noFoodPrep">
        <h3>No food preparation planned</h3>
        <h4><a href="#">Plan some prep?</a></h4>
      </div>
    )
  }

}

FoodPrepList.propTypes = {
  plannedPrep: PropTypes.array.isRequired
};
