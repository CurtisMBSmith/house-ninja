import {
  HOUSEHOLD_CREATE_START,
  HOUSEHOLD_CREATE_ERR,
  HOUSEHOLD_REGISTER,
  HOUSEHOLD_SHOW_JOIN_FORM,
  HOUSEHOLD_SHOW_CREATE_FORM
} from '../../constants/action/types/household/HouseholdActionTypes';

const initialState = {
  createInProg: false,
  joinInProg: false,
  showJoinForm: false,
  household: {
    name: 'The Smith Family',
    id: 1
  },
  householdCreateErr: null,
};

const householdCreateStart = (state = initialState) => {
  return Object.assign({}, state, {
    createInProg: true,
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
    createInProg: false
  });
};

const toggleJoinForm = (state = initialState, showForm = false) => {
  return Object.assign({}, state, {
    showJoinForm: showForm
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
      return toggleJoinForm(state, true);
    case HOUSEHOLD_SHOW_CREATE_FORM:
      return toggleJoinForm(state, false);
    default:
      return state;
  }
};

export { household };