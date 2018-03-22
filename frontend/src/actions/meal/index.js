import {
  MEAL_ADVANCE_DAY,
  MEAL_FETCH_IN_PROG,
  MEALS_FETCHED,
  MEAL_FETCH_ERR
} from '../../constants/action/types/meal/MealActionTypes';

export const advanceDayView = (amt) => {
  return {
    type: MEAL_ADVANCE_DAY,
    amount: amt
  };
};

const beginMealFetch = () => {
  return {
    type: MEAL_FETCH_IN_PROG
  };
};

const mealsFetched = (meals) => {
  return {
    type: MEALS_FETCHED,
    meals
  }
}

const mealsFetchErr = (err) => {
  return {
    type: MEAL_FETCH_ERR,
    err
  }
}

export const retrievePlannedMeals = (startDay, endDay) => {
  return dispatch => {
    dispatch(beginMealFetch());
    var headers = new Headers();

    var url = new URL('http://localhost/api/meal/retrieve');
    url.searchParams.append('startDay', startDay);
    url.searchParams.append('endDay', endDay);
    return fetch(url, {
      method: 'get',
      credentials: 'same-origin',
      headers
    })
    .then(resp => resp.json())
    .then(json => {
      if (json.isError) {
        dispatch(mealsFetchErr(json.err));
      } else {
        dispatch(mealsFetched(json));
      }
    })
    .catch(err => dispatch(mealsFetchErr(err.status + ': ' + err.statusText)));
  };

};
