import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import './App.css';
// import NavigationBar from './components/Navbar';
import Top from './components/Top';
import Login from './components/Login';
import Enquiry from './components/Enquiry';
import Facilities from './components/Facilities';
import Activities from './components/Activities';
import Career from './components/Career';
import Contact from './components/Contact';
import Feedback from './components/Feedback';
import About from './components/About';
import StudSidebar from './components/students/studSidebar';
import LoginAs from './components/LoginAs';
import FacultySidebar from './components/Faculty/FacultySidebar';
import Attendance from './components/Faculty/Attendance';
import Dashboard from './components/Admin/AdminDash';
import AddStudent from './components/Admin/AddStud';
import AddFaculty from './components/Admin/AddFaculty';
import Academics from './components/Academics';
import Admission from './components/Admission';
import Result from './components/Faculty/Result';
import StudResults from './components/students/StudResults';
import { UserProvider } from './components/UserContext';
import StudDashboard from './components/students/StudDashboard';
import StudFees from './components/students/StudFees';
import StudLibrary from './components/students/StudLibrary';
import Library from './components/Faculty/FacultyLibrary';
import Leave from './components/students/Leave';
import LeaveDetails from './components/Faculty/LeaveDetails';
import FacultyInfo from './components/students/FacultyInfo';
import FacultyDash from './components/Faculty/FacultyDash';
import Update from './components/Admin/Update';
import Notice from './components/Admin/Notice';
import ResultList from './components/Faculty/ResultList';
import FacultyFee from './components/Admin/FacultyFee';



function App() {
  return (
    <>

    <UserProvider>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<Top/>}></Route>
          {/* <Route path='/' element={<NavigationBar/>}></Route> */}
          <Route path='/login-as' element={<LoginAs/>}></Route>
          <Route path='/login/:role' element={<Login/>}></Route>
          <Route path='/enquiry' element={<Enquiry/>}></Route>
          <Route path='/facilities' element={<Facilities/>}></Route>
          <Route path='/activities' element={<Activities/>}></Route>
          <Route path='/careers' element={<Career/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
          <Route path='/feedback' element={<Feedback/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/studentSidebar' element={<StudSidebar/>}></Route>
          <Route path='/faculty' element={<FacultySidebar/>}></Route>
          <Route path='/attendance' element={<Attendance/>}></Route>
          <Route path='/adminDashboard' element={<Dashboard/>}></Route>
          <Route path='/add-student' element={<AddStudent/>}></Route>
          <Route path='/add-faculty' element={<AddFaculty/>}></Route>
          <Route path='/academics' element={<Academics/>}></Route>
          <Route path='/admission' element={<Admission/>}></Route>
          <Route path='/result' element={<Result/>}></Route>
          <Route path='/stud-results' element={<StudResults/>}></Route>
          <Route path='/studentDashboard' element={<StudDashboard/>}></Route>
          <Route path='/stud-fees' element={<StudFees/>}></Route>
          <Route path='/libraryDetails' element={<StudLibrary/>}></Route>
          <Route path='/facultyLibrary' element={<Library/>}></Route>
          <Route path='/leaveApplication' element={<Leave/>}></Route>
          <Route path='/facultyLeave' element={<LeaveDetails/>}></Route>
          <Route path='/facultyInfo' element={<FacultyInfo/>}></Route>
          <Route path='/facultyDashboard' element={<FacultyDash/>}></Route>
          <Route path='/updateData' element={<Update/>}></Route>
          <Route path='/createNotice' element={<Notice/>}></Route>
          <Route path='/resultList' element={<ResultList/>}></Route>
          <Route path='/facultyFee' element={<FacultyFee/>}></Route>
        </Routes> 
      </BrowserRouter>

    </UserProvider>

 
     
    </>
  );
}

export default App;

  // const [responseId, setResponseId] = useState("");
  // const [responseState, setResponseState] = useState("");

  // const loadScript = (src) => {
  //   return new Promise((resolve) => {
  //     const script = document.createElement("script");
  //     script.src = src;
  //     script.onload() =() =>{
  //       resolve(true)
  //     }
  //     script.onerror() = () =>{
  //       resolve(false)
  //     }
  //     document.body.appendChild(script);
  //   })
  // }

  // const createRazorpayOrder = (amount) =>{
  //   let data = JSON.stringify({
  //     amount: amount * 100,
  //     currency: "INR"
  //   })
  //   let config ={
  //     method : "POST",
  //     maxBodyLength: Infinity,
  //     url: "http://localhost:5000/orders",
  //     headers: {
  //       'Content-Type':'application.json'
  //     },
  //     data: data
  //   }
  //   axios.req
  //   uest(config).then((response) =>{
  //     console.log(JSON.stringify(response.data))
  //   })
  // }
