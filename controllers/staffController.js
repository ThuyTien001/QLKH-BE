const staffModels = require ('../models/staffModels');
class staffController {
    static async getStaff(req, res){
        try{
            const staff = await staffModels.getAllStaff();
            res.status(200).json({data: staff});
        }catch(err){
            res.status(500).json({error: "Failed to fetch staff"});
        }
    }

    static async login(req, res) {
        // console.log("Data: ", req, res)
        try{
            const {staff_username, staff_password} = req.body;
            if(!staff_username || !staff_password){
                return res.status(400).json({
                    success: false,
                    message: "Missing required fields",
                });
            }
            const result = await staffModels.login(staff_username, staff_password);

            //Kiểm tra kết quả trả về

            if(!result){
                return res.status(401).json({
                    success: false,
                    message: "Invalid username or password"
                });
            }

            //Tạo token
            const jwt = require('jsonwebtoken');
            const token = jwt.sign(
                {staff_id: result.staff_id, staff_username: result.staff_username},
                // process.env.JWT_SECRET,
                process.env.SECRET_KEY,
                {expiresIn: "2h"} //thời hạn token
            )

            return res.status(200).json({
                success: true,
                message: "Login successfully",
                data: {
                    token,
                    staff: {
                        staff_id: result.staff_id,
                        staff_name: result.staff_name,
                        staff_username: result.staff_username,
                        staff_position: result.staff_position,
                        staff_password: result.staff_password,
                        staff_status: result.staff_status
                    }
                }
            });
        }catch(error){
            console.error("Error during login: ", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            })
        }
    }
    static async addStaffContraller(req, res){
        try{
            const {staff_code, staff_name, staff_position, staff_phone, staff_email, staff_address, staff_username, staff_password, staff_status} = req.body;
            if(!staff_code || !staff_name){
                return res.status(400).json({
                    success: false,
                    message: "Missing required fields",
                })
            }
            const result = await staffModels.addStaff(staff_code, staff_name, staff_position, staff_phone, staff_email, staff_address, staff_username, staff_password, staff_status)
            return res.status(201).json({
                success: true,
                message: "Staff added successfully",
                data: result,
            })
        }catch(error){
            console.error("Error while adding Staff: ", error)
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            })
        }
    }
    static async updateStaffController(req, res){
        try{
            const {staff_code, staff_name, staff_position, staff_phone, staff_email, staff_address, staff_username, staff_password, staff_id} = req.body;
            if(!staff_code || !staff_name){
                return res.status(400).json({
                    success: false,
                    message: "Missing required fields"
                });
            }
            const result = await staffModels.updateStaff(staff_code, staff_name, staff_position, staff_phone, staff_email, staff_address, staff_username, staff_password, staff_id);
            return res.status(201).json({
                success: true,
                message: "Staff update successfully",
                data: result,
            })
        }catch(error){
            console.error("Error while update Staff: ", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            })
        }
    }
}


module.exports = staffController;