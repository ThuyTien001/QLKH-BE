const db = require('../../config/index');

class RecordModel {
  static async addRecord(record_code, customer_id, form, image, authorization, business_license, orther, commission_id) {
    try {
      const sql = `INSERT INTO record 
                    (record_code, customer_id, form, image, authorization, business_license, orther, commission_id)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
      const [result] = await db.query(sql, [
        record_code,
        customer_id,
        form,
        image,
        authorization,
        business_license,
        orther,
        commission_id,
      ]);
      return {
        success: true,
        message: 'Record added successfully',
        insertedId: result.insertId,
      };
    } catch (error) {
      throw new Error('Failed to add record: ', error.message);
    }
  }
  static async getRecordById (record_id){
    const sql = `SELECT * FROM record WHERE record_id =? `;
    const [rows] = await db.query(sql, [record_id]);
    return rows[0];
  }
  static async updateRecord (data){
    try{
      // console.log("models: ", data)
      const sql = `UPDATE record SET record_code=?, form=?, image=?, authorization=?, business_license=?, orther=?, commission_id=? WHERE record_id =?`;
      const [result] = await db.query(sql, [
        data.record_code, 
        data.form, 
        data.image, 
        data.authorization, 
        data.business_license, 
        data.orther, 
        data.commission_id, 
        data.record_id]);
      if(result.affectedRows === 0){
        return{
          success: false,
          message: "Record not found or not change made",
        }
      }
      return{
        success: true,
        message: "Record update successfully",
      }
    }catch(error){
      throw new Error("Failded to update Record")
    }
  }

}

module.exports = RecordModel;
