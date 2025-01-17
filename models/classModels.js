const db = require('../config/index');

class classModels {
    static async getAllClass() {
        try{
            const [rows] = await db.query('SELECT * FROM class');
            return rows;            
        }catch(err){
            throw new Error('Databasse query failed');
        }
    }
    static async addClass(class_name, timelimit){
        console.log("data", class_name, timelimit);
        try{
            const query = `INSERT INTO class (class_name, timelimit)
                                VALUES(?,?)`;
            const [result] = await db.query(query, [class_name, timelimit]);
            return{
                success: true,
                message: "Class add successfully!",
                insertedId: result.insertId,
            };
        }catch(error){
            throw new Error('Failed to add class!')
        }
    }
}

module.exports = classModels;