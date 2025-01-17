const multer = require ('multer');
const path = require('path');

//cấu hình lưu trữ file 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads_status/'); //Thư mụ lưu trữ file
    },
    filename: (req, file, cb) => {
        const now = new Date();
        const month = now.getMonth() + 1;
        const year = now.getFullYear().toString().slice(-2);
        const uniqueSuffix = `${month}${year}`;
        const originalName = Buffer.from(file.originalname, 'latin1').toString('utf8');
        cb(null, `${uniqueSuffix}-${originalName}`);
    },
});

    //Bộ lọc loại file
    const fileFilter = (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|pdf|docx|txt|doc/;
        const ext = path.extname(file.originalname).toLowerCase();
        if(allowedTypes.test(ext)){
            cb(null, true);
        }else{
            cb(new Error('File type not allowed'), false);
        }
    };

    //Khởi tạo Multer

    const uploads_status = multer({
        storage, 
        fileFilter,
        limits: {fileSize: 500 * 1024 * 1024}, 
    })

    module.exports = uploads_status.fields([
        {name: 'patent', maxCount: 1},
    ]);