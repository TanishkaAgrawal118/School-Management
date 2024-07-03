import React from "react";
import { Col, Row } from "react-bootstrap";
import { IoLocationOutline } from "react-icons/io5";
import { IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
const Footer = () => {
  const logo = new URL("../images/school.png", import.meta.url);
  return (
    <>
      <div className="footer">
        <Row>
          <Col lg={3}>
            <img
              src={logo} alt="logo"
              style={{
                width: "300px",
                height: "130px",
                padding: "10px",
                margin: "15px",
                borderRadius: "10px",
              }}
            ></img>
          </Col>
          <Col lg={3}>
            <h3 className="footer-heading">DIS LINKS</h3>
            <ul className="arrow-list">
              <a href="/about" className="footer-list">
                <li>About us</li>
              </a>
              <a href="/academics" className="footer-list">
                <li>Acadmics</li>
              </a>
              <a href="/facilities" className="footer-list">
                <li>Facilities</li>
              </a>
              <a href="/contact" className="footer-list">
                <li>Contact</li>
              </a>
              <a href="/activites" className="footer-list">
                <li>Activities</li>
              </a>
              <a href="/careers" className="footer-list">
                <li>Career</li>
              </a>
            </ul>
          </Col>
          <Col lg={5}>
            <h3 className="footer-heading">HEAD OFFICE</h3>
            <div style={{color:"white"}}>
              <div className="mb-3  d-flex">
                <IoLocationOutline style={{marginRight:"15px",fontSize:"25px"}}/>C 310-311, Unitech Business Zone, Nirvana
                Country South City 2, Sector 50 Gurugram, Pin 122018.
              </div>
              <div className="mb-3">
                <span>
                  <IoCall style={{marginRight:"15px"}}/>
                  1800 891 1256
                </span>
              </div>
              <div className="mb-3">
                <MdEmail style={{marginRight:"15px"}} />
                enquiry@dreamindia.com
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Footer;



// try {
//   const response = await updateLeaveStatus(leaveId, studentId, { status });
//   console.log(response.data);
//     const updatedStudents = students.map(student => {
//       if (student._id === studentId) {
//         student.leaves = student.leaves.map(leave => {
//           if (leave._id === leaveId) {
//             leave.status = status;
//           }
//           return leave;
//         });
//       }
//       return student;
//     });
//     setStudents(updatedStudents);
  
// } catch (error) {
//   console.error('Error updating leave status:', error);
// }
// import React, { useEffect, useState } from 'react';
// import FacultySidebar from './FacultySidebar';
// import { Button, Col, Container, Row } from 'react-bootstrap';
// import { Paper } from '@mui/material';
// import { getStudents } from '../ApiSerives';

// const ResultList = () => {
//   const [students, setStudents] = useState([]);
//   const [filteredStudents, setFilteredStudents] = useState([]);
//   const [searchClass, setSearchClass] = useState('');
//   const [searchSubject, setSearchSubject] = useState('');

//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const response = await getStudents();
//         const students = response.data;
//         setStudents(students);
//         setFilteredStudents(students);
//       } catch (error) {
//         console.error("Error fetching students:", error);
//       }
//     };
//     fetchStudents();
//   }, []);

//   const handleSearch = () => {
//     let filtered = students;
//     if (searchClass) {
//       filtered = filtered.filter(student => student.className === searchClass);
//     }
//     if (searchSubject) {
//       filtered = filtered.filter(student => 
//         student.examResult.some(result => result.subName.toLowerCase() === searchSubject.toLowerCase())
//       );
//     }
//     setFilteredStudents(filtered);
//   };

//   const uniqueClassNames = [...new Set(filteredStudents.map(student => student.className))];

//   return (
//     <>
//       <FacultySidebar/>
//       <Container className='content-container'>
//         <Paper className='content-paper'>
//           <Row>
//             <Col>
//               <label className="label">Class</label>
//               <input
//                 type="number"
//                 placeholder="Enter class"
//                 className="lib-input"
//                 value={searchClass}
//                 onChange={(e) => setSearchClass(e.target.value)}
//               />
//             </Col>
//             <Col>
//               <label className="label">Subject</label>
//               <input
//                 type="text"
//                 placeholder="Enter Subject"
//                 className="lib-input"
//                 value={searchSubject}
//                 onChange={(e) => setSearchSubject(e.target.value)}
//               />
//             </Col>
//           </Row>
//           <Button variant="primary" size="sm" onClick={handleSearch}>Search</Button>

//           {uniqueClassNames.map(className => (
//             <div key={className}>
//               <h5>Class {className}</h5>
//               <table className="table facultyLibrary">
//                 <thead>
//                   <tr>
//                     <th scope="col">S.no.</th>
//                     <th scope="col">Name</th>
//                     <th scope="col">Marks</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredStudents.filter(student => student.className === className).map((student, index) => (
//                     <tr key={student._id}>
//                       <td>{index + 1}</td>
//                       <td>{student.name}</td>
//                       <td>
//                         {student.examResult.map((result, resultIndex) => (
//                           result.subName.toLowerCase() === searchSubject.toLowerCase() ? (
//                             <div key={resultIndex}>{result.marksObtained}</div>
//                           ) : null
//                         ))}
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ))}
//         </Paper>
//       </Container>
//     </>
//   );
// }

// export default ResultList;
