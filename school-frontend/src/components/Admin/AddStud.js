import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { Button, Col, Container, Row, Form } from 'react-bootstrap';
import { Paper } from '@mui/material';
import { studentRegister } from '../ApiSerives';

const AddStudent = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        className: "",
        password: "",
        section: "",
        rollNum: "",
        phone: "",
        image: null,
        parentsContact: ""
    });

    const handleOnChange = (e) => {
        const { name, type, files, value } = e.target;
        if (type === 'file') {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        try {
            const response = await studentRegister(formDataToSend);
            console.log('Student registered successfully:', response.data);
            alert("Student saved successfully");
        } catch (error) {
            console.error(error);
            alert("Failed to save student");
        }
    };

    return (
        <>
            <AdminSidebar />
            <Container className='content-container'>
                <div className='add-head'>
                    <h5>Add Student</h5>
                </div>
                <Paper elevation={2} className="content-paper">
                    <form onSubmit={handleSubmit}>
                        <Row>
                            <Col lg={6}>
                                <Form.Group controlId='name'>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type="text" onChange={handleOnChange} name='name' value={formData.name}></Form.Control>
                                </Form.Group>
                                <Form.Group controlId='email'>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" onChange={handleOnChange} name='email' value={formData.email}></Form.Control>
                                </Form.Group>
                                <Form.Group controlId='className'>
                                    <Form.Label>Class</Form.Label>
                                    <Form.Control type="text" onChange={handleOnChange} name='className' value={formData.className}></Form.Control>
                                </Form.Group>
                                <Form.Group controlId='password'>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="text" onChange={handleOnChange} name='password' value={formData.password}></Form.Control>
                                </Form.Group>
                                <Form.Group controlId='image'>
                                    <Form.Label>Upload Image</Form.Label>
                                    <Form.Control type="file" onChange={handleOnChange} name='image'></Form.Control>
                                </Form.Group>
                            </Col>
                            <Col lg={6}>
                                <Form.Group controlId='section'>
                                    <Form.Label>Section</Form.Label>
                                    <Form.Control type="text" onChange={handleOnChange} name='section' value={formData.section}></Form.Control>
                                </Form.Group>
                                <Form.Group controlId='rollNum'>
                                    <Form.Label>Roll Number</Form.Label>
                                    <Form.Control type="text" onChange={handleOnChange} name='rollNum' value={formData.rollNum}></Form.Control>
                                </Form.Group>
                                <Form.Group controlId='phone'>
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control type="text" onChange={handleOnChange} name='phone' value={formData.phone}></Form.Control>
                                </Form.Group>
                                <Form.Group controlId='parentsContact'>
                                    <Form.Label>Parents Contact</Form.Label>
                                    <Form.Control type="text" onChange={handleOnChange} name='parentsContact' value={formData.parentsContact}></Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button variant="primary" style={{ margin: "10px", padding: "6px" }} type='submit'>Save Student</Button>
                    </form>
                </Paper>
            </Container>
        </>
    );
};

export default AddStudent;