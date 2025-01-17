const copyrightModel = require('../../models/Intellectual_Property/copyrightModel');

class copyrightController {
    static async getCopyright(req, res){
        try{
            const customer = await copyrightModel.getCopyright();
            res.status(200).json({data: customer});
        }catch(err){
            res.status(500).json({error: "Faild to fetch Copyright"})
        }
    }
}

module.exports = copyrightController;