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
}

module.exports = partnerModels;