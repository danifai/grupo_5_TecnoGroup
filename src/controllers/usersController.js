const fs = require('fs');
const path = require('path');
const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

let usersController = {
  register: function (req, res) { return res.render ("register")
  },

  login: function (req, res) { return res.render ("login")
    
  }
}