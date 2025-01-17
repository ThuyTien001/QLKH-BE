const db = require('../../config/index');

class contractModels {
    static async addContract(contract_code, contrac_name, acceptance, settlement, bill, record_id){
        try{
            const sql = `INSERT INTO contract 
                            (contract_code, contract_name, acceptance, settlement, bill, record_id)
                            VALUES (?,?,?,?,?,?)`;
            const [result] = await db.query(sql, [
                contract_code,
                contrac_name,
                acceptance,
                settlement,
                bill,
                record_id
            ]);
            return{
                success: true,
                message: "Contract added successfully",
                insertId: result.insertId,
            }
        }catch(error){
            throw new Error("Failed to add contract: ", error.message);
        }
    }
    static async getContractById (contract_id){
        const sql = `SELECT * FROM contract WHERE contract_id =? `;
        const [rows] = await db.query(sql, [contract_id]);
        return rows[0];
    }
    static async updateContract (data){
        try{
            // console.log("models: ", data);
            const sql = `UPDATE contract SET contract_code=?, contract_name=?,acceptance=?, settlement=?, bill=? WHERE contract_id=?`;
            const [result] = await db.query(sql, [
                data.contract_code,
                data.contract_name,
                data.acceptance,
                data.settlement,
                data.bill,
                data.contract_id,
            ]);
            if(result.affectedRows === 0){
                return {
                    success: false,
                    message: "Contract not found or not change made",
                }
            }
            return{
                success: true,
                message: "Contract update successfully"
            }
        }catch(error){
            throw new error("Failed to update Contract");
        }
    }
}

module.exports = contractModels;