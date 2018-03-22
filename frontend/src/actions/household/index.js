import {
  HOUSEHOLD_CREATE_ERR, HOUSEHOLD_CREATE_START,
  HOUSEHOLD_REGISTER, HOUSEHOLD_SHOW_JOIN_FORM,
  HOUSEHOLD_SHOW_CREATE_FORM,
  HOUSEHOLD_RETRIEVE_START, HOUSEHOLD_RETRIEVE_ERR
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

export const beginRetrieveHousehold = () => {
  return {
    type: HOUSEHOLD_RETRIEVE_START
  };
};

export const retrieveHouseholdErr = (err) => {
  return {
    error: err,
    type: HOUSEHOLD_RETRIEVE_ERR
  };
};

export const registerHousehold = (household) => {
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

    return fetch('http://localhost/api/household/create', {
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
        dispatch(registerHousehold(json));
      }
    })
    .catch(err => dispatch(createHouseholdErr(err.status + ': ' + err.statusText)));
  };

};

export const retrieveHousehold = () => {
  return dispatch => {
    dispatch(beginRetrieveHousehold());
    var headers = new Headers();

    return fetch('http://localhost/api/household/details', {
      method: 'get',
      credentials: 'same-origin',
      headers
    })
    .then(resp => resp.json())
    .then(json => {
      if (json.isError) {
        dispatch(retrieveHouseholdErr(json.err));
      } else {
        dispatch(registerHousehold(json));
      }
    })
    .catch(err => dispatch(retrieveHouseholdErr(err.status + ': ' + err.statusText)));
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
