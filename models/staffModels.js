const db = require('../config/index');


class staffModels {
    static async getAllStaff(){
        try{
            const [rows] = await db.query('SELECT * FROM staff');
            return rows;
        } catch(err){
            throw new Error('Database query failed')
        }
    }

    static async login(staff_username, staff_password){
        // console.log("Data: ", staff_username, staff_password);
        try{
            const [rows] = await db.query('SELECT staff_id, staff_name, staff_position, staff_username, staff_password, staff_status FROM staff WHERE staff_username = ? AND staff_password = ?', [staff_username, staff_password]);

            if(rows.length === 0){
                return null;
            }

            const staff = rows[0];

            return {
                staff_id: staff.staff_id,
                staff_name: staff.staff_name,
                staff_position: staff.staff_position,
                staff_username: staff.staff_username,
                staff_password: staff.staff_password,
                staff_status: staff.staff_status
            };
        }catch(error){
            console.error("Error in StaffModels.login: ", error);
            throw new Error("Database query error")
        }
    }
    static async addStaff(staff_code, staff_name, staff_position, staff_phone, staff_email, staff_address, staff_username, staff_password, staff_status){
        try{
            const sql =`INSERT INTO staff (staff_code, staff_name, staff_position, staff_phone, staff_email, staff_address, staff_username, staff_password, staff_status)
                        VALUES (?,?,?,?,?,?,?,?,?)`
            const [result] = await db.query(sql, [staff_code, staff_name, staff_position, staff_phone, staff_email, staff_address, staff_username, staff_password, staff_status]);
            return{
                success: true,
                message: "Staff add successfully",
                insertId: result.insertId
            }
        }catch(error){
            throw new Error('Failed to add Staff')
        }
    }
    static async updateStaff(staff_code, staff_name, staff_position, staff_phone, staff_email, staff_address, staff_username, staff_password, staff_id){
        try{
            const sql = `UPDATE staff SET staff_code=?, staff_name=?, staff_position=?, staff_phone=?, staff_email=?, staff_address=?, staff_username=?, staff_password=? WHERE staff_id = ?`;
            const [result] = await db.query(sql, [staff_code, staff_name, staff_position, staff_phone, staff_email, staff_address, staff_username, staff_password, staff_id]);
            if(result.affectedRows === 0){
                return{
                    success: false,
                    message: "Staff not found or not change made",
                }
            }
            return{
                success: true,
                message: "Staff update successfully",
            }
        }catch(error){
            console.error("Error during updateStaff: ", error);
            throw new Error(error.message || "Failed to update Staff");
        }
    }
}

module.exports = staffModels;