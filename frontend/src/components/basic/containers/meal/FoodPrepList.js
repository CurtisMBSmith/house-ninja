import React, { Component, PropTypes } from 'react';
import FoodPrepItem from './FoodPrepItem';
import './FoodPrepList.scss';

export default class FoodPrepList extends Component {
  render() {
    return (
      <div className="plannedPrepList" >
        <h3 className="mealListHeader">Cooks</h3>
        <ul>
        {
          this.props.plannedPrep.map((prep, i) => <FoodPrepItem desc={prep.desc} servings={prep.servings}
              cookTimeMins={prep.cookTimeMins} completed={prep.completed} key={i} />)
        }
        </ul>
     </div>
    );
  }

}

FoodPrepList.propTypes = {
  plannedPrep: PropTypes.array.isRequired
};
