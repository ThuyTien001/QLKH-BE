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
}
module.exports = leadProviderModels;