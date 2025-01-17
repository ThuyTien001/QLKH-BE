const RecordModel = require('../../models/Intellectual_Property/recordModels');
const path = require('path');

class RecordController {
  static async addRecord(req, res) {
    try {
      const { record_code, customer_id, commission_id } = req.body;

      // Lấy các đường dẫn file từ req.files
      const form = req.files?.form?.[0]?.path || null;
      const image = req.files?.image?.[0]?.path || null;
      const authorization = req.files?.authorization?.[0]?.path || null;
      const business_license = req.files?.business_license?.[0]?.path || null;
      const orther = req.files?.orther?.[0]?.path || null;

      // Xác thực dữ liệu
      if (!record_code || !customer_id) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields: record_code or customer_id',
        });
      }
      
      // Gọi model để thêm bản ghi
      const result = await RecordModel.addRecord(
        record_code,
        customer_id,
        form ? path.basename(form) : null,
        image ? path.basename(image) : null,
        authorization ? path.basename(authorization) : null,
        business_license ? path.basename(business_license) : null,
        orther ? path.basename(orther) : null,
        commission_id
      );

      return res.status(201).json({
        success: true,
        message: "Record added successfully",
        insertedId: result.insertedId,
      });
    } catch (error) {
      console.error('Error adding record:', error.message);
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  }

  static async updateRecord(req, res){
    try{
      const {record_code, commission_id, record_id}= req.body;
      // console.log("data controller: ", record_code, commission_id, record_id);
      if(!record_code || !commission_id || !record_id){
        return res.status(400).json({
          success: false,
          message: "Missing required fields"
        });
      }
      const existingRecord = await RecordModel.getRecordById(record_id);
      if(!existingRecord){
        return res.status(404).json({
          success: false,
          message: "Record not found"
        })
      }
      const form = req.files?.form?.[0]?.path || null;
      const image = req.files?.image?.[0].path || null;
      const authorization = req.files?.authorization?.[0].path || null;
      const business_license = req.files?.business_license?.[0].path || null;
      const orther = req.files?.orther?.[0].path || null;
      const updateData = {
        record_code,
        form: form ? path.basename(form) : existingRecord.form,
        image: image ? path.basename(image) : existingRecord.image,
        authorization: authorization ? path.basename(authorization) : existingRecord.authorization,
        business_license: business_license ? path.basename(business_license) : existingRecord.business_license,
        orther: orther ? path.basename(orther) : existingRecord.orther,
        commission_id,
        record_id,

      }
      // console.log("controler: ", updateData)
      const result = await RecordModel.updateRecord(updateData);
      return res.status(200).json({
        success: true,
        message: "Record update successfully",
        insertedId: result
      });
    }catch(error){
      console.error("Error updating record: ", error.message);
      return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: error.message,
      })
    }
  }
}

module.exports = RecordController;
