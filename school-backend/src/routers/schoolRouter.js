import express from "express";
import multer from "multer";
import path from "path";
import { adminLogin, adminRegister, getAdminDetail, getSchoolData, saveFees, saveNotice, saveSchool, saveTransport } from "../controllers/adminController.js";
import { FeePayment, getFaculty, getStudentById, getStudents, saveLeave, studentLogin, studentRegister, updateLeaveStatus } from "../controllers/studentController.js";
import { deleteBook, facultyLogin, facultyRegister, getFacultyById, returnBook, saveAttendance, saveLibrary, saveResult, saveSubjects } from "../controllers/teacherController.js";

const schoolRouter = express.Router();
const storage = multer.diskStorage(
    {
        destination:'./src/Images',
        filename:(req,file,cb)=>{
            return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
        }
    }
)
schoolRouter.use(express.static('src/Images'));
const upload = multer({storage:storage});

schoolRouter.post('/school', saveSchool);
schoolRouter.post('/notice/:id',upload.single('file'),saveNotice);
schoolRouter.get('/schoolData',getSchoolData);
schoolRouter.post("/adminRegister",adminRegister);
schoolRouter.get("/admin/:id",getAdminDetail);
schoolRouter.post('/adminLogin',adminLogin);
schoolRouter.post('/studentLogin',studentLogin);
schoolRouter.get('/studentDetail', getStudents);
schoolRouter.post('/studentRegister', upload.single('image'),studentRegister);
schoolRouter.post('/saveSubject',saveSubjects);
schoolRouter.post('/facultyRegister',upload.single('image'), facultyRegister);
schoolRouter.post('/facultyLogin', facultyLogin);
schoolRouter.post('/saveAttendance', saveAttendance);
schoolRouter.post('/saveResult', saveResult);
schoolRouter.get('/studentDetail/:id', getStudentById);
schoolRouter.post('/payment',FeePayment);
schoolRouter.post('/saveLibrary',saveLibrary);
schoolRouter.post('/saveFees/:id', saveFees);
// schoolRouter.post('/Transport',saveTransport);
// schoolRouter.put('/Transport/:id',updateTransport);
schoolRouter.post('/leaveApplication/:id',upload.single('file'),saveLeave);
schoolRouter.put('/leaveApplication/:leaveId/:studentId', updateLeaveStatus);
schoolRouter.get('/facultyDetails',getFaculty);
schoolRouter.post('/transport/:id',upload.single('file'),saveTransport);
schoolRouter.post('returnBooks/:id',returnBook);
schoolRouter.get('/facultyDetails/:id',getFacultyById);
schoolRouter.delete('/deletebook/:bookId/:studentId', deleteBook);

export default schoolRouter;





