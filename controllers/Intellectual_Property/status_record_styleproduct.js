const statusRecordModal = require('../../models/Intellectual_Property/status_recordModels')
const path = require('path');

class statusRecordController{
    static async addStatusRecord (req, res){
        try{
            const {status_name, record_id, form_code, application_date, patent_code, date_of_issuance, expiration_date} = req.body;
            console.log("add status record controller: ", status_name, record_id, form_code, application_date, patent_code, date_of_issuance, expiration_date)

            //lấy dường dẫn file từ req.files

            const patent = req.files?.patent?.[0]?.path || null;

            //xác thực dữ liệu
            if(!record_id){
                return res.status(400).json({
                    success: false,
                    message: 'Missing required fields',
                })
            }
            const processedDateOfIssuance = date_of_issuance && date_of_issuance.trim() !== '' ? date_of_issuance : null;
            const processedExpirationDate = expiration_date && expiration_date.trim() !== '' ? expiration_date : null;

            //Gọi model để thêm trạng thái
            const result = await statusRecordModal.addStatusRecord(
                status_name,
                record_id, 
                form_code,
                application_date,
                patent_code, 
                processedDateOfIssuance,
                patent ? path.basename(patent):null,
                processedExpirationDate
            );

            return res.status(201).json({
                success: true,
                message: "Status Record successfully",
                insertId: result.insertId
            });
        }catch(error){
            console.error('Error adding status record:', error.message);
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error',
                error: error.message
            })
        }
    }
    static async updateStatusRecord (req, res){
        try{
            const {status_id, status_name, form_code, application_date, patent_code, date_of_issuance, expiration_date} = req.body;
            // console.log("data update status controller:  ", status_id, status_name, form_code, application_date, patent_code, date_of_issuance, expiration_date)
            if(!status_id || !status_name){
                return res.status(400).json({
                    success: false,
                    message: "Missing required fields"
                });
            }
            const existingRecord = await statusRecordModal.getStatusRecordById(status_id);
            if(!existingRecord){
                return res.status(404).json({
                    success:false,
                    message: "Record not found"
                })
            }
            // Xử lý file mới
            const patent = req.files?.patent?.[0]?.path || null;
             // Chuẩn bị dữ liệu để cập nhật
             const updatedData = {
                status_id,
                status_name,
                form_code,
                application_date,
                patent_code,
                date_of_issuance,
                expiration_date,
                patent: patent ? path.basename(patent) : existingRecord.patent, // Dùng file mới hoặc giữ file cũ
            };
            const result = await statusRecordModal.updateStatusRecord(updatedData);

            return res.status(200).json({
                success: true,
                message: 'Status record updated successfully.',
                insertId: result
            });
        }catch (error) {
            console.error('Error updating status record:', error.message);
            return res.status(500).json({
                success: false,
                message: 'Internal Server Error',
                error: error.message,
            });
        }
    }
}

module.exports = statusRecordController;