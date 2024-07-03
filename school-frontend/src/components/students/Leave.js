import React, { useEffect, useState } from 'react';
import StudSidebar from './studSidebar';
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import { Paper } from '@mui/material';
import { getStudentById, saveLeave } from '../ApiSerives';
import { useUser } from '../UserContext';

const Leave = () => {
  const [ student, setStudent] = useState({ leaves: []});
  const {user} = useUser();
  const [formData, setFormData] = useState({ 
    name:'',
    class:'',
    startDate: '',
    endDate: '',
    totalNumber: '',
    file: null, 
    reason: ''
  });
  const studentId = user?.id;
 
useEffect(() => {
  const fetchStudent= async () => {
    try {
      const response = await getStudentById(studentId);
      setStudent(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  if(studentId){
    fetchStudent();
  }
},{studentId})

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      const response = await saveLeave(user.id, formDataToSend);
      if (response.data) {
        alert('Leave application submitted successfully!');
      }
    } catch (error) {
      console.log(error);
      alert('Application not sent');
    }
  };

  return (
    <>
      <StudSidebar />
      <Container className="content-container">
        <Paper elevation={0} className='content-paper'>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h5>Leave Application</h5>
          </div>

          <hr style={{ color: "black", border: "2px solid", marginTop: "0px" }}></hr>
          <div className="enquiry-form mb-5">
            <Form onSubmit={handleSubmit} encType="multipart/form-data">
              <Row className="mb-4">
              <Col lg={4} md={6}>
                  <Form.Group controlId="name">
                    <Form.Label style={{ marginLeft: "10px" }}>Student Name</Form.Label>
                    <Form.Control type="text" name="name" className="inputs" onChange={handleChange} />
                  </Form.Group>
                </Col>
                <Col lg={4} md={6}>
                  <Form.Group controlId="startDate">
                    <Form.Label style={{ marginLeft: "10px" }}>Leave Start Date</Form.Label>
                    <Form.Control type="date" name="startDate" className="inputs" onChange={handleChange} />
                  </Form.Group>
                </Col>
                <Col lg={4} md={6}>
                  <Form.Group controlId="endDate">
                    <Form.Label style={{ marginLeft: "10px" }}>Leave End Date</Form.Label>
                    <Form.Control type="date" name="endDate" className="inputs" onChange={handleChange}></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mb-4">
                <Col lg={3} md={6}>
                  <Form.Group controlId="totalNumber">
                    <Form.Label style={{ marginLeft: "10px" }}>Total Number of Days</Form.Label>
                    <Form.Control type="number" name="totalNumber" className="inputs" onChange={handleChange} />
                  </Form.Group>
                </Col>
                <Col lg={3} md={6}>
                  <Form.Group controlId="class">
                    <Form.Label style={{ marginLeft: "10px" }}>Class</Form.Label>
                    <Form.Control type="number" name="class" className="inputs" onChange={handleChange} />
                  </Form.Group>
                </Col>
                <Col lg={4} md={12}>
                  <Form.Group controlId="file">
                    <Form.Label style={{ marginLeft: "10px" }}>Attachment</Form.Label>
                    <Form.Control type="file" name="file" className="inputs" onChange={handleChange} />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="reason">
                    <Form.Label style={{ marginLeft: "10px" }}>Leave Reason</Form.Label>
                    <Form.Control as="textarea" name="reason" className="resizable-textarea inputs" onChange={handleChange} />
                  </Form.Group>
                </Col>
              </Row>
              <hr></hr>
              <Button variant="primary" type="submit">Submit</Button>
            </Form>
          </div>
          <h5>List of Applications</h5>
          <table className='table facultyLibrary'>
            <thead>
              <tr>
              <th>Leave Date</th>
              <th>Document</th>
              <th>Status</th>
              </tr> 
            </thead>
            <tbody>
             {student.leaves.map((record, index) => (
                <tr key={record._id}>
                  <td>Start date: {new Date(record.startDate).toLocaleDateString()}<br/> End Date: {new Date(record.endDate).toLocaleDateString()}</td>
                  <td>{record.file ? <a href={record.file} target='_blank'>View File</a> : 'No file'}</td>
                  <td>{record.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Paper>
      </Container>
    </>
  );
};

export default Leave;