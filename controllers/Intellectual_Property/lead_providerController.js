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
}
module.exports = leadProviderController;