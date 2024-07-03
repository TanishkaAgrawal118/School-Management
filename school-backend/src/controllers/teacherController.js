import bcrypt from "bcrypt";
import {
  attendanceModel,
  libraryModel,
  resultModel,
  schlModel,
  studentModel,
  subjectModel,
  teacherModel,
} from "../models/schema.js";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

export async function facultyRegister(req, res) {
  try {
    let image = `http://localhost:3700/${req.file.filename}`;
    console.log(image);
    req.body['image'] = image;
    const hashedPass = await bcrypt.hash(req.body.password, 12);

    const existingFaculty = await teacherModel.findOne({
      name: req.body.name,
      email: req.body.email,
    });

    if (existingFaculty) {
      return res.status(400).json({ message: "Faculty already exists" });
    } else {
      const faculty = new teacherModel({
        ...req.body,
        school: req.body.adminID,
        password: hashedPass,
      });
      const result = await faculty.save();
      result.password = undefined;
      return res.status(201).json(result);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
}

export async function facultyLogin(request, response) {
  try {
    const faculty = await teacherModel.findOne({ email: request.body.email });
    if (faculty) {
      if (bcrypt.compareSync(request.body.password, faculty.password)) {
        const token = jwt.sign({ id: faculty._id }, "tanishka123");
        response.status(StatusCodes.OK).json({ token: token,  id: faculty._id  });
      } else {
        response
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: "Invalid password" });
      }
    } else {
      response
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid email" });
    }
  } catch (error) {
    console.log(error);
    response.status(StatusCodes.INTERNAL_SERVER_ERROR).json();
  }
}

export async function getFacultyById(req, res){
  try {
    const { id } = req.params;
    const faculty = await teacherModel.findById(id);
    if (faculty) {
      faculty.password = undefined;
      res.status(StatusCodes.OK).json(faculty);
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ message: 'Faculty member not found' });
    }
   
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json();
  }
}

export async function saveSubjects(req, res) {
  try {
    const allSub = new subjectModel(req.body);
    const data = await allSub.save();
    res.status(StatusCodes.CREATED).json(data);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json();
  }
}


export async function saveAttendance(req, res) {
  try {
    let attendanceData = req.body;
    if (!Array.isArray(attendanceData)) {
      attendanceData = [attendanceData];
    }
    console.log("Received attendance data:", attendanceData);

    for (const record of attendanceData) {
      const { studentId, date, className, subject, section, status } = record;
      const attendanceDate = new Date(date);

      console.log(
        `Attendance for student: ${studentId}, date: ${attendanceDate}, status: ${status}`
      );

      let attendanceRecord = await attendanceModel.findOne({
        student: studentId,
        date: attendanceDate,
      });

      if (!attendanceRecord) {
        attendanceRecord = new attendanceModel({
          student: studentId,
          date: attendanceDate,
          className,
          subject,
          section,
          totalLecturesByFaculty: 1,
          lectureAttended: status === "Present" ? 1 : 0,
        });
      } else {
        attendanceRecord.totalLecturesByFaculty++;

        if (status === "Present") {
          attendanceRecord.lectureAttended++;
        }
      }
      const savedAttendance = await attendanceRecord.save();
      const attentendanceId = savedAttendance._id;
      const updateStudent = await studentModel.findByIdAndUpdate(
        studentId,
        { $push : {attendance : attentendanceId }},
        { new : true }
      );

      res.status(StatusCodes.CREATED).json(savedAttendance);
    }
    
  } catch (error) {
    console.error("Error saving attendance:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Failed to save attendance" });
  }
}



export async function saveResult (req, res) {
  try {
    const results = req.body;
    const savedResults = [];

    for (const resultData of results) {
      const { studentId, subName, subCode, marksObtained, grade } = resultData;
      const result = new resultModel({
        studentId,
        subName,
        subCode,
        marksObtained,
        grade
      });
      const saveResult = await result.save();
      savedResults.push(saveResult);
      const updateStudent = await studentModel.findByIdAndUpdate(
        studentId,
        { $push: { examResult: saveResult._id } },
        { new: true }
      );
    }
    return res.status(StatusCodes.CREATED).json(savedResults);
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Failed to save results' });
  }
};

export async function saveLibrary(req, res) {
  try {
    const { studentId, title, accesionNo, issueDate, overDue, totalFine } = req.body;

    const record = new libraryModel({ title, accesionNo, issueDate, overDue, totalFine, status: true });
    const saveRecord = await record.save();

    const updateStudent = await studentModel.findByIdAndUpdate(
      studentId,
      { $push: { library: saveRecord._id } },
      { new: true }
    );

    res.status(StatusCodes.CREATED).json(saveRecord);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json();
  }
}

export async function returnBook(req, res) {
  try {
    const { bookId } = req.body;
    const updateLibrary = await libraryModel.findByIdAndUpdate(
      bookId,
      { status: false },
      { new: true }
    );
    res.status(StatusCodes.OK).json(updateLibrary);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json();
  }
}

export async function deleteBook(req,res) {
  const { bookId, studentId } = req.params;
  try {
    const deletedBook = await libraryModel.findByIdAndDelete(bookId);
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found.' });
    }
    const updatedStudent = await studentModel.findByIdAndUpdate(
      studentId,
      { $push: { library: bookId } },
      { new: true }
    );
    if (!updatedStudent) {
      return res.status(404).json({ message: 'Student not found.' });
    }
    res.status(200).json({ message: 'Book deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete book', error });
  }
}