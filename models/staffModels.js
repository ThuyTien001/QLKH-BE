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
}

module.exports = staffModels;