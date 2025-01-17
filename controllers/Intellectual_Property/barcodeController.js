const barcodeModels = require('../../models/Intellectual_Property/barcodeModels');
class barcodeController {
    static async getBarcode(req, res) {
        try{
            const customer = await barcodeModels.getBarcode();
            res.status(200).json({data: customer});
        }catch(err){
            res.status(500).json({error: "Failed to fetch Barcode"});
        }
    }
    
}
module.exports= barcodeController