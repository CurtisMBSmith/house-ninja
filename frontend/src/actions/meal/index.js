import {
  MEAL_ADVANCE_DAY
} from '../../constants/action/types/meal/MealActionTypes';

export const advanceDayView = (amt) => {
  return {
    type: MEAL_ADVANCE_DAY,
    amount: amt
  };
};

export const nextDayView = () => {
  return advanceDayView(1);
};

export const previousDayView = () => {
  return advanceDayView(-1);
};
