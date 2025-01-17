const patentModels = require('../../models/Intellectual_Property/patentModels');

class patentController{
    static async getPatent(req, res) {
        try{
            const patent = await patentModels.getPatent();
            res.status(200).json({data: patent});
        }catch(error){
            res.status(500).json({error: "Failed to fetch Patent"});
        }
    }
}

module.exports = patentController;