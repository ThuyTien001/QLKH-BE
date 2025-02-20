const express = require('express')
const studentControllers = require('../controllers/studentControllers');
const classControllers = require('../controllers/classControllers');
const courseController = require('../controllers/courseControllers');
const participantControllers = require('../controllers/participantControllers');
const staffController = require('../controllers/staffController');
const styleProductController = require('../controllers/Intellectual_Property/style_productController');
const partnerController = require('../controllers/Intellectual_Property/partnerController');
const lpController = require('../controllers/Intellectual_Property/lead_providerController');
const path = require('path');
const upload = require('../config/multer');
const recordControllers = require('../controllers/Intellectual_Property/recordController');
const uploads_status = require('../config/multer_statusRecord');
const statusRecordController = require('../controllers/Intellectual_Property/status_record_styleproduct');
const brandControllers = require('../controllers/Intellectual_Property/brandController');
const patentController = require('../controllers/Intellectual_Property/patentController');
const barcodeController = require('../controllers/Intellectual_Property/barcodeController');
const copyrightController = require('../controllers/Intellectual_Property/copyrightController');
const contractController = require('../controllers/Intellectual_Property/contractController')
const contract = require('../config/multer-contract');
const leadProviderController = require('../controllers/Intellectual_Property/lead_providerController');
const appRouter = express.Router();

//get
appRouter.get('/students', studentControllers.getStudents);
appRouter.get('/class', classControllers.getClass); 
appRouter.get('/course', courseController.getCourse);
appRouter.get('/participant', participantControllers.getParticipant);
appRouter.get('/staff', staffController.getStaff);


//post

appRouter.post('/class/add', classControllers.addClassController);
appRouter.post('/login', staffController.login);
appRouter.post('/staff/add', staffController.addStaffContraller);
appRouter.post('/course/add', courseController.addCourseController);
appRouter.post('/student/add', studentControllers.addStudentController);
appRouter.post('/student/add/file', studentControllers.addStudentFormFile);
appRouter.post("/partner/add", partnerController.addPartnerController);



//put
appRouter.put('/course/update', courseController.updataCourseController);
appRouter.put('/student/update', studentControllers.updateStudentController);
appRouter.put('/staff/update', staffController.updateStaffController);
appRouter.put('/partner/update', partnerController.updatePartnerController);

// get Intellectual_Property
appRouter.get('/styleproducts', styleProductController.getStyleProduct);
appRouter.get('/commission', styleProductController.getCommission);
appRouter.get('/leadprovider', lpController.getLeadProvider);
appRouter.get('/partner', partnerController.getPartner);

appRouter.get('/brand', brandControllers.getBrand);
appRouter.get('/patent', patentController.getPatent)
appRouter.get('/barcode', barcodeController.getBarcode)
appRouter.get("/copyright", copyrightController.getCopyright)

appRouter.get('/status', styleProductController.getStatus);


//post Intellectial_Property

appRouter.post('/customer/add', styleProductController.addCustomerController);
// appRouter.post(
//     '/record/add',
//     upload.fields([
//         { name: "formName", maxCount: 1 },
//         { name: "imageName", maxCount: 1 },
//         { name: "authorizationName", maxCount: 1 },
//         { name: "business_licenseName", maxCount: 1 },
//         { name: "ortherName", maxCount: 1 },
//     ]),
//     recordControllers.addRecord
// );

appRouter.post('/record/add', upload, recordControllers.addRecord);
appRouter.post('/statusrecord/add', uploads_status, statusRecordController.addStatusRecord)
appRouter.post('/contract/add', contract, contractController.addContract);
appRouter.post('/leadprovider/add', leadProviderController.addLeadProviderController);
appRouter.post('/customer/add/file', styleProductController.addCustomerFormFile);
appRouter.post('/partner/add/file', partnerController.addPartnerFormFile)
appRouter.post('/leadprovider/add/file', leadProviderController.addLeadProviderFormFile)





// put Intellectial_Property

appRouter.put('/customer/update', styleProductController.updateCustomerController);
appRouter.put('/record/update',upload, recordControllers.updateRecord);
appRouter.put('/statusrecord/update', uploads_status, statusRecordController.updateStatusRecord)
appRouter.put('/contract/update', contract, contractController.updateContract);
appRouter.put('/leadprovider/update', leadProviderController.updateLeadProviderController);

module.exports = appRouter;