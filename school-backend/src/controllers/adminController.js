import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import {
  adminModel,
  feesModel,
  noticeModel,
  schlModel,
  studentModel,
  transportModel,
} from "../models/schema.js";
import { StatusCodes } from "http-status-codes";


export async function saveSchool(req, res){
  try {
    const school = new schlModel(req.body);
    const saveSchool = await school.save();
    res.status(StatusCodes.CREATED).json(saveSchool);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json();
  }
}


export async function adminRegister(req, res) {
  try {
    const hashedPassword = bcrypt.hashSync(req.body.password, 12);
    req.body["password"] = hashedPassword;

    const existingAdminByEmail = await adminModel.findOne({
      email: req.body.email,
    });
    const existingSchool = await adminModel.findOne({
      schoolName: req.body.schoolName,
    });

    if (existingAdminByEmail) {
      return res.status(400).json({ message: "Email already exists" });
    } else if (existingSchool) {
      return res.status(400).json({ message: "School name already exists" });
    } else {
      const admin = new adminModel(req.body);
      const result = await admin.save();
      result.password = undefined;
      return res.status(201).json(result);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
}

export async function adminLogin(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const admin = await adminModel.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    admin.password = undefined;
    return res.status(200).json(admin);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
}

export async function getAdminDetail(req, res) {
  try {
    const admin = await adminModel.findById(req.params.id);
    if (admin) {
      admin.password = undefined;
      return res.status(200).json(admin);
    } else {
      return res.status(404).json({ message: "No admin found" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
}


export async function getSchoolData(req, res){
  try {
    const schl = await schlModel.find().populate({
      path:"notices",
    }).populate({
      path:"students",
    }).populate({
      path:"classes"
    }).populate({
      path:"subjects",
    }).populate({
      path:"library"
    }).populate({
      path:"transports"
    });
    res.status(StatusCodes.OK).json(schl);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json();
  }
}


export async function saveFees(req, res) {
  try {
    const fees = new feesModel(req.body);
    const saveFees = await fees.save();

    const studentId = req.params.id;
    const feesId = saveFees._id;
    const updateStudent = await studentModel.findByIdAndUpdate(
      studentId,
      { $push: { fees: feesId } },
      { new: true }
    );
    if (!updateStudent) {
      res.status(StatusCodes.NOT_FOUND).json({ msg: "Student not found" });
    }
    res.status(StatusCodes.ACCEPTED).json(saveFees);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json();
  }
}

// export async function saveTransport(req, res) {
//   try {
//     const transport = new transportModel(req.body);
//     const saveTransport = await transport.save();
//     res.status(StatusCodes.CREATED).json(saveTransport);
//   } catch (error) {
//     console.log(error);
//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json();
//   }
// }
// export async function updateTransport(req, res) {
//   try {
//     const { id } = req.params;
//     const { studentId } = req.body; 
//     const transport = await transportModel.findByIdAndUpdate(
//       id,
//       { $push: { student: studentId } },
//       { new: true }
//     );
//     res.status(StatusCodes.OK).json(transport);
//   } catch (error) {
//     console.error(error);
//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json();
//   }
// }

export async function saveTransport(req, res) {
  try {
    const file = `http://localhost:3700/${req.file.filename}`;
    req.body['file'] = file;
    const transports = new transportModel(req.body);
    const saveTrans = await transports.save();
    const studentId = req.params.id;
    const updateStudent = await studentModel.findByIdAndUpdate(
      studentId,
      { $push: { transports: saveTrans._id } }, 
      { new: true }
    );
    res.status(StatusCodes.CREATED).json(saveTrans);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json();
  }
}


export async function saveNotice(req, res){
  try {
    const file = `http://localhost:3700/${req.file.filename}`;
    req.body['file'] = file;
    const notices = new noticeModel(req.body);
    const saveNotice = await notices.save();
    const schlId = req.params.id;
    const updateSchool = await schlModel.findByIdAndUpdate(
      schlId,
      { $push: { notices: saveNotice._id}},
      { new: true}
    );
    res.status(StatusCodes.CREATED).json(saveNotice);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json();
  }
}

