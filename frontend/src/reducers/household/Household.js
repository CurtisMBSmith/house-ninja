import {
  HOUSEHOLD_CREATE_START,
  HOUSEHOLD_CREATE_ERR,
  HOUSEHOLD_REGISTER,
  HOUSEHOLD_SHOW_JOIN_FORM
} from '../../constants/action/types/household/HouseholdActionTypes';

const initialState = {
  householdCreateInProg: false,
  showHouseholdJoinForm: false,
  household: {
    name: 'The Smith Family',
    id: 1
  },
  householdCreateErr: null,
};

const householdCreateStart = (state = initialState) => {
  return Object.assign({}, state, {
    householdCreateInProg: true,
    householdCreateErr: null
  });
};

const householdCreateErr = (state = initialState, action) => {
  return Object.assign({}, state, {
    householdCreateErr: action.err,
  });
};

const householdRegister = (state = initialState, action) => {
  return Object.assign({}, state, {
    household: action.household,
    householdCreateErr: null,
    householdCreateInProg: false
  });
};

const showHouseholdJoinForm = (state = initialState, action) => {
  return Object.assign({}, state, {
    showHouseholdJoinForm: true
  });
};

const household = (state = initialState, action) => {
  switch (action.type) {
    case HOUSEHOLD_CREATE_START:
      return householdCreateStart(state, action);
    case HOUSEHOLD_CREATE_ERR:
      return householdCreateErr(state, action);
    case HOUSEHOLD_REGISTER:
      return householdRegister(state, action);
    case HOUSEHOLD_SHOW_JOIN_FORM:
      return showHouseholdJoinForm(state, action);
    default:
      return state;
  }
};

export { household };