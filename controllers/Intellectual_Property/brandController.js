const brandModels = require('../../models/Intellectual_Property/brandModels');

class brandControllers {
    static async getBrand(req, res){
        try{
            const brand = await brandModels.getBrand();
            res.status(200).json({data: brand});
        }catch(error){
            res.status(500).json({error: "Failed to fetch Brand"});
        }
    }
}
module.exports = brandControllers;