import {
  MEAL_ADVANCE_DAY
} from '../../../constants/action/types/meal/MealActionTypes';

const initialState = {
  dayIndex: 0
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
    default:
      return state;
  }
};

export default meal;