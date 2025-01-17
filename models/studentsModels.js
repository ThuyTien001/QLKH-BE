const db = require('../config/index');
const dayjs = require('dayjs');

class studentsModels {
    static async getAllStudents(){
        try {
            const [rows] = await db.query('SELECT * FROM students, participant WHERE students.participant_id = participant.participant_id;');
            const formatBirthday = rows.map(students => ({
                ...students,
                birthday: dayjs(students.birthday).format('DD-MM-YYYY')
            }));
            return formatBirthday;
        }catch(err){
            throw new Error('Databasse query failed');
        }
    }
    static async addStudent(student_code, participant_id, student_name, birthday, department, phone, email, address, course_id ){
        console.log("Data: ",student_code, participant_id, student_name, birthday, department, phone, email, address, course_id )
        console.log('course id: ', course_id);
        try{
            const sql = `INSERT INTO students (student_code, participant_id, student_name, birthday, department, phone, email, address) VALUES (?,?,?,?,?,?,?,?)`
            const [result] = await db.query(sql, [student_code, participant_id, student_name, birthday, department, phone, email, address]);
            
            const studentId = result.insertId
            const query = `INSERT INTO  attend (student_id, course_id) VALUES (?, ?)`;
            const [resultAttend] = await db.query(query, [studentId, course_id]);   
            return{
                success: true,
                message: "Student add successfully",
                insertId: result.insertId,
                attendId: resultAttend.insertId
            };
        }catch(error){
            throw new Error('Failed to add Course')
        }
    }
    static async updateStudent( student_code, participant_id, student_name, birthday, department, phone, email, address, student_id){
        // console.log("Data Models: ", student_code, participant_id, student_name, birthday, department, phone, email, address, student_id)
        try{
            const sql = `UPDATE students SET student_code = ? ,participant_id = ?, student_name = ?, birthday = ?, department = ?, phone = ?, email = ?, address = ? WHERE student_id = ?`;
            const [result] = await db.query(sql, [student_code, participant_id, student_name, birthday, department, phone, email, address, student_id]);
            if(result.affectedRows === 0){
                return{
                    success: false,
                    message: "Student not found or not change made",
                }
            }
            return{
                success: true,
                message: "Student update successfully",
            }
        }catch(error){
            console.error("Error during updateStudent: ", error);
            throw new Error(error.message || "Failed to update Student");
        }
    }
}

module.exports = studentsModels;