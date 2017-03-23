const bookshelf = require('../bookshelf');

require('./muscles');
require('./exercise_types');
require('./equipment_types');

var Exercises = bookshelf.Model.extend({
  tableName: 'exercises',
  hidden: ['muscle_id', 'exercise_type_id', 'equipment_type_id'],
  muscle: function() {
    return this.belongsTo('Muscles');
  },
  type: function() {
    return this.belongsTo('ExerciseTypes');
  },
  equipment: function() {
    return this.belongsTo('EquipmentTypes');
  }
});

module.exports = bookshelf.model('Exercises', Exercises);
