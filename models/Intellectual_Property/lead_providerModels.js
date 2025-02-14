const db = require ('../../config/index');
class leadProviderModels {
    static async getLeadProvider() {
        try{
          const sql =  `SELECT * FROM lead_provider`;
          const [rows] = await db.query(sql);
          return rows;
        }catch(error){
          throw new Error('Database query failed');
        }
      }
    static async addLeadProvider(lp_code, lp_name, lp_workplace, lp_phone){
      try{
        const sql = `INSERT INTO lead_provider (lp_code, lp_name, lp_workplace, lp_phone) VALUES (?,?,?,?)`;
        const [result] = await db.query(sql, [lp_code, lp_name, lp_workplace, lp_phone]);
        return{
          success: true,
          message: "Lead Provider add successfully",
          insertId: result.insertId,
        }
      }catch(error){
        throw new Error('Failed to add Lead Provider');
      }
    }
    static async updateLeadProvider (lp_code, lp_name, lp_workplace, lp_phone, lp_id){
      try{
        const sql = `UPDATE lead_provider SET lp_code = ?, lp_name = ?, lp_workplace = ?, lp_phone = ? WHERE lp_id = ?`;
        const [result] = await db.query(sql, [lp_code, lp_name, lp_workplace, lp_phone, lp_id]);
        if(result.affectedRows === 0){
          return{
            success: false,
            message: "Lead Provider not found or not change made",
          }
        }
        return{
          success: true,
          message: "Lead Provider update success",
        }
      }catch(error){
        console.error("Error during update Lead Provider: ", error);
        throw new Error(error.message || "Failed to update Lead Provider");
      }
    }
}
module.exports = leadProviderModels;