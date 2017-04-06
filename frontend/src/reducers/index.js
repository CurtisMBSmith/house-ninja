import { combineReducers } from 'redux';
import { auth } from './user/Auth';
import { household } from './household/Household';
import { mealPlan } from './meal/Meal';

const app = combineReducers({
  auth,
  household,
  mealPlan
});

export default app;
