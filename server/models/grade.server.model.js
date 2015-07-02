var bookshelf = require('../config/db');
// var knex = require('knex');

var Grade = bookshelf.Model.extend({
  tableName: 'grades'
});

Grade.add = function(gradeData, callback) {
  grade = new Grade(gradeData)
  .save()
  .then(function(model) {
    callback(model);
  })
  .catch(function(err) {
    callback(err);
  });
};

Grade.studentGrades = function(student_id, callback) {
  // bookshelf.knex('grades')
  // .join('assignments', 'grades.assignment_id', '=', 'assignments.id')
  // .join('classes', 'assignments.class_id', '=', 'classes.id')
  // .select('grades.id', 'assignments.title', 'grades.score', 'grades.student_id', 'grades.assignment_id', 'assignments.class_id', 'classes.title')
  // .where('grades.student_id', '=', student_id)
  // .then(function(data) {
  //   callback(data);
  // });

  bookshelf.knex.raw('SELECT grades.score AS grade, assignments.title AS assignment_title, assignments.id AS assignment_id, classes.title AS class_title, classes.id AS class_id FROM grades, assignments, classes WHERE grades.assignment_id = assignments.id AND assignments.class_id = classes.id AND grades.student_id = ' + student_id)
  .then(function(data) {
    callback(data[0]);
  });
};

module.exports = Grade;
