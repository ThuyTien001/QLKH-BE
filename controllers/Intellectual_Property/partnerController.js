const partnerModels = require('../../models/Intellectual_Property/partnerModels');

class partnerController {
    static async getPartner(req, res){
        try{
            const partner = await partnerModels.getPartner();
            res.status(200).json({data: partner});
        }catch(error){
            res.status(500).json({error: 'Failed to fetch Partner'});
        }
    }
    static async addPartnerController(req, res){
        try{
            const {partner_code, partner_name, partner_phone, partner_email}= req.body;
            if(!partner_code||!partner_name || !partner_phone || !partner_email){
                return res.status(400).json({
                    success: false,
                    message: "Missing required fields",
                });
            }
            const result = await partnerModels.addPartner(partner_code, partner_name, partner_phone, partner_email);
            return res.status(201).json({
                success: true,
                message: "Partner added successfully",
                data: result,
            })
        }catch(error){
            console.error("Error while adding Partner: ", error);
            return{
                success: false,
                 message: "Internal server error"
            }
        }
    }
    static async updatePartnerController (req, res){
        // console.log("data: ", req.body);
        try{
            const {partner_code, partner_name, partner_phone, partner_email, partner_id} = req.body;
            if(!partner_code || !partner_name){
                return res.status(400).json({
                    success: false,
                    message: "Missing required fields"
                });
            }

            const result = await partnerModels.updatePartner(partner_code, partner_name, partner_phone, partner_email, partner_id);
            return res.status(201).json({
                success: true,
                message: "Partner update successfully",
                data: result,
            })
        }catch(error){
            console.error("Error while update Partner: ", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            })
        }
    }
    static async addPartnerFormFile (req, res){
        try{
            const partners = req.body;
            // console.log("data submit: ", partners)
            if(!Array.isArray(partners) || partners.length ===0){
                return res.status(400).json({
                    success: false,
                    message: "Invalid Partner data",
                });
            }
            //Kiểm tra và lưu tất cả đối tác
            for(const partner of partners){
                const {partner_code, partner_name, partner_phone, partner_email} = partner;
                if(!partner_code || !partner_name){
                    return res.status(400).json({
                        success: false,
                        message: "Missing required fields",
                    });
                }
                await partnerModels.addPartner(partner_code, partner_name, partner_phone, partner_email);
            }
            return res.status(201).json({
                success: true,
                message: "Partner added successfully",
            });
        }catch(error){
            console.error("Error while adding Partner: ", error);
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            })
        }
    }
}

module.exports = partnerController;