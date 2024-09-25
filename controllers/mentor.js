
// // Backend/controllers/mentor.js
// const db = require('../config/db.js');

// // Get all students
// const getAllStudents = (req, res) => {
//     const query = 'SELECT * FROM student_details';
//     db.query(query, (err, results) => {
//         if (err) return res.status(500).json({ error: err.message });
//         res.json(results);
//     });
// };

// // Get student details by PRN
// const getStudentByPRN = (req, res) => {
//     const prn = req.params.prn;
//     const query = 'SELECT * FROM student_details WHERE prn = ?';
//     db.query(query, [prn], (err, results) => {
//         if (err) return res.status(500).json({ error: err.message });
//         res.json(results[0]);
//     });
// };

// // Delete student details (optional for mentors)
// const deleteStudent = (req, res) => {
//     const prn = req.params.prn;
//     const query = 'DELETE FROM student_details WHERE prn = ?';
//     db.query(query, [prn], (err, results) => {
//         if (err) return res.status(500).json({ error: err.message });
//         if (results.affectedRows === 0) return res.status(404).json({ message: 'Student not found' });
//         res.json({ message: 'Student deleted successfully' });
//     });
// };

// module.exports = {
//     getAllStudents,
//     getStudentByPRN,
//     deleteStudent
// };

// Backend/controllers/mentor.js
const db = require('../config/knex.js');

// Get all student details
const getAllStudents = async (req, res) => {
    try {
        // Fetch all students' basic details
        const students = await db('student_details');

        // Use Promise.all to fetch related details for each student
        const studentDetailsPromises = students.map(async (student) => {
            const personal = await db('student_personal').where('prn', student.prn).first();
            const parents = await db('student_parents').where('prn', student.prn).first();
            const education = await db('student_education').where('prn', student.prn).first();
            const other = await db('student_other').where('prn', student.prn).first();

            // Retrieve academic details using a join
            const academicIdDetails = await db('student_details')
                .join('academic_id', 'student_details.ac_id', 'academic_id.ac_id')
                .where('student_details.prn', student.prn)
                .select('academic_id.*')
                .first();

            // Fetch student score
            const score = await db('student_score').where('prn', student.prn).first();

            return {
                ...student,
                ...personal,
                ...parents,
                ...education,
                ...other,
                ...academicIdDetails,
                ...score // Add the score object
            };
        });

        // Wait for all promises to resolve
        const allStudentData = await Promise.all(studentDetailsPromises);
  
        res.json(allStudentData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};




// Get student details by PRN
const getStudentByPRN = async (req, res) => {
    const prn = req.params.prn;
    try {
        const student = await db('student_details').where('prn', prn).first();
        res.json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete student details (optional for mentors)
const deleteStudent = async (req, res) => {
    const prn = req.params.prn;
    try {
        const result = await db('student_details').where('prn', prn).del();
        if (result === 0) return res.status(404).json({ message: 'Student not found' });
        res.json({ message: 'Student deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    getAllStudents,
    getStudentByPRN,
    deleteStudent
};
