import React, { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { Col, Container, Row } from 'react-bootstrap';
import { Paper } from '@mui/material';
import { getFaculty, getStudents, getSchoolData } from '../ApiSerives';
import Calendar from 'react-calendar';
import "react-calendar/dist/Calendar.css";

const Dashboard = () => {
  const [studentCount, setStudentCount] = useState(0);
  const [facultyCount, setFacultyCount] = useState(0);
  const [notices, setNotices] = useState([]);
  const [date, setDate] = useState(new Date());
  const [expandedNotice, setExpandedNotice] = useState(null);

  const toggleNotice = (index) => {
    setExpandedNotice(expandedNotice === index ? null : index);
  };
  const onChange = date => {
    setDate(date);
  };


  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await getStudents();
        setStudentCount(response.data.length);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchFaculty = async () => {
      try {
        const response = await getFaculty();
        setFacultyCount(response.data.length);
      } catch (error) {
        console.error(error);
      }
    };

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

    fetchStudent();
    fetchFaculty();
    fetchNotices();
  }, []);

  return (
    <>
      <AdminSidebar />
      <Container className="content-container">
        <Paper elevation={0} className='content-paper' style={{backgroundColor:"#f0f9ff"}}>
          <Row>
            <Col lg={4}>
              <div>
                <Calendar onChange={onChange} value={date} />
              </div>
            </Col>
            <Col lg={3}>
              <Paper elevation={2} className="adminbox1">
                <h3 style={{ alignItems: "center" }}>{studentCount}</h3>
                <h6>Total Number of Students</h6>
              </Paper>
            </Col>
            <Col lg={3}>
              <Paper elevation={2} className="adminbox2">
                <h3 style={{ alignItems: "center" }}>{facultyCount}</h3>
                <h6>Total Number of Faculties</h6>
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
                            <p>{notice.file ? <a href={notice.file} target='_blank'>View Notice</a> : ''}</p>
                            <p>{notice.content}</p>
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

export default Dashboard