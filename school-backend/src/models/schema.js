import mongoose, { mongo } from "mongoose";


const schoolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  notices: [{ type: mongoose.Schema.Types.ObjectId, ref: "notice" }],
  teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: "teacher" }],
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "student" }],
  classes: [{ type: mongoose.Schema.Types.ObjectId, ref:"class"}],
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: "subject"}],
  library: [{ type : mongoose.Schema.Types.ObjectId, ref: "Library"}],
  transports: [{ type: mongoose.Schema.Types.ObjectId, ref: "transport" }]
});

const noticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  by: { type: String, required: true},
  date: { type: Date, default: Date.now },
  file: { type: String}
});

const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String },
  password: { type: String, required: true },
  subject: { type: [String] },
  classes: {type: [String]},
  phone:{ type: String},
  image: { type: String, required: true },
  salary: { type: Number}
});

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' },
  schoolName: { type: String, unique: true },
});

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email:{ type: String, required:true},
  className: { type: String, required: true },
  section:{ type: String, required:true},
  rollNum: { type: String, required: true },
  phone: { type: String, required: true },
  parentsContact: { type: String},
  password: { type: String, required: true },
  school: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "admin",
  },
  role: {
    type: String,
    default: "Student",
  },
  image: { type: String},
  examResult: [{type: mongoose.Schema.Types.ObjectId, ref:"result"}],
  library: [{ type: mongoose.Schema.Types.ObjectId, ref:"Library"}],
  fees: [{ type: mongoose.Schema.Types.ObjectId, ref: "fee" }],
  leaves: [{ type: mongoose.Schema.Types.ObjectId, ref:"leave"}],
  transports: [{ type: mongoose.Schema.Types.ObjectId, ref: "transport" }],
  attendance: [
    {
      date: { type: Date, required: true },
      status: { type: String, enum: ["Present", "Absent"], required: true },
      className: { type: String, required: true},
      section: { type: String, required: true},
      subName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subject",
        required: true,
      },
    },
  ],
});

const examResult = new mongoose.Schema(
  {
    student: [{ type: mongoose.Schema.Types.ObjectId, ref: "student"}],
    subName:{ type: String, required: true},
    subCode: { type: String, required: true},
    marksObtained:{ type: Number, required: true},
    grade: { type:String, required : true }
  }
)

const classSchema = new mongoose.Schema(
  {
    className: { type: String, required: true },
    school: { type: mongoose.Schema.Types.ObjectId, ref: "admin" },
    subject: {type: String, required: true}
  },
);

const subjectSchema = new mongoose.Schema(
  {
    subName: {type: String,required: true},
    subCode: {type: String},
    classes: {type: mongoose.Schema.Types.ObjectId,ref: "class"},
    schools: [{type: mongoose.Schema.Types.ObjectId,ref: "admin"}],
    teachers: [{type: mongoose.Schema.Types.ObjectId,ref: "teacher"}],
  }
);

const attendanceSchema = new mongoose.Schema(
  {
    student: [{ type: mongoose.Schema.Types.ObjectId, ref: "student"}],
    date:{type: Date, default: Date.now },
    className:{type:String},
    subject: { type: String},
    section:{type: String},
    totalLecturesByFaculty: { type: Number,default: 0},
    lectureAttended: { type: Number, default: 0},
  }
)

const librarySchema = new mongoose.Schema(
  {
    overDue : { type: String},
    totalFine: { type: String, default: 0},
    title : { type: String },
    issueDate: { type: Date, default: Date.now},
    dueDate: { type: Date},
    accesionNo: { type: String },
    quantity: {type: Number},
    status: { type: Boolean, default: false}
  }
)

const feesSchema = new mongoose.Schema(
 {
  tuition : { type: Number, default: 0},
  library : { type: Number, default: 0},
  transport: { type: Number, default: 0},
  lab: { type: Number, default: 0},
  sports: { type: Number, default: 0},
  examination: { type: Number, default: 0},
  technology: { type: Number, default: 0}
 }
)

const transportSchema = new mongoose.Schema(
  {
    file: { type: String},
  }
)

const leaveSchema = new mongoose.Schema(
  {
    name: { type: String,required:true},
    class:{ type:Number, required: true },
    startDate:{ type: Date, required: true},
    endDate: { type:  Date, required: true},
    totalNumber: { type: Number, required: true},
    reason: { type: String, required: true},
    file: { type: String},
    status: { type: String, enum: ['Pending','Approved','Rejected'], default:'Pending' }
  }
)


export const schlModel = new mongoose.model("schl", schoolSchema);
export const noticeModel = new mongoose.model("notice",noticeSchema);
export const attendanceModel = new mongoose.model("attend",attendanceSchema);
export const teacherModel = new mongoose.model("teacher", teacherSchema);
export const adminModel = new mongoose.model("admin", adminSchema);
export const studentModel = new mongoose.model("student", studentSchema);
export const classModel = new mongoose.model("class", classSchema);
export const subjectModel = new mongoose.model("subject",subjectSchema);
export const resultModel = new mongoose.model("result",examResult);
export const libraryModel = new mongoose.model("Library", librarySchema);
export const feesModel = new mongoose.model("fee",feesSchema);
export const transportModel = new mongoose.model("transport",transportSchema);
export const leaveModel = new mongoose.model("leave",leaveSchema);