import {
  HOUSEHOLD_SHOW_JOIN_FORM,
  HOUSEHOLD_SHOW_CREATE_FORM,
} from '../../../constants/action/types/household/HouseholdActionTypes';

const initialState = {
  showJoinForm: false,
};

const toggleJoinForm = (state = initialState, showForm = false) => {
  return Object.assign({}, state, {
    showJoinForm: showForm
  });
};

const household = (state = initialState, action) => {
  switch (action.type) {
    case HOUSEHOLD_SHOW_JOIN_FORM:
      return toggleJoinForm(state, true);
    case HOUSEHOLD_SHOW_CREATE_FORM:
      return toggleJoinForm(state, false);
    default:
      return state;
  }
};

export default household;