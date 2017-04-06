import React, { Component, PropTypes } from 'react';
import FoodPrepItem from './FoodPrepItem';
import './FoodPrepList.scss';

export default class FoodPrepList extends Component {
  render() {
    return (
      <div className="plannedPrepList" >
        <h3 className="mealListHeader">Meals</h3>
        <li>
        {
          this.props.plannedPrep.forEach(prep => <FoodPrepItem desc={prep.desc} servings={prep.servings}
              cookTimeMins={prep.cookTimeMins} completed={prep.completed} />)
        }
        </li>
     </div>
    );
  }

}

FoodPrepList.propTypes = {
  plannedPrep: PropTypes.array.isRequired
};
