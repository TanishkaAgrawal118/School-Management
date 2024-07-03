import React, { useEffect, useState } from "react";
import FacultySidebar from "./FacultySidebar";
import { Col, Container, Row } from "react-bootstrap";
import { Paper } from "@mui/material";
import { getFaculty, getFacultyById, getSchoolData } from "../ApiSerives";
import Calendar from "react-calendar";
import { useUser } from "../UserContext";

const FacultyDash = () => {
  const [faculty, setFaculty] = useState({});
  const [date, setDate] = useState(new Date());
  const { user } = useUser();
  const facultyId = user?.id;
  const [subCount, setSubCount] = useState(0);
  const [classCount, setClassCount] = useState(0);
  const [notices, setNotices] = useState([]);
  const [expandedNotice, setExpandedNotice] = useState(null);

  const toggleNotice = (index) => {
    setExpandedNotice(expandedNotice === index ? null : index);
  };

  const onChange = (date) => {
    setDate(date);
  };

  useEffect(() => {
   
    const fetchNotices = async () => {
      try {
        const response = await getSchoolData();
        const schoolData = response.data;
        if (schoolData.length > 0) {
          setNotices(schoolData[0].notices);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchNotices();
  }, []);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const response = await getFacultyById(facultyId);
        setFaculty(response.data);
        setSubCount(response.data.subject.length);
        setClassCount(response.data.classes.length);
      } catch (error) {
        console.error(error);
      }
    };
    if (facultyId) {
      fetchFaculty();
    } else {
      console.error("Invalid facultyId:", facultyId);
    }
  }, [facultyId]);
  return (
    <>
      <FacultySidebar />
      <Container className="content-container">
        <Paper elevation={0} className="content-paper">
          <Row>
            <Col lg={4}>
              <Paper className="profile">
                <Row>
                  <Col lg={6}>
                    <img src={faculty.image} alt="profile"></img>
                  </Col>
                  <Col lg={6}>
                    <h5>{faculty.name}</h5>
                  </Col>
                </Row>
                <Row>
                  <p>Email: {faculty.email}</p>
                  <p>Phone: {faculty.phone}</p>
                </Row>
              </Paper>
            </Col>

          
            <Col lg={3}>
            <Paper elevation={2} className="adminbox2" >
              <h3 style={{ alignItems: "center" }}>{subCount}</h3>
              <h6>Total Number of Subjects</h6>
            </Paper>
            </Col>
            <Col lg={3}>
            <Paper elevation={2} className="adminbox1" >
              <h3 style={{ alignItems: "center" }}>{classCount}</h3>
              <h6>Total Number of Classes</h6>
            </Paper>
            </Col>
          </Row>

          <Row>
          <Col lg={4}>
              <div>
                <Calendar onChange={onChange} value={date}></Calendar>
              </div>
            </Col>

            <Col>
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

export default FacultyDash;
