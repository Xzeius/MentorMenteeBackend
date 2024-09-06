
// Backend/controllers/student.js
const db = require('../config/knex.js');

// Get student details by PRN
const getStudentByPRN = async (req, res) => {
    const prn = req.params.prn;
    try {
        const student = await db('student_details').where('prn', prn).first();
        const personal = await db('student_personal').where('prn', prn).first();
        const parents = await db('student_parents').where('prn', prn).first();
        const education = await db('student_education').where('prn', prn).first();
        const other = await db('student_other').where('prn', prn).first();
        const ac_id = await db('academic_id').where('prn', prn).first();


        const studentData = {
            ...student,
            ...personal,
            ...parents,
            ...education,
            ...other,
            ...ac_id,

        };

        res.json(studentData);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



// Update student details
const updateStudent = async (req, res) => {
    const prn = req.params.prn;
    const updatedStudent = req.body;

    if (updatedStudent.date_of_birth) {
        const date = new Date(updatedStudent.date_of_birth);
        const formattedDate = date.toISOString().split('T')[0]; // 'YYYY-MM-DD' format
        updatedStudent.date_of_birth = formattedDate;
    }

    try {
        await db.transaction(async (trx) => {
            await trx('student_details').where('prn', prn).update({
                fullname: updatedStudent.fullname,
                ac_id: updatedStudent.ac_id,
            });

            await trx('student_personal').where('prn', prn).update({
                photo: updatedStudent.photo,
                date_of_birth: updatedStudent.date_of_birth,
                mother_tongue: updatedStudent.mother_tongue,
                blood_group: updatedStudent.blood_group,
                year_of_admission: updatedStudent.year_of_admission,
                current_address: updatedStudent.current_address,
                mobile: updatedStudent.mobile,
                landline: updatedStudent.landline,
                email: updatedStudent.email

            });

            await trx('student_parents').where('prn', prn).update({
                father_name: updatedStudent.father_name,
                father_occupation: updatedStudent.father_occupation,
                father_mobile_number: updatedStudent.father_mobile_number,
                mother_name: updatedStudent.mother_name,
                mother_occupation: updatedStudent.mother_occupation,
                mother_mobile_number: updatedStudent.mother_mobile_number,
            });

            await trx('student_education').where('prn', prn).update({
                ssc_percentage: updatedStudent.ssc_percentage,
                ssc_medium: updatedStudent.ssc_medium,
                ssc_board: updatedStudent.ssc_board,
                hsc_or_diploma_percentage: updatedStudent.hsc_or_diploma_percentage,
                hsc_or_diploma_medium: updatedStudent.hsc_or_diploma_medium,
                hsc_or_diploma_board: updatedStudent.hsc_or_diploma_board,
                cet_percentile: updatedStudent.cet_percentile,
                jee_percentile: updatedStudent.jee_percentile,
            });

            await trx('student_other').where('prn', prn).update({
                hobbies: updatedStudent.hobbies,
                strengths: updatedStudent.strengths,
                weakness: updatedStudent.weakness,
                short_term_goals: updatedStudent.short_term_goals,
                long_term_goals: updatedStudent.long_term_goals,
                extra_curricular: updatedStudent.extra_curricular,
            });
            await trx('academic_id').where('prn', prn).update({
                semester: updatedStudent.semester,
                branch: updatedStudent.branch,
                divsion: updatedStudent.divsion,
                batch: updatedStudent.batch,
                ac_id: updatedStudent.ac_id,
            });


        });

        res.send('Student details updated');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// // Get branch from ac_id
// const getBranchByAcID = async (req, res) => {
//     const { ac_id } = req.params;
//     try {
//         // Split the ac_id by "_"
//         const parts = ac_id.split('_');
        
//         // Check if the ac_id has the correct format
//         if (parts.length < 3) {
//             return res.status(400).json({ error: "Invalid ac_id format" });
//         }
        
//         // Extract the branch (third part of the ac_id)
//         const branch = parts[2];
        
//         res.json({ branch });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

module.exports = {
    getStudentByPRN,
    updateStudent,
    // getBranchByAcID, // Export the new function
};


