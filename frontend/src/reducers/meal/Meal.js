import {
  HOUSEHOLD_CREATE_START,
  HOUSEHOLD_CREATE_ERR,
  HOUSEHOLD_REGISTER,
  HOUSEHOLD_SHOW_JOIN_FORM,
  HOUSEHOLD_SHOW_CREATE_FORM,
  HOUSEHOLD_RETRIEVE_START,
  HOUSEHOLD_RETRIEVE_ERR
} from '../../constants/action/types/household/HouseholdActionTypes';
import moment from 'moment';

const initialState = {
  fetchInProg: false,
  plannedDays: {
    dayIndex: 0,
    days: [{
      date: moment().startOf('day'),
      plannedMeals: [{
        id: 1,
        name: 'Breakfast',
        meals: [{
          id: 1,
          desc: 'Orange Juice and Toast',
          prepMins: 5,
          external: false,
          consumers: [{
            id: 1,
            givenName: 'Curtis',
            surname: 'Smith'
          }]
        }, {
          id: 2,
          desc: 'Oatmeal',
          prepMins: 5,
          external: false,
          consumers: [{
            id: 3,
            givenName: 'Ryker',
            surname: 'Smith'
          }]
        }, {
          id: 3,
          desc: 'Bacon and Eggs',
          prepMins: 15,
          external: false,
          consumers: [{
            id: 2,
            givenName: 'Liz',
            surname: 'Snell'
          }]
        }]
      }, {
        id: 2,
        name: 'Lunch',
        meals: [{
          id: 1,
          desc: 'Beef Stew',
          prepMins: 0,
          external: false,
          consumers: [{
            id: 1,
            givenName: 'Curtis',
            surname: 'Smith'
          }, {
            id: 2,
            givenName: 'Liz',
            surname: 'Snell'
          }]
        }, {
          id: 2,
          desc: 'Rice Cereal',
          prepMins: 0,
          external: false,
          consumers: [{
            id: 3,
            givenName: 'Ryker',
            surname: 'Smith'
          }]
        }]
      }, {
        id: 3,
        name: 'Dinner',
        meals: [{
          id: 1,
          desc: 'Pizza',
          prepMins: 0,
          external: true,
          consumers: [{
            id: 1,
            givenName: 'Curtis',
            surname: 'Smith'
          }, {
            id: 2,
            givenName: 'Liz',
            surname: 'Snell'
          }, {
            id: 3,
            givenName: 'Ryker',
            surname: 'Smith'
          }]
        }]
      }],
      plannedPrep: [{
        id: 1,
        desc: 'Soup',
        servings: 6,
        cookTimeMins: 60,
        completed: true
      }, {
        id: 2,
        desc: 'Chicken',
        servings: 5,
        cookTimeMins: 30,
        completed: false
      }, {
        id: 3,
        desc: 'Caesar Salad',
        servings: 5,
        cookTimeMins: 15,
        completed: false
      }]
    }]
  },
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

const mealPlan = (state = initialState, action) => {
  switch (action.type) {
    // case HOUSEHOLD_CREATE_START:
    //   return householdCreateStart(state, action);
    // case HOUSEHOLD_CREATE_ERR:
    //   return householdCreateErr(state, action);
    // case HOUSEHOLD_REGISTER:
    //   return householdRegister(state, action);
    // case HOUSEHOLD_SHOW_JOIN_FORM:
    //   return toggleJoinForm(state, true);
    // case HOUSEHOLD_SHOW_CREATE_FORM:
    //   return toggleJoinForm(state, false);
    // case HOUSEHOLD_RETRIEVE_START:
    //   return householdRetrieveStart(state);
    // case HOUSEHOLD_RETRIEVE_ERR:
    //   return householdRetrieveErr(state, action);
    default:
      return state;
  }
};

export { mealPlan };