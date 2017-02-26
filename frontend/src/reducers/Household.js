import {
  HOUSEHOLD_CREATE_START,
  HOUSEHOLD_CREATE_ERR,
  HOUSEHOLD_REGISTER,
  HOUSEHOLD_CREATE_SHOW_FORM
} from '../constants/actions/HouseholdActionTypes';

const initialState = {
  householdCreateInProg: false,
  showHouseholdCreateForm: false,
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

const showHouseholdForm = (state = initialState, action) => {
  return Object.assign({}, state, {
    login_in_prog: false,
    login_err: action.login_err
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
    case HOUSEHOLD_CREATE_SHOW_FORM:
      return showHouseholdForm(state, action);
    default:
      return state;
  }
};

export { household };