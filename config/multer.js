const multer = require('multer');
const path = require('path');
const slugify = require('slugify'); 

// Cấu hình lưu trữ file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Thư mục lưu trữ file
  },
  filename: (req, file, cb) => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const year = now.getFullYear().toString().slice(-2); 
    const uniqueSuffix = `${month}${year}`;
    const originalName = Buffer.from(file.originalname, 'latin1').toString('utf8');
    cb(null, `${uniqueSuffix}-${originalName}`); // Định dạng tên file
  //   // Sử dụng slugify để bỏ dấu và chuyển thành tên file an toàn
  //   const sanitizedFileName = slugify(file.originalname, {
  //     replacement: "-", // Thay khoảng trắng bằng dấu gạch ngang
  //     remove: /[^a-zA-Z0-9.-]/g, // Loại bỏ các ký tự đặc biệt, bao gồm dấu
  //     lower: true, // Chuyển thành chữ thường
  //   });

  //   // Tạo tên file với phần tiền tố tháng/năm + tên file đã được làm sạch
  //   cb(null, `${uniqueSuffix}-${sanitizedFileName}`);
  },
});

// Bộ lọc loại file
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|pdf|docx|txt|doc|xlsx/;
  const ext = path.extname(file.originalname).toLowerCase();
  // console.log(`File uploaded: ${file.originalname}, extension: ${ext}`);
  if (allowedTypes.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error('File type not allowed'), false);
  }
};

// Khởi tạo Multer
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 500 * 1024 * 1024 }, // Giới hạn file 5MB
});

module.exports = upload.fields([
  { name: 'form', maxCount: 1 },
  { name: 'image', maxCount: 1 },
  { name: 'authorization', maxCount: 1 },
  { name: 'business_license', maxCount: 1 },
  { name: 'orther', maxCount: 1 },
]);
