import React, { useEffect, useState } from 'react'
import StudSidebar from './studSidebar'
import { Col, Container, Row } from 'react-bootstrap'
import { Paper } from '@mui/material'
import { useUser } from '../UserContext'
import { getStudentById } from "../ApiSerives";
import { ImLibrary } from "react-icons/im";

const StudLibrary = () => {
  
  const[student, setStudent] = useState({ library :[]});
  const { user } = useUser();
  const studentId = user?.id;

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await getStudentById(studentId);
        console.log(studentId);
        setStudent(response.data); 
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching student:", error);
      }
    };

    if (studentId) {
      fetchStudent();
    }
  }, [studentId]);
  const calculateDueDate = (issueDate) => {
    const dueDate = new Date(issueDate);
    dueDate.setDate(dueDate.getDate() + 20); 
    return dueDate.toLocaleDateString();
  };
  return (
    <>
    <StudSidebar/>
    <h2 style={{display:"flex",alignItems:"center",justifyContent:"center"}}><ImLibrary style={{marginRight:"10px"}} />Library</h2>
    <hr className='mb-0 mt-2'></hr>
    <Container className='content-container'>
      <Paper className='content-paper' elevation={0}>
       
      
    <Row>

      {/* <Col>
        <Row>
          <h5 style={{padding:"10px"}}>Regular Due Amount</h5>
        </Row>
        <Row><h6 style={{margin:"10px"}}>Over Due: Rs. {student.library[0]?.overDue}</h6></Row>
        <Row><h6 style={{margin:"10px"}}>Fine Recieved: Rs. {student.library[0]?.totalFine}</h6></Row>
        </Col> */}
  
      <h4>Issued Items Details</h4>
        <table className="table-bordered libraryTable">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Book Title</th>
              <th>Accesion No.</th>
              <th>Issue Date</th>
              <th>Due Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
          
            {student.library.map((record, index) => (
                    <tr key={record._id}>
                      <td>{index + 1}</td>
                      <td>{record.title}</td>
                      <td>{record.accesionNo}</td>
                      <td>{new Date(record.issueDate).toLocaleDateString()}</td>
                      <td>{calculateDueDate(record.issueDate)}</td>
                      <td>{record.status ? "Issued" : "Returned"}</td>
                    </tr>
                  ))}
          </tbody>
        </table>

    </Row>
      </Paper>
    </Container>
    </>
  )
}

export default StudLibrary
