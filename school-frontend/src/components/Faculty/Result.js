import React, { useEffect, useState } from "react";
import FacultySidebar from "./FacultySidebar";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Paper } from "@mui/material";
import { getStudents, saveResult } from "../ApiSerives";

const Result = () => {
  const [className, setClassName] = useState("");
  const [section, setSection] = useState("");
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [formData, setFormData] = useState({
    subName: "",
    subCode: "",
  });
  const [marks, setMarks] = useState({});
  const [grades, setGrades] = useState({});

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getStudents();
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    if (className && section) {
      const fetchFilteredStudents = async () => {
        try {
          const response = await getStudents(className, section);
          setFilteredStudents(
            response.data.filter(
              (student) => student.className === className && student.section === section
            )
          );
        } catch (error) {
          console.log(error);
        }
      };
      fetchFilteredStudents();
    }
  }, [className, section]);

  const handleFormDataChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMarksChange = (studentId, value) => {
    setMarks((prevMarks) => ({
      ...prevMarks,
      [studentId]: value,
    }));
  };

  const handleGradesChange = (studentId, value) => {
    setGrades((prevGrades) => ({
      ...prevGrades,
      [studentId]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { subName, subCode } = formData;
    const results = filteredStudents.map((student) => ({
      studentId: student._id,
      subName,
      subCode,
      marksObtained: marks[student._id] || 0,
      grade: grades[student._id] || "",
    }));

    try {
      const response = await saveResult(results);
      console.log(response.data);
      alert("Result saved successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to save Results");
    }
  };

  return (
    <>
      <FacultySidebar />
      <Container className="content-container">
        <Form onSubmit={handleSubmit}>
          <Paper elevation={2} className="content-paper">
            <Form>
              <Row>
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
                  <Form.Group id="subject">
                    <Form.Label>Subject</Form.Label>
                    <Form.Select
                      className="inputs"
                      name="subName"
                      value={formData.subName}
                      onChange={handleFormDataChange}
                    >
                      <option>Select an option</option>
                      <option value="Hindi">Hindi</option>
                      <option value="English">English</option>
                      <option value="Maths">Maths</option>
                      <option value="Science">Science</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col lg={3}>
                  <Form.Group id="subjectCode">
                    <Form.Label>Subject Code</Form.Label>
                    <Form.Select
                      className="inputs"
                      name="subCode"
                      value={formData.subCode}
                      onChange={handleFormDataChange}
                    >
                      <option>Select an option</option>
                      <option value="H-105">H-105</option>
                      <option value="E-102">E-102</option>
                      <option value="M-101">M-101</option>
                      <option value="S-103">S-103</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            </Form>
            <table className="table table-bordered mt-5">
              <thead>
                <tr>
                  <th>S.no.</th>
                  <th>Student Name</th>
                  <th>Marks</th>
                  <th>Grade</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => (
                  <tr key={student._id}>
                    <td>{index + 1}</td>
                    <td>{student.name}</td>
                    <td>
                      <input
                        type="number"
                        onChange={(e) => handleMarksChange(student._id, e.target.value)}
                        value={marks[student._id] || ""}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        onChange={(e) => handleGradesChange(student._id, e.target.value)}
                        value={grades[student._id] || ""}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Button
              variant="success"
              style={{ margin: "10px", padding: "6px" }}
              type="submit"
            >
              Save Result
            </Button>
          </Paper>
        </Form>
      </Container>
    </>
  );
};

export default Result;
