const leadProviderModels = require('../../models/Intellectual_Property/lead_providerModels');

class leadProviderController {
    static async getLeadProvider(req, res){
        try{
            const lp = await leadProviderModels.getLeadProvider();
            res.status(200).json({data: lp});
        }catch(error){
            res.status(500).json({error: 'Failed to fetch Lead Provider'});
        }
    }
    static async addLeadProviderController(req, res){
        try{
            const {lp_code,lp_name, lp_workplace, lp_phone} = req.body;
            if(!lp_code || !lp_name || !lp_workplace || !lp_phone){
                return res.status(400).json({
                    success: false,
                    message: "Missing required fields",
                });
            }
            const result = await leadProviderModels.addLeadProvider(lp_code, lp_name, lp_workplace, lp_phone);
            return res.status(201).json({
                success: true,
                message: "Lead Provider added successfully",
                data: result,
            })
        } catch(error){
            console.error("Error while adding Lead Provider: ", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            })
        }
    }
    static async updateLeadProviderController(req, res){
        try{
            const {lp_code, lp_name, lp_workplace, lp_phone, lp_id} = req.body;
            if(!lp_code || ! lp_name || !lp_workplace || !lp_phone){
                return res.status(400).json({
                    success: false,
                    message: "Missing required fields"
                });
            }
            const result = await leadProviderModels.updateLeadProvider(lp_code, lp_name, lp_workplace, lp_phone, lp_id);
            return res.status(201).json({
                success: true,
                message: "Lead Provider update successfully",
                data: result,
            })
        }catch(error){
            console.error("Error while update Lead provider: ", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            })
        }
    }
}
module.exports = leadProviderController;