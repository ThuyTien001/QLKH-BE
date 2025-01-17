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
}

module.exports = partnerController;