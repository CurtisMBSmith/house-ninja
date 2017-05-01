import {
  HOUSEHOLD_CREATE_START,
  HOUSEHOLD_CREATE_ERR,
  HOUSEHOLD_RETRIEVE_START,
  HOUSEHOLD_RETRIEVE_ERR,
  HOUSEHOLD_JOIN_ERR
} from '../../../constants/action/types/household/HouseholdActionTypes';

const initialState = {
  createInProg: false,
  joinInProg: false,
  joinErr: null,
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

const householdJoinErr = (state = initialState, action) => {
  return Object.assign({}, state, {
    joinErr: action.joinErr
  });
};

const household = (state = initialState, action) => {
  switch (action.type) {
    case HOUSEHOLD_CREATE_START:
      return householdCreateStart(state, action);
    case HOUSEHOLD_CREATE_ERR:
      return householdCreateErr(state, action);
    case HOUSEHOLD_RETRIEVE_START:
      return householdRetrieveStart(state);
    case HOUSEHOLD_RETRIEVE_ERR:
      return householdRetrieveErr(state, action);
    case HOUSEHOLD_JOIN_ERR:
      return householdJoinErr(state, action);
    default:
      return state;
  }
};

export default household;