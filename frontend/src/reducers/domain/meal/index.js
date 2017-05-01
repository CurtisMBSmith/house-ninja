import moment from 'moment';

const mockUsers = [
  {
    id: 1,
    givenName: 'Curtis',
    surname: 'Smith'
  },
  {
    id: 2,
    givenName: 'Liz',
    surname: 'Snell'
  },
  {
    id: 3,
    givenName: 'Ryker',
    surname: 'Smith'
  }
];

const meals = [
  {
    id: 1,
    desc: 'Orange Juice and Toast',
    prepMins: 5,
    external: false,
    consumers: [mockUsers[0]]
  },
  {
    id: 2,
    desc: 'Oatmeal',
    prepMins: 5,
    external: false,
    consumers: [mockUsers[2]]
  },
  {
    id: 3,
    desc: 'Bacon and Eggs',
    prepMins: 15,
    external: false,
    consumers: [mockUsers[1]]
  },
  {
    id: 1,
    desc: 'Beef Stew',
    prepMins: 0,
    external: false,
    consumers: [mockUsers[0], mockUsers[1]]
  },
  {
    id: 2,
    desc: 'Rice Cereal',
    prepMins: 0,
    external: false,
    consumers: [mockUsers[2]]
  },
  {
    id: 1,
    desc: 'Pizza',
    prepMins: 0,
    external: true,
    consumers: mockUsers
  }
];

const mockPlannedMeal = (id, name, meals) => {
  return {
    id,
    name,
    meals
  };
};

const mockPlannedMeals = () => {
  return [
    mockPlannedMeal(1, 'Breakfast', [meals[0], meals[1], meals[2]]),
    mockPlannedMeal(2, 'Lunch', [meals[3], meals[4]]),
    mockPlannedMeal(3, 'Dinner', [meals[5]])
  ];
};

const mockPlannedPrep = () => {
  return [{
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
  }];
};

const mockDays = () => {
  var dayArray = [];
  for (var i = 0; i < 5; i++) {
    dayArray.push({
      date: moment().startOf('day').add(i - 2, 'days'),
      plannedMeals: mockPlannedMeals(),
      plannedPrep: mockPlannedPrep()
    });
  }

  return dayArray;
};

const mockPlannedDays = () => {
  return {
    days: mockDays()
  };
};

const mockInitialState = () => {
  return {
    plannedDays: mockPlannedDays()
  };
};

const initialState = mockInitialState();

const meal = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default meal;