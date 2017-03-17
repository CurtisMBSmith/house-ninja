import {
  HOUSEHOLD_CREATE_START,
  HOUSEHOLD_CREATE_ERR,
  HOUSEHOLD_REGISTER,
  HOUSEHOLD_SHOW_JOIN_FORM,
  HOUSEHOLD_SHOW_CREATE_FORM,
  HOUSEHOLD_RETRIEVE_START,
  HOUSEHOLD_RETRIEVE_ERR
} from '../../constants/action/types/household/HouseholdActionTypes';

const initialState = {
  createInProg: false,
  joinInProg: false,
  showJoinForm: false,
  household: null, //{
    // name: 'The Smith Family',
    // id: 1
  // },
  createErr: null,
  retrieveInProg: false,
  retrieveErr: null
};

const householdCreateStart = (state = initialState) => {
  return Object.assign({}, state, {
    createInProg: true,
    createErr: null
  });
};

const householdCreateErr = (state = initialState, action) => {
  return Object.assign({}, state, {
    createErr: action.err,
  });
};

const householdRetrieveStart = (state = initialState) => {
  return Object.assign({}, state, {
    retrieveInProg: true,
    retrieveErr: null
  });
};

const householdRetrieveErr = (state = initialState, action) => {
  return Object.assign({}, state, {
    retrieveInProg: false,
    retrieveErr: action.err,
  });
};

const householdRegister = (state = initialState, action) => {
  return Object.assign({}, state, {
    household: action.household,
    createErr: null,
    createInProg: false,
    retrieveInProg: false
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
    case HOUSEHOLD_RETRIEVE_START:
      return householdRetrieveStart(state);
    case HOUSEHOLD_RETRIEVE_ERR:
      return householdRetrieveErr(state, action);
    default:
      return state;
  }
};

export { household };