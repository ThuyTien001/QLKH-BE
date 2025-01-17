const classModels = require('../models/classModels');
class classControllers {
    static async getClass(req, res){
        try{
            const classes = await classModels.getAllClass();
            res.status(200).json({data: classes});
        }catch(err){
            res.status(500).json({error: "Failed to fetch class"});
        }
    }
    static async addClassController(req, res) {
        try {
            const { class_name, timelimit } = req.body;
            if (!class_name || !timelimit) {
                return res.status(400).json({
                    success: false,
                    message: "Missing required fields",
                });
            }
            // Ensure you're passing class_name and timelimit as separate arguments
            const result = await classModels.addClass(class_name, timelimit);
            console.log('result', result);
            return res.status(200).json({
                success: true,
                message: "Class added successfully",
                data: {
                    id_class: result.insertedId, class_name, timelimit, result
                }
            });
        } catch (error) {
            console.error("Error while adding class:", error); 
            return res.status(500).json({
                success: false,
                message: "An error occurred while adding the class",
            });
        };
    }
      
}

module.exports = classControllers;