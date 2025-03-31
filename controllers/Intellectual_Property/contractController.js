const contractModels = require('../../models/Intellectual_Property/contractModel');
const path = require('path');
class contractController {
    static async addContract(req, res) {
        try{
            console.log("Received data:", req.body);
            console.log("Received files:", req.files);
            const {contract_code, contract_name, record_id} = req.body;
            const acceptance = req.files?.acceptance?.[0]?.path || null;
            const settlement = req.files?.settlement?.[0]?.path || null;
            const bill = req.files?.bill?.[0]?.path || null;
            const contract = req.files?.contract?.[0]?.path || null;

            if (!contract_code) {
                return res.status(400).json({
                    success: false,
                    message: 'Missing required fields',
                })
            }
            const result = await contractModels.addContract(
                contract_code,
                contract_name,
                acceptance ? path.basename(acceptance) : null,
                settlement ? path.basename(settlement) : null,
                bill ? path.basename(bill) : null,
                record_id,
                contract ? path.basename(contract):null,
            );
            return res.status(201).json({
                success: true,
                message: "Contract added successfully",
                insertId: result.insertId,
            });
        }catch(error){
            console.error('Error adding contract: ', error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error.message,
            })
        }
    }
    static async updateContract(req, res){
        try{
            const {contract_code, contract_name, contract_id}= req.body;
            // console.log("controller: ", contract_code, contract_name, contract_id)
            if(!contract_code || !contract_name || !contract_id){
                return res.status(400).json({
                    success: false,
                    message: "Missing required fields"
                });
            }
            const existingContract = await contractModels.getContractById(contract_id);
            if(!existingContract){
                return res.status(404).json({
                    success: false,
                    message: "Contract not found"
                })
            }
            const acceptance = req.files?.acceptance?.[0]?.path || null;
            const settlement = req.files?.settlement?.[0]?.path || null;
            const bill = req.files?.bill?.[0]?.path || null;
            const contract = req.files?.contract?.[0]?.path || null;
            const updateData = {
                contract_code, 
                contract_name,
                acceptance: acceptance ? path.basename(acceptance) : existingContract.acceptance,
                settlement: settlement ? path.basename(settlement) : existingContract.settlement, 
                bill: bill ? path.basename(bill) : existingContract.bill,
                contract_id,
                contract: contract ? path.basename(contract) : existingContract.contract,
            };
            // console.log("controller: ", updateData);
            const result = await contractModels.updateContract(updateData);
            return res.status(200).json({
                success: true,
                message: "Contract update successfully",
                insertId: result.insertId,
            });
        }catch(error){
            console.error("Error updating contract: ", error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error.message,
            })
        }
    }
}

module.exports = contractController;