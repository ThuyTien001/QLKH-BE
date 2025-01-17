const db = require('../../config/index');
class statusRecordModal {
    static async addStatusRecord (status_name, record_id, form_code, application_date, patent_code, date_of_issuance, patent, expiration_date){
        try{
            // console.log("add status record: ", status_name, record_id, form_code, application_date, patent_code, date_of_issuance, patent, expiration_date)
            const sql = `INSERT INTO status_record (status_name, record_id, form_code, application_date, patent_code, date_of_issuance, patent, expiration_date)
                            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
            const [result] = await db.query(sql, [status_name, record_id, form_code, application_date, patent_code, date_of_issuance, patent, expiration_date]);
            return {
                success: true,
                message: "Status record added successfully",
                insertId: result.insertId
            }
        } catch(error){
            throw new Error("Failed to add " + error.message);
        }
    }
    static async getStatusRecordById (status_id){
        const sql = `SELECT * FROM status_record WHERE status_id=?`;
        const [rows] = await db.query(sql, [status_id]);
        return rows[0];
    }
    static async updateStatusRecord ( data){
        try{
            // console.log("dataup date status models: ", status_name, form_code, application_date, patent_code, date_of_issuance, patent, expiration_date, status_id)
            // console.log("dataup date status models: ", data)
            const sql = `UPDATE status_record SET status_name=?, form_code=?, application_date=?, patent_code=?, date_of_issuance=?, patent =?, expiration_date =? WHERE status_id =?`;
            const [result] = await db.query(sql, [
                data.status_name, 
                data.form_code,
                data.application_date,
                data.patent_code, 
                data.date_of_issuance, 
                data.patent, 
                data.expiration_date, 
                data.status_id]);
            if(result.affectedRows === 0){
                return{
                    success: false,
                    message: "Status record not found or not change made",
                }
            }
            return{
                success: true,
                message: "Status record update successfully"
            }
        }catch(error){
            throw new error("Failed to update Status record")
        }
    }
}

module.exports = statusRecordModal;