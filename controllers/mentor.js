
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

// Get all students
const getAllStudents = async (req, res) => {
    try {
        const students = await db('student_details').select('*');
        res.json(students);
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
