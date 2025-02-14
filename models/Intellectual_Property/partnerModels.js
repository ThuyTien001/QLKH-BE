const db = require('../../config/index');

class partnerModels {
    static async getPartner(){
        try{
          const sql = `SELECT * FROM partner`;
          const [rows] = await db.query(sql);
          return rows;
        }catch(error){
          throw new Error("Database query failed");
        }
      }
      static async addPartner(partner_code, partner_name, partner_phone, partner_email){
        try{
          const sql = `INSERT INTO partner (partner_code, partner_name, partner_phone, partner_email) VALUES (?,?,?,?)`;
          const [result] = await db.query(sql, [partner_code, partner_name, partner_phone, partner_email]);
          return{
            success: true,
            message: "Partner add successfully",
            insertId: result.insertId
          }
        }catch(error){
          throw new Error("Failed to add Partner");
        }
      }
      static async updatePartner(partner_code, partner_name, partner_phone, partner_email, partner_id){
        try{
          const sql =  `UPDATE partner SET partner_code = ?, partner_name = ?, partner_phone = ?, partner_email = ? WHERE partner_id = ?`;
          const [result] = await db.query(sql, [partner_code, partner_name, partner_phone, partner_email, partner_id]);
          if(result.affectedRows === 0){
            return{
              success: false,
              message: "Partner not found or not vhange made"
            }
          }
          return{
            success: true,
            message: "Partner update successfully",
          }
        }catch(error){
          console.error("Error during update Partner", error);
          throw new Error(error.message || "Failed to update Partner");
        }
      }
}

module.exports = partnerModels;