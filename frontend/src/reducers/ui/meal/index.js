import {
  MEAL_ADVANCE_DAY,
  SHOW_LOOKBACK_DAY,
  HIDE_LOOKBACK_DAY
} from '../../../constants/action/types/meal/MealActionTypes';

const initialState = {
  dayIndex: 0,
  showLookback: false
};

const changeLookbackState = (state = initialState, newLookbackState) => {
  return Object.assign({}, state, {
    showLookback: newLookbackState
  });
};

const advanceDay = (state = initialState, action) => {
  var newIndex = state.dayIndex + action.amount;
  return Object.assign({}, state, {
    dayIndex: newIndex
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
