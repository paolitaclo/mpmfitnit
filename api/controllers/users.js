'use strict';

/**
 * Creates a new user in the database
 **/
const bcrypt = require('bcrypt-as-promised');
const Users = require('../../models/users');
const jwt = require('jsonwebtoken');

function addNewUser(req, res) {

    let email = req.body.email;
    let password = req.body.password;

    bcrypt.hash(password, 12)
        .then((hashed_password) => {
            return Users.forge({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: email,
                    hashed_password: hashed_password,
                    weight: req.body.weight,
                    user_intentions: req.body.user_intentions
                })
                .save()
                .then((user) => {
                    let u = JSON.parse(JSON.stringify(user));
                    delete u.hashed_password;
                    res.setHeader('Content-Type', 'application/json');
                    res.send(u);
                })
                .catch(function(err) {
                    res.setHeader("Content-Type", "application/json")
                    res.status(400).json({
                        code: 400,
                        message: "foo"
                    });
                });
        });
}


function updateUser(req, res, next) {
  const id = req.swagger.params.id.value;
  return new Users({ id })
  .fetch()
  .then((user) => {
    return user.save(req.body, { patch: true });
  })
  .then((userUpdated) => {
    let u = JSON.parse(JSON.stringify(userUpdated));
    delete u.hashed_password;
    delete u.created_at;
    delete u.updated_at;
    return res.json(u);
  })
 .catch(function(err) {
  res.setHeader("Content-Type", "application/json");
  res.status(400).json({
   code: 400,
   message: 'foo'
  });
  next(err);
 });
}

function deleteUser(req, res) {
  const token = req.headers['token'];
  jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
        Users.where({id: req.swagger.params.id.value})
              .fetch({require: true})
              .then((user) => {
                  user.destroy()
                  return user;
              })
              .then((user) => {
                let u = JSON.parse(JSON.stringify(user));
                delete u.hashed_password;
                res.setHeader('Content-Type', 'application/json');
                res.send(u);
              })
              .catch(function(err) {
                  res.setHeader("Content-Type", "application/json")
                  res.status(400).json({
                      code: 400,
                      message: "foo"
                  });
              });
  });
};

module.exports = {
    addNewUser: addNewUser,
    deleteUser: deleteUser,
    updateUser: updateUser
};
