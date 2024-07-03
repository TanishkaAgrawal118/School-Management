import bcrypt from "bcrypt";
import {  leaveModel, schlModel, studentModel, teacherModel } from "../models/schema.js";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import Razorpay from "razorpay";

export async function studentRegister(req, res) {
  try {
    let image;
    if (req.file) {
        image = `http://localhost:3700/${req.file.filename}`;
    } else {
        image = 'http://localhost:3700/default.png'; 
    }
    req.body['image'] = image;
    
    const hashedPass = await bcrypt.hash(req.body.password, 12);

    const existingStudent = await studentModel.findOne({
      rollNum: req.body.rollNum,
      school: req.body.adminID,
      className: req.body.className,
    });

    if (existingStudent) {
      return res.status(400).json({ message: "Roll Number already exists" });
    } else {
      const student = new studentModel({...req.body,school: req.body.adminID,password: hashedPass,});
      const result = await student.save();
      result.password = undefined;
      return res.status(201).json(result);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
}

export async function studentLogin(request, response) {
  try {
    //If email is matched then plane password will be compared with bcrypted password
    const student = await studentModel.findOne({ email: request.body.email });
    if (student) {
      if (bcrypt.compareSync(request.body.password, student.password)) {
        const token = jwt.sign({ id: student._id }, "tanishka123");
        response.status(StatusCodes.OK).json({ token: token, id: student._id  });
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



export async function getStudents(request, response) {
  try {
    const { className, section, subject} = request.query;
    const query = {};
    if (className) query.className = className;
    if (section) query.section = section;
    if (subject) query.subject = subject;
    const student = await studentModel
      .find(query)
      .populate({
        path: "school",
      })
      .populate({
        path: "examResult",
        populate: { path: "subName" },
      })
      .populate({
        path: "attendance",
        populate: { path: "subName" },
      })
      .populate({
        path: "library"
      })
      .populate({
        path:"fees"
      })
      .populate({
        path: "leaves",
      })
      .populate({
        path: "transports",
      });

    if (student) {
      student.password = undefined;
      response.status(StatusCodes.OK).json(student);
    } else {
      response
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "No student found" });
    }
  } catch (err) {
    console.error(err);
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
}



export async function getStudentById(request, response) {
  try {
    const { id } = request.params;
    const student = await studentModel
      .findById(id)
      .populate({
        path: "school",
      })
      .populate({
        path: "examResult",
        populate: { path: "subName" },
      })
      .populate({
        path: "attendance",
        populate: { path: "subName" },
      }).populate({
        path: 'library', 
      }).populate({
        path:'fees',
      }).populate({
        path: "leaves",
      }).populate({
        path: "transports",
      });

    if (student) {
      student.password = undefined;
      response.status(StatusCodes.OK).json(student);
    } else {
      response
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Student not found" });
    }
  } catch (err) {
    console.error(err);
    response
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal server error" });
  }
}


export async function FeePayment(req, res) {
  try {
    console.log('Razorpay Key ID:', process.env.RAZORPAY_KEY_ID);
    console.log('Razorpay Secret Key:', process.env.RAZORPAY_SECRET_KEY);

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET_KEY,
    });
    const options = {
      amount: req.body.amount, 
      currency: req.body.currency,
      receipt: req.body.receipt,
      notes: req.body.notes || {}
    };
    console.log( options);
    const order = await razorpay.orders.create(options);
    console.log('Order created:', order);
    res.status(StatusCodes.OK).json(order);

  } catch (error) {
    if (error instanceof Error) {
      console.error('Error creating order:', error.message);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
    } else {
      console.error(error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error});
    }
  }
}

export async function saveLeave(req, res){
  try {
    const file = `http://localhost:3700/${req.file.filename}`;
    req.body['file'] = file;
    const leaves = new leaveModel(req.body);
    const saveLeave = await leaves.save();

    const studentId = req.params.id;
    const updateStudent = await studentModel.findByIdAndUpdate(
      studentId,
      { $push: { leaves: saveLeave._id }},
      { new : true}
    )
    res.status(StatusCodes.CREATED).json(saveLeave);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json();
  }
}

export async function updateLeaveStatus(req, res){
  const { leaveId, studentId} = req.params;
  const { status } = req.body;
  try {
    const updateLeave = await leaveModel.findByIdAndUpdate(
      leaveId,
      { status },
      { new: true }
    );
    res.status(StatusCodes.OK).json(updateLeave);
  } catch (error) {
    console.error(error);

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: 'Error in updating'});
  }
}

export async function getFaculty(req, res){
  try {
    const response = await teacherModel.find();
    res.status(StatusCodes.OK).json(response)
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json();
  }
}