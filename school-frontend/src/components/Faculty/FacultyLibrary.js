import React, { useState, useEffect } from "react";
import FacultySidebar from "./FacultySidebar";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { Paper } from "@mui/material";
import { deleteBook, getStudents, saveLibrary } from "../ApiSerives";
import { useUser } from "../UserContext";

const Library = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchClass, setSearchClass] = useState('');
  const [searchRollNo, setSearchRollNo] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [bookDetails, setBookDetails] = useState({
    title: '',
    accesionNo: '',
    issueDate: '',
    dueDate: ''
  });

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getStudents();
        const students = response.data;
        setStudents(students);
        setFilteredStudents(students);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);

  const handleSearch = () => {
    let filtered = students;
    if (searchClass) {
      filtered = filtered.filter(student => student.className === searchClass);
    }
    if (searchRollNo) {
      filtered = filtered.filter(student => student.rollNum === searchRollNo);
    }
    setFilteredStudents(filtered);
  };

  const handleClose = () => {
    setModalShow(false);
    setBookDetails({
      title: '',
      accesionNo: '',
      issueDate: '',
      dueDate: ''
    });
  }

  const handleBookDetailChange = (e) => {
    const { name, value } = e.target;
    setBookDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
    }));
  }

  const handleIssueBook = async (e) => {
    e.preventDefault();
    const bookIssueData = {
      studentId: selectedStudent._id,
      ...bookDetails,
    };
    try {
      const response = await saveLibrary(bookIssueData);
      console.log(response.data);
      alert("Book issued successfully");
      handleClose();
    } catch (error) {
      console.log(error);
      alert("Failed to issue book");
    }
  };

  const handleDelete = async (bookId, studentId) => {
    try {
      await deleteBook(bookId, studentId);
      alert('Book returned successfully');
      setStudents(prevStudents => 
        prevStudents.map(student => 
          student._id === studentId 
          ? { ...student, library: student.library.filter(book => book._id !== bookId) } 
          : student
        )
      );
    } catch (error) {
      console.error('Failed to return book:', error);
      alert('Failed to return book');
    }
  };

  const handleModal = (student) => {
    setSelectedStudent(student);
    setModalShow(true);
  }

  const uniqueClassNames = [...new Set(filteredStudents.map(student => student.className))];

  return (
    <>
      <FacultySidebar />
      <Container className="content-container">
        <Paper elevation={0} className="content-paper">
          <h4>Manage Student Details</h4>
          <Row>
            <Col>
              <label className="label">Class</label>
              <input
                type="number"
                placeholder="Enter class"
                className="lib-input"
                value={searchClass}
                onChange={(e) => setSearchClass(e.target.value)}
              />
            </Col>
            <Col>
              <label className="label">Roll No.</label>
              <input
                type="text"
                placeholder="Enter Roll No."
                className="lib-input"
                value={searchRollNo}
                onChange={(e) => setSearchRollNo(e.target.value)}
              />
            </Col>
          </Row>
          <Button variant="primary" size="sm" onClick={handleSearch}>Search</Button>

          {uniqueClassNames.map(className => (
            <div key={className}>
              <h5>Class {className}</h5>
              <table className="table facultyLibrary">
                <thead>
                  <tr>
                    <th scope="col">S.no.</th>
                    <th scope="col">Name</th>
                    <th scope="col">Roll No.</th>
                    <th scope="col">Class</th>
                    <th>Edit</th>
                    <th>Issued Books</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.filter(student => student.className === className).map((student, index) => (
                    <tr key={student._id}>
                      <td>{index + 1}</td>
                      <td>{student.name}</td>
                      <td>{student.rollNum}</td>
                      <td>{student.className}</td>
                      <td>
                        <Button variant="info" size="sm" style={{ marginRight: "10px" }} onClick={() => handleModal(student)}>Issue</Button>
                       
                      </td>
                      <td>
                      {student.library.map((book, bookIndex) => (
                          <div key={bookIndex}>{book.title}  <Button variant="success" size="sm" className="mt-1" onClick={() => handleDelete(book._id,student._id)}>Return</Button></div>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </Paper>

        <Modal show={modalShow} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>
              <h5>Fill the Details</h5>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group as={Row} className="mb-3" controlId="formBookTitle">
                <Form.Label column sm="3">Book Title:</Form.Label>
                <Col sm="9">
                  <Form.Control type="text" placeholder="Enter book title" name="title" value={bookDetails.title} onChange={handleBookDetailChange} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formAccessionNo">
                <Form.Label column sm="3">Accession No.:</Form.Label>
                <Col sm="9">
                  <Form.Control type="text" placeholder="Enter accession number" name="accesionNo" value={bookDetails.accesionNo} onChange={handleBookDetailChange} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formIssueDate">
                <Form.Label column sm="3">Issue Date:</Form.Label>
                <Col sm="9">
                  <Form.Control type="date" name="issueDate" value={bookDetails.issueDate} onChange={handleBookDetailChange} />
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formDueDate">
                <Form.Label column sm="3">Return Date:</Form.Label>
                <Col sm="9">
                  <Form.Control type="date" name="dueDate" value={bookDetails.dueDate} onChange={handleBookDetailChange} />
                </Col>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleIssueBook}>Issue Book</Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </>
  );
};

export default Library;
