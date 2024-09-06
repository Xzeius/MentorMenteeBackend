// Backend/routes/mentorRoutes.js
const express = require('express');
const mentorController = require('../controllers/mentor');

const router = express.Router();

// Get all students
router.get('/', mentorController.getAllStudents);

// Get student details by PRN - Read-only for mentors
router.get('/:prn', mentorController.getStudentByPRN);

// Delete student details (optional functionality for mentors)
router.delete('/:prn', mentorController.deleteStudent);

module.exports = router;
