import React, { useState } from 'react'
import AdminSidebar from './AdminSidebar'
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Paper } from '@mui/material'
import { saveNotice } from '../ApiSerives';

const Notice = () => {
  const [formData, setFormData] = useState({
    title: "",
    by:"",
    content:"",
    date:"",
    file: null
  })
  const handleOnChange = (e) => {
    if (e.target.type === 'file') {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const schlId = "667d6b97e161d9f17e15193d";
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      const response = await saveNotice(schlId, formDataToSend);
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
        <AdminSidebar/>
        <Container className='content-container'>
        <div className='add-head'>
                <h5> Create Notice</h5>
            </div>
            <Paper elevation={2} className="content-paper">
                <form onSubmit={handleSubmit}>
                    <Row>
                        <Col lg={6}>
                            <Form.Group controlId='title'>
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" onChange={handleOnChange} name='title' value={formData.title}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId='by'>
                                <Form.Label>Notice By</Form.Label>
                                <Form.Control type="text" onChange={handleOnChange} name='by' value={formData.by}></Form.Control>
                            </Form.Group>
                          </Col>
                          <Col lg={6}>
                          <Form.Group controlId='date'>
                                <Form.Label>Date</Form.Label>
                                <Form.Control type="date" onChange={handleOnChange} name='date' value={formData.date}></Form.Control>
                            </Form.Group>
                           
                           <Form.Group controlId='file'>
                            <Form.Label>Document</Form.Label>
                            <Form.Control type='file' onChange={handleOnChange} name='file'></Form.Control>
                           </Form.Group>
                        </Col>
                        <Form.Group controlId='content'>
                                <Form.Label>Content</Form.Label>
                                <Form.Control  as="textarea" className="resizable-textarea inputs"  type="text" onChange={handleOnChange} name='content' value={formData.content}></Form.Control>
                            </Form.Group>
                    </Row>
                    <Button variant="primary" style={{ margin: "10px", padding: "6px" }} type='submit'>Submit</Button>
                </form>
            </Paper>
        </Container>
    </>
  )
}

export default Notice
