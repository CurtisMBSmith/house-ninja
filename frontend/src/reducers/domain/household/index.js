import {
  HOUSEHOLD_REGISTER
} from '../../../constants/action/types/household/HouseholdActionTypes';

const initialState = {
  household: null, //{
    // name: 'The Smith Family',
    // id: 1
  // },
};

const householdRegister = (state = initialState, action) => {
  return Object.assign({}, state, {
    household: action.household,
  });
};

const household = (state = initialState, action) => {
  switch (action.type) {
    case HOUSEHOLD_REGISTER:
      return householdRegister(state, action);
    default:
      return state;
  }
};

export default household;