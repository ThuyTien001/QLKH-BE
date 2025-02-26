const studentModels = require('../models/studentsModels');
class studentsControllers {
    static async getStudents (req, res) {
        try{
            const students = await studentModels.getAllStudents();
            res.status(200).json({data: students});
        }catch (err) {
            res.status(500).json({error: 'Failed to fetch students'});
        }
    }
    static async addStudentController(req, res){
        // console.log("student: ", req.body)
        try{
            const {student_code, participant_id, student_name, birthday, department, phone, email, address, course_id} = req.body;
            // console.log("Data controller: ", student_code, participant_id, student_name, birthday, department, phone, email, address, course_id)
            // console.log("student name: ", student_name);
            // console.log('participant id', participant_id);  
            if(!student_code ){
                return res.status(400).json({
                    success: false,
                    message: "Missing required fields",
                });
            }
            const result = await studentModels.addStudent(student_code, participant_id, student_name, birthday, department, phone, email, address, course_id);
            return res.status(201).json({
                success: true,
                message: "Student added successfully",
                data: result,
            })
        }catch(error){
            console.error("Error while adding student: ", error.message);
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            })
        }
    }
    static async updateStudentController(req, res){
        try{
            const {student_id, student_code, participant_id, student_name, birthday, department, phone, email, address} = req.body;
            // console.log("Data Controller: ",student_id, student_code, participant_id, student_name, birthday, department, phone, email, address);
            if(!student_code ){
                return res.status(400).json({
                    success: false,
                    message: "Missing required fields"
                });
            }

            const result = await studentModels.updateStudent(student_code, participant_id, student_name, birthday, department, phone, email, address, student_id);
            return res.status(201).json({
                success: true,
                message: "Student update successfully",
                data: result,
            })
        }catch(error){
            console.error("Error while update student: ", error);
            return res.status(500).json({
                success:false,
                message: "Internal server error"
            })
        }
    }
    static async addStudentFormFile(req, res) {
        // console.log("student: ", req.body);

        try {
            const students = req.body;
            if (!Array.isArray(students) || students.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid student data",
                });
            }
    
            // Kiểm tra và lưu tất cả sinh viên
            for (const student of students) {
                const { student_code, participant_id, student_name, birthday, department, phone, email, address, course_id } = student;
                
                if (!student_code ) {
                    return res.status(400).json({
                        success: false,
                        message: "Missing required fields",
                    });
                }
    
                // Lưu vào database
                await studentModels.addStudent(student_code, participant_id, student_name, birthday, department, phone, email, address, course_id);
            }
    
            return res.status(201).json({
                success: true,
                message: "Students added successfully",
            });
    
        } catch (error) {
            console.error("Error while adding student: ", error.message);
            return res.status(500).json({
                success: false,
                message: "Internal server error",
            });
        }
    }
}

module.exports = studentsControllers;