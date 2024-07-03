import React, { useEffect, useState } from "react";
import StudSidebar from "./studSidebar";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Paper } from "@mui/material";
import { useUser } from "../UserContext";
import { FeePayment, getSchoolData, getStudentById } from "../ApiSerives";
import { useNavigate } from "react-router-dom";

const StudDashboard = () => {
  const [student, setStudent] = useState({ fees: [], transports: [] });
  const { user } = useUser();
  const studentId = user?.id;
  const [notices, setNotices] = useState([]);
  const [expandedNotice, setExpandedNotice] = useState(null);

  const toggleNotice = (index) => {
    setExpandedNotice(expandedNotice === index ? null : index);
  };

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await getStudentById(studentId);
        setStudent(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    if (studentId) {
      fetchStudent();
    }
  }, [studentId]);

  useEffect(() =>{
    const fetchNotices = async () => {
      try {
        const response = await getSchoolData();
        const schoolData = response.data;
        console.log(response.data);
        if (schoolData.length > 0) {
          setNotices(schoolData[0].notices);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchNotices();
  })


  const navigate = useNavigate();
  const paymentHandler = () => {
    navigate('/stud-fees')
  }

  const calculateTotalFees = (fees) => {
    if (!fees || fees.length === 0) return 0;
    return fees.reduce((total, fee) => {
      return (total +fee.tuition +fee.library +fee.transport +fee.lab +fee.sports +fee.examination +fee.technology);
    }, 0);
  };

  const totalFees = calculateTotalFees(student.fees);
  console.log(totalFees);

  return (
    <>
      <StudSidebar />
      <Container className="content-container" >
        <Paper elevation={0} className="content-paper" style={{backgroundColor:"#f0f9ff"}}>
        <Row>
        <Col lg={4}>
            <Paper elevation={2} className="profile">
              <Row>
                <Col lg={6}>
                  <img src={student.image} alt="profile" ></img>
                </Col>
                <Col lg={6}>
                <h5>{student.name}</h5>
                </Col>
              </Row>
              <Row>
                <p>Class: {student.className} </p>
                <p>Section: {student.section}</p>
                <p>Roll No: {student.rollNum}</p>
                <p>Email: {student.email}</p>
                <p>Phone: {student.phone}</p>
              </Row>
            </Paper>
          </Col>
          <Col lg={4}>
            <Paper elevation={2} className="fees" onClick={paymentHandler}>
              <h5 style={{ alignItems: "center" }}>Regular Due Amount ₹</h5>
              <h2>{totalFees}</h2>
              <h6>To Pay fees Online</h6>
            </Paper>
          </Col>
          <Col lg={4}>
            <Paper elevation={2} className="transport">
            <table>
              <thead>
              <tr>
                <th>Transport Details</th>
              </tr>
            </thead>
            <tbody>
            {student.transports.map((record, index) => (
                <tr key={record._id}>
                  <td>{record.file ? <a href={record.file} target="_blank" rel="noopener noreferrer">View File</a> : 'No file'}</td>
                </tr>
              ))}
            </tbody>
            </table>
            </Paper>
          </Col>
        </Row>
        <Row>
            
            <Col lg={9}>
              <div className='notice'>
                <h5 style={{ textAlign: "center" }}>Notice</h5>
                {notices.length > 0 ? (
                  notices.map((notice, index) => (
                    <div key={index}>
                      <Paper elevation={1} style={{ width: "100%", cursor: "pointer" }} onClick={() => toggleNotice(index)}>
                        <h6>{index + 1} . {notice.title}</h6>
                        {expandedNotice === index && (
                          <div>
                            <p>{notice.content}</p>
                            <p>{notice.file ? <a href={notice.file} target='_blank'>View Notice</a> : ''}</p>
                            <p>By: {notice.by}</p>
                          </div>
                        )}
                      </Paper>
                    </div>
                  ))
                ) : (
                  <p>No notices available</p>
                )}
              </div>
            </Col>
          </Row>
       
        </Paper>
       
      </Container>
    </>
  );
};

export default StudDashboard;



