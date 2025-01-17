const multer = require ('multer');
const path = require('path');

//Cấu hình lưu trữ file

const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'contracts/');
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

//Bộ lọc lại file
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|pdf|docx|txt|doc/;
    const ext = path.extname(file.originalname).toLocaleLowerCase();

    if(allowedTypes.test(ext)){
        cb(null, true);
    }else{
        cb(new Error('File type not allowed'), false);
    }
};

//Khởi tạo Multer
const contract = multer({
    storage,
    fileFilter,
    limits: {fileSize: 500 * 1024 * 1024},
});

module.exports = contract.fields([
    {name: 'acceptance', maxCount: 1},
    {name: 'settlement', maxCount: 1},
    {name: 'bill', maxCount: 1}
])