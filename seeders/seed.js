//read json
const studentsData = require('./studentsData.json');
const teacherData = require('./teacherData.json');
const behaviorData = require('./behaviorData.json');
const classroomData = require('./classroomData.json');
const actionData = require('./actionData.json');
const helpers = require('../utils/helpers');

const sequelize = require('../config/connection');
const {Student, Teacher, Behavior, Classroom, Action} = require('../models');

//connect to database
const seedDatabase = async () => {

// Force sync the   database
    await sequelize.sync({force: true});

// create and save objects to database
    await Student.bulkCreate(studentsData);
    await Teacher.bulkCreate(teacherData);
    await Behavior.bulkCreate(behaviorData);
    await Classroom.bulkCreate(classroomData);
    await Action.bulkCreate(actionData);


    let student;
    let behavior;
    let classroom;
    let teacher;

    //STUDENT BEHAVIOR
    for (let i = 1; i <= 10; i++) {

        for (let j = 1; j <= 5; j++) {

            student = await Student.findByPk(i);
            behavior = await Behavior.findByPk(j);
            behavior_date = helpers.print_today('today');

            let random = Math.floor(Math.random() * 10);
            if (random > 2) {
                behavior_note = 'Talk with the student today. Showing better behavior.';
            }
            if (random > 4) {
                behavior_note = 'Very bad behavior. Does not even try.';
            }
            if (random > 6) {
                behavior_note = 'I am planning a parent conference.';
            }
            if (random > 8) {
                behavior_note = 'I am confident this student will comply.';
            }
            if (random > 5) {
                student.addBehavior(behavior, {
                    through: {
                        behavior_note: behavior_note,
                        behavior_date: behavior_date,
                    }
                });
            }
        }

    }
    // STUDENT CLASSROOM
    for (let i = 1; i <= 10; i++) {

        for (let j = 1; j <= 6; j++) {

            student = await Student.findByPk(i);
            classroom = await Classroom.findByPk(j);
            let random = Math.floor(Math.random() * 10);
            if (random > 2) {
                student.addClassroom(classroom);
            }
        }
    }

    // CLASSROOM TEACHER
    for (let i = 1; i <= 5; i++) {

        for (let j = 1; j <= 6; j++) {

            teacher = await Teacher.findByPk(i);
            classroom = await Classroom.findByPk(j);
            let random = Math.floor(Math.random() * 10);
            //if (random > 2) {
            classroom.addTeacher(teacher);
            //}
        }
    }
    // Exit the process
    process.exit(0);

}
seedDatabase();
