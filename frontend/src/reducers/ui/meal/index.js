import moment from 'moment';
import {
  MEAL_ADVANCE_DAY,
  SHOW_LOOKBACK_DAY,
  HIDE_LOOKBACK_DAY
} from '../../../constants/action/types/meal/MealActionTypes';

const initialState = {
  currentPlanningDay: moment().startOf('day'),
  showLookback: false
};

const changeLookbackState = (state = initialState, newLookbackState) => {
  return Object.assign({}, state, {
    showLookback: newLookbackState
  });
};

const advanceDay = (state = initialState, action) => {
  return Object.assign({}, state, {
    currentPlanningDay: state.currentPlanningDay.clone().add(action.amount, 'd')
  });
};

const meal = (state = initialState, action) => {
  switch (action.type) {
    case MEAL_ADVANCE_DAY:
      return advanceDay(state, action);
    case SHOW_LOOKBACK_DAY:
      return changeLookbackState(state, true);
    case HIDE_LOOKBACK_DAY:
      return changeLookbackState(state, false);
    default:
      return state;
  }
};

export default meal;
