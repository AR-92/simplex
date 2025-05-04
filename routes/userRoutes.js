const userController = require('../controllers/userController');

module.exports = [
  {
    method: 'GET',
    // Matches: /users
    path: /^\/users$/,
    handler: userController.listUsers
  },
  {
    method: 'GET',
    // Matches: /users/new
    path: /^\/users\/new$/,
    handler: userController.newUserForm
  },
  {
    method: 'POST',
    // Matches: /users
    path: /^\/users$/,
    handler: userController.createUser
  },
  {
    method: 'GET',
    // Matches: /users/1/edit where 1 is the user id
    path: /^\/users\/(?<id>\d+)\/edit$/,
    handler: userController.editUserForm
  },
  {
    method: 'POST',
    // Matches: /users/1 for updating a user
    path: /^\/users\/(?<id>\d+)$/,
    handler: userController.updateUser
  },
  {
    method: 'POST',
    // Matches: /users/1/delete for deleting a user
    path: /^\/users\/(?<id>\d+)\/delete$/,
    handler: userController.deleteUser
  }
];
