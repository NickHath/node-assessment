const userData = require('../../userData.json');
module.exports = {
  getUsers: (req, res) => {
    let users = userData;
    if (req.query.age) {
      users = users.filter(user => user.age < req.query.age);
    } else if (req.query.lastname) {
      users = users.filter(user => user.last_name === req.query.lastname);
    } else if (req.query.email) {
      users = users.filter(user => user.email === req.query.email);
    } else if (req.query.favorites) {
      users = users.filter(user => user.favorites.includes(req.query.favorites));
    }
    res.status(200).send(users);
  },

  getUserById: (req, res) => {
    let user = userData.filter(user => user.id === req.params.userId * 1);
    user.length > 0 ? res.status(200).send(user[0]) : res.status(404).json(null);
  },

  getAdmins: (req, res) => {
    let admins = userData.filter(user => user.type === 'admin');
    res.status(200).send(admins);
  },

  getNonAdmins: (req, res) => {
    let nonAdmins = userData.filter(user => user.type !== 'admin');
    res.status(200).send(nonAdmins);
  },

  getUsersByType: (req, res) => {
    let users = userData.filter(user => user.type === req.params.userType);
    res.status(200).send(users);
  },

  updateUserById: (req, res) => {
    let updatedUsers = userData.map(user => {
      if (user.id === req.params.userId * 1) {
        return req.body;
      }
      return user;
    });
    res.status(200).send(updatedUsers);
  },

  addUser: (req, res) => {
    let newId = userData[userData.length - 1].id + 1;
    let newUser = req.body;
    newUser.id = newId;
    userData.push(newUser);
    res.status(200).send(userData);
  },

  deleteUser: (req, res) => {
    let updatedUsers = userData.filter(user => user.id !== req.params.userId * 1);
    res.status(200).send(updatedUsers);
  }
};