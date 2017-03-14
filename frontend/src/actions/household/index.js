import {
  HOUSEHOLD_CREATE_ERR, HOUSEHOLD_CREATE_START,
  HOUSEHOLD_REGISTER, HOUSEHOLD_SHOW_JOIN_FORM,
  HOUSEHOLD_SHOW_CREATE_FORM
} from '../../constants/action/types/household/HouseholdActionTypes';

export const beginCreateHousehold = () => {
  return {
    type: HOUSEHOLD_CREATE_START
  };
};

export const createHouseholdErr = (err) => {
  return {
    error: err,
    type: HOUSEHOLD_CREATE_ERR
  };
};

export const createHouseholdSuccess = (household) => {
  return {
    household,
    type: HOUSEHOLD_REGISTER
  };
};

export const createHousehold = (name) => {
  return dispatch => {
    dispatch(beginCreateHousehold());
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    var jsonBody = JSON.stringify({});
    jsonBody = JSON.stringify({
      name
    });

    return fetch('http://localhost:3000/households/create', {
      method: 'post',
      credentials: 'same-origin',
      headers,
      body: jsonBody
    })
    .then(resp => resp.json())
    .then(json => {
      if (json.isError) {
        dispatch(createHouseholdErr(json.err));
      } else {
        dispatch(createHouseholdSuccess(json));
      }
    })
    .catch(err => dispatch(createHouseholdErr(err.status + ': ' + err.statusText)));
  };

};

export const showJoinForm = () => {
  return {
    type: HOUSEHOLD_SHOW_JOIN_FORM
  };
};

export const showCreateForm = () => {
  return {
    type: HOUSEHOLD_SHOW_CREATE_FORM
  };
};