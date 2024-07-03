import React, { useEffect, useState } from "react";
import FacultySidebar from "./FacultySidebar";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Paper } from "@mui/material";
import { getStudents, saveAttendance } from "../ApiSerives";

const Attendance = () => {
  const [studentsData, setStudentsData] = useState([]);
  const [className, setClassName] = useState("");
  const [section, setSection] = useState("");
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [selectedStudents, setSelectedStudents] = useState({});

  const fetchStudents = async (className, section) => {
    try {
      const response = await getStudents(className, section);
      setStudentsData(response.data.filter(student => student.className === className && student.section === section));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (className && section) {
      fetchStudents(className, section);
    }
  }, [className, section]);

  const handleCheckboxChange = (studentId) => {
    setSelectedStudents(prevState => ({
      ...prevState,
      [studentId]: !prevState[studentId]
    }));
  };

  const handleSaveAttendance = async () => {
    const isValidDate = (dateString) => {
      const dateObj = new Date(dateString);
      return !isNaN(dateObj.getTime());
    };
    if (!isValidDate(date)) {
      alert("Please select a valid date");
      return;
    }
    const attendanceData = studentsData.map(student => ({
      studentId: student._id,
      date,
      subject,
      status: selectedStudents[student._id] ? "Present" : "Absent",
      className,
      section,
    }));

    console.log(attendanceData);

    try {
      await saveAttendance(attendanceData);
      alert("Attendance saved successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to save attendance");
    }
  };

  return (
    <>
      <div className="attendance-layout">
        <FacultySidebar />
        <Container className="content-container">
          <Paper elevation={2} className="content-paper">
            <Form>
              <Row>
                <Col lg={3}>
                  <Form.Group>
                    <Form.Label>Select Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col lg={3}>
                  <Form.Group id="class">
                    <Form.Label>Class</Form.Label>
                    <Form.Select
                      className="inputs"
                      value={className}
                      onChange={(e) => setClassName(e.target.value)}
                    >
                      <option>Select an option</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col lg={3}>
                  <Form.Group id="section">
                    <Form.Label>Section</Form.Label>
                    <Form.Select
                      className="inputs"
                      value={section}
                      onChange={(e) => setSection(e.target.value)}
                    >
                      <option>Select an option</option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col lg={3}>
                  <Form.Group id="class">
                    <Form.Label>Subject</Form.Label>
                    <Form.Select
                      className="inputs"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    >
                      <option>Select an option</option>
                      <option value="Hindi">Hindi</option>
                      <option value="English">English</option>
                      <option value="Maths">Maths</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Paper>
          <Paper elevation={2} className="content-paper">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>S.no.</th>
                  <th>Student Name</th>
                  <th>Select</th>
                </tr>
              </thead>
              <tbody>
                {studentsData.map((student, index) => (
                  <tr key={student._id}>
                    <td>{index + 1}</td>
                    <td>{student.name}</td>
                    <td style={{ display: "flex", justifyContent: "center" }}>
                      <Form.Check
                        type="checkbox"
                        checked={!!selectedStudents[student._id]}
                        onChange={() => handleCheckboxChange(student._id)}
                      ></Form.Check>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Button
              variant="success"
              style={{ margin: "10px", padding: "6px" }}
              onClick={handleSaveAttendance}
            >
              Save Attendance
            </Button>
          </Paper>
        </Container>
      </div>
    </>
  );
};

export default Attendance;
