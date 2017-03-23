'use strict';
const Exercises = require('../../models/exercises');

let getAllExercises = function(args, res, next) {
  Exercises.where('id', '<', '25').fetchAll({ withRelated: ['muscle', 'type', 'equipment'] })
  .then((exerciseList) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(exerciseList));
  });
};


module.exports = {
  getAllExercises: getAllExercises
}
