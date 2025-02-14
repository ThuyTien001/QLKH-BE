const db = require('../config/index');
const dayjs = require('dayjs');

class courseModels {
  static async getCourse() {
    try {
      const [rows] = await db.query(`SELECT 
                                        c.course_id,
                                        c.course_code,
                                        c.start_time,
                                        c.end_time,
                                        class.timelimit,
                                        class.class_name,
                                        s.student_id,
                                        s.student_code,
                                        s.student_name,
                                        s.birthday,
                                        s.department,
                                        s.phone,
                                        s.email,
                                        s.address,
                                        c.id_class,
                                        c.staff_id,
                                        p.participant_id,
                                        p.participant_name
                                    FROM 
                                        course AS c
                                    LEFT JOIN 
                                        attend AS a ON c.course_id = a.course_id
                                    LEFT JOIN 
                                        students AS s ON a.student_id = s.student_id
                                    LEFT JOIN 
                                        class ON c.id_class = class.id_class
                                    LEFT JOIN 
                                        participant as p ON s.participant_id = p.participant_id
                                    ORDER BY 
                                        c.course_id DESC;
`);

      // Chuyển đổi định dạng ngày tháng
      const formattedRows = rows.map(course => ({
        ...course,
        start_time: dayjs(course.start_time).format('DD-MM-YYYY'),
        end_time: dayjs(course.end_time).format('DD-MM-YYYY'),
        birthday: dayjs(course.birthday).format('DD-MM-YYYY'),
      }));

      // Nhóm dữ liệu theo course_id
      const groupedData = formattedRows.reduce((acc, curr) => {
        const courseIndex = acc.findIndex(course => course.course_id === curr.course_id);
        if (courseIndex === -1) {
          acc.push({
            course_id: curr.course_id,
            course_code: curr.course_code,
            id_class: curr.id_class,
            class_name: curr.class_name,
            timelimit: curr.timelimit,
            start_time: curr.start_time,
            end_time: curr.end_time,
            staff_id: curr.staff_id,
            students: [
              {
                student_id: curr.student_id,
                student_code: curr.student_code,
                student_name: curr.student_name,
                birthday: curr.birthday,
                department: curr.department,
                phone: curr.phone,
                email: curr.email,
                address: curr.address,
                participant_id: curr.participant_id,
                participant_name: curr.participant_name,
              }
            ],
          });
        } else {
          acc[courseIndex].students.push({
            student_id: curr.student_id,
            student_code: curr.student_code,
            student_name: curr.student_name,
            birthday: curr.birthday,
            department: curr.department,
            phone: curr.phone,
            email: curr.email,
            address: curr.address,
            participant_id: curr.participant_id,
            participant_name: curr.participant_name,
          });
        }
        return acc;
      }, []);

      return groupedData;
    } catch (err) {
      throw new Error('Database query failed');
    }
  }
  static async addCourse (course_code, id_class, start_time, end_time, staff_id){
    // console.log("data: ", course_code, id_class, start_time, end_time, staff_id);
    try{
      const query = `INSERT INTO course (course_code, id_class, start_time, end_time, staff_id)
                          VALUES(?, ?, ?, ?, ?)`;
      const [result] = await db.query(query, [course_code, id_class, start_time, end_time, staff_id]);
      return{
        success: true,
        message: "Course add successfully",
        insertedId: result.insertId,
      };
    }catch(error){
      throw new Error('Failed to add class');
    }
  }
  static async updateCourse (course_code, id_class, start_time, end_time, staff_id, course_id){
    try{
      const query = `UPDATE course SET course_code = ?, id_class = ?, start_time = ?, end_time = ?, staff_id = ? WHERE course_id = ?`;
      // const {course_code, id_class, start_time, end_time, staff_id} = updateData;
      // console.log("Data course: ", course_code, id_class, start_time, end_time, staff_id, course_id);
      // console.log("course Id", course_id)
      // console.log()
      const [result] = await db.query(query, [course_code, id_class, start_time, end_time, staff_id, course_id]);
      if(result.affectedRows === 0){
        return{
          success: false,
          message: "Course not found or not change made",
        }
      }
      return{
        success: true,
        message: "Course update successfully",
      }
    }catch(error){
      throw new error("Failed to update Course");
    }
  }
}

module.exports = courseModels;
