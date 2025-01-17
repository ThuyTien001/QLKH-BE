const courseModels = require('../models/courseModels')

class courseControllers {
    static async getCourse(req, res){
        try{
            const courses = await courseModels.getCourse();
            res.status(200).json({data: courses});
        }catch(err){
            res.status(500).json({error: "Failed to fetch class"});
        }
    }

    static async addCourseController(req, res){
        try{
            const {course_code, id_class, start_time, end_time, staff_id} = req.body
            if(!course_code || !id_class || !start_time || !end_time || !staff_id) {
                return res.status(400).json({
                    success: false,
                    message: "Missing required fields",
                });
            }
            //kiểm tra ngày kết thúc > ngày bắt đầu
            const startDate = new Date(start_time);
            const endDate = new Date(end_time);
            if (isNaN(startDate.getTime()) || isNaN(endDate.getTime()) || startDate > endDate) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid date format or start_time is after end_time",
                });
            }
            const result = await courseModels.addCourse(course_code, id_class, start_time, end_time, staff_id);
            return res.status(201).json({
                success: true,
                message: "Course added successfully",
                data: result,
            });
        }catch(error){
            console.error("Error while adding class:", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            })
        }
    }
    static async updataCourseController(req, res) {
        try{
            const {course_code, id_class, start_time, end_time, staff_id, course_id} = req.body;
            // console.log("Data: ", course_code, id_class, start_time, end_time, staff_id, course_id)
            if(!course_code || !id_class || !start_time || !end_time || !staff_id || !course_id){
                return res.status(400).json({
                    success: false,
                    message: "Missing required fields"
                });
            }
            const startDate = new Date(start_time);
            const endDate = new Date(end_time);
            if(isNaN(startDate.getTime()) || isNaN(endDate.getTime()) || startDate > endDate){
                return res.status(400).json({
                    success: false,
                    message: "Invalid date format or start_time is after end_time",
                });
            }
            const result = await courseModels.updateCourse(course_code, id_class, start_time, end_time, staff_id, course_id);
            return res.status(201).json({
                success: true,
                message: "Course update successfully",
                data: result,
            })
        }catch(error){
            console.error("Error while updating course: ", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            })
        }
    }
}
 module.exports = courseControllers;