const express = require('express')
    , bodyParser = require('body-parser')
    , app = express();

const usersCtrl = require('./controllers/usersCtrl');
app.use(bodyParser.json());

app.get('/api/users', usersCtrl.getUsers);
app.get('/api/users/:userId', usersCtrl.getUserById);
app.get('/api/admins', usersCtrl.getAdmins);
app.get('/api/nonadmins', usersCtrl.getNonAdmins);
app.get('/api/user_type/:userType', usersCtrl.getUsersByType);
app.put('/api/users/:userId', usersCtrl.updateUserById);
app.post('/api/users', usersCtrl.addUser);
app.delete('/api/users/:userId', usersCtrl.deleteUser);

const PORT = 3000;
app.listen(PORT, console.log(`listening on PORT: ${PORT}`));