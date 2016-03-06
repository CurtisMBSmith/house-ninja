'use strict';

var moment = require('moment');

function setUpTasks(dependencies) {
  if (!dependencies.home || !dependencies.curtisUser || !dependencies.lizUser) {
    return;
  }

  var Task = dependencies.Task;

  Task.create({
    description: 'Feed the cats',
    due: moment().endOf('hour').add(1, 'day').toDate(),
    householdId: dependencies.home.id
  });
  Task.create({
    description: 'Feed the cats',
    due: moment().startOf('hour').subtract(4, 'hour').toDate(),
    completedBy: dependencies.lizUser.id,
    completed: moment().toDate(),
    householdId: dependencies.home.id
  });
  Task.create({
    description: 'Fix leaky faucet',
    householdId: dependencies.home.id
  });
}

function setUpUsers(dependencies) {
  var User = dependencies.User;

  User.create({
    email: 'Curtis.MBSmith@gmail.com',
    givenName: 'Curtis',
    surname: 'Smith',
    password: 'ChangePassword1'
  }).then(function(user) {
    dependencies.curtisUser = user;
    dependencies.homeCallback(dependencies);
    dependencies.userHomeCallback(dependencies);
  });

  User.create({
    email: 'Liz.Snell@gmail.com',
    givenName: 'Liz',
    surname: 'Snell',
    password: 'LizzityPass1'
  }).then(function(user) {
    dependencies.lizUser = user;
    dependencies.userHomeCallback(dependencies);
  });
}

function setUpHouseholds(dependencies) {
  var Household = dependencies.Household;

  Household.create({
    name: 'Curtis and Liz\'s Home',
    type: 'Family',
    createdBy: dependencies.curtisUser.id
  }).then(function(home) {
    dependencies.home = home;
    dependencies.userHomeCallback(dependencies);
    dependencies.taskCallback(dependencies);
  });
}

function associateUsersAndHouseholds(dependencies) {
  if (!dependencies.home || !dependencies.curtisUser || !dependencies.lizUser) {
    return;
  }

  var HouseholdUser = dependencies.HouseholdUser;

  HouseholdUser.create({
    userId: dependencies.curtisUser.id,
    householdId: dependencies.home.id
  });

  HouseholdUser.create({
    userId: dependencies.lizUser.id,
    householdId: dependencies.home.id
  });
}

function importSampleData(models) {
  // Create object to hold the generated objects.
  var manager = {
    curtisUser: undefined,
    lizUser: undefined,
    home: undefined,
    homeCallback: setUpHouseholds,
    taskCallback: setUpTasks,
    userHomeCallback: associateUsersAndHouseholds,
    HouseholdUser: models.HouseholdUser,
    Household: models.Household,
    User: models.User,
    Task: models.Task
  };

  setUpUsers(manager);
}

module.exports.importSampleData = importSampleData;
