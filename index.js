const express = require('express');
const app = express();
const db = require('./config/index');
const path = require("path");
const appRouter = require('./routes/route');
const multer = require('multer');

const cors = require('cors');

// app.use((cros));

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173', 'http://localhost', 'http://dichvukhcn.id.vn', 'http://127.0.0.1'], // Chỉ cho phép frontend tại localhost:5173
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Cho phép các method cụ thể
  credentials: true, // Cho phép gửi cookie nếu cần
}));

const PORT  = process.env.PORT || 5000 ;
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  next();
});
// app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Serve static files
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/uploads/:fileName', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.fileName);
  
  // Sử dụng res.download để tải file về
  res.download(filePath, (err) => {
      if (err) {
          res.status(500).send("Không thể tải file.");
      }
  });
});

//upload file status record

app.get('/uploads_status/:fileName', (req, res) => {
  const filePath = path.join(__dirname, 'uploads_status', req.params.fileName);

  //sử dụng res.download để tải file

  res.download(filePath, (err) => {
    if(err){
      res.status(500).send("Không thể tải file");
    }
  })
})


app.use('/api', appRouter)

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });