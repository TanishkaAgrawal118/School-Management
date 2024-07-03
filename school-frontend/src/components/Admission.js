import React from 'react'
import NavigationBar from './Navbar'
import backgroundImage from "../images/bg.jpg";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import Footer from "./Footer";


const Admission = () => {
  return (
    <>
        <NavigationBar />
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          overflowX: "hidden",
          backgroundPosition: "center",
          height: "30vh",
          width: "98.9vw",
          backgroundSize: "cover",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div>
          <span className="bg-text">ADMISSION</span>
        </div>
      </div>
      <hr
        style={{ border: "10px solid orange", marginTop: "-5px", zIndex: "10" }}
      ></hr>

        <Container className="mb-5">
        <hr
          style={{ color: "orange", border: "2px solid", marginTop: "0px" }}
        ></hr>
        <div className="enquiry-form">
          <form>
            <h5 className="mt-3 mb-3">Admission Enquiry</h5>
            <Row className="mb-4">
                <Col lg={6}>
                <Form.Group controlId="class">
                  <Form.Label style={{marginLeft:"10px"}}>Academic Year <span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Select className="inputs">
                    <option>Select an option</option>
                    <option value="1">2024-2025</option>
                    <option value="2">2023-2024</option>
                  </Form.Select>
                </Form.Group>
                </Col>
                <Col lg={6}>
                <Form.Group controlId="class">
                  <Form.Label style={{marginLeft:"10px"}}>Class/Standard <span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Select className="inputs">
                    <option>Select an option</option>
                    <option value="1">Grade 1</option>
                    <option value="2">Grade 2</option>
                    <option value="3">Grade 3</option>
                  </Form.Select>
                </Form.Group>
                </Col>
                <hr className='mt-4'></hr>
                <h5 className="mt-3 mb-3">Personal information of Child</h5>
              <Col lg={5} md={12}>
                <Form.Group controlId="studentName">
                  <Form.Label style={{marginLeft:"10px"}}>Name of Student <span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Control type="text" className="inputs" />
                </Form.Group>
              </Col>
              <Col lg={3} md={6}>
                <Form.Group controlId="age">
                  <Form.Label style={{marginLeft:"10px"}}>Date of Bith<span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Control type="date" className="inputs" />
                </Form.Group>
              </Col>
              
            </Row>
            <Row className="mb-4">
              <Col lg={3} md={6}>
                <Form.Group controlId="city">
                  <Form.Label style={{marginLeft:"10px"}}>Place of birth</Form.Label>
                  <Form.Control type="text" className="inputs" />
                </Form.Group>
              </Col>
              <Col lg={3} md={6}>
                <Form.Group controlId="mobile">
                  <Form.Label style={{marginLeft:"10px"}}>Nationality </Form.Label>
                  <Form.Control type="text" className="inputs" />
                </Form.Group>
              </Col>
              <Col lg={5} md={12}>
                <Form.Group controlId="email">
                  <Form.Label style={{marginLeft:"10px"}}>Age <span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Control type="number" className="inputs" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="enquiry">
                  <Form.Label style={{marginLeft:"10px"}}><span className="mt-3 mb-3">Name of the present school, if any</span></Form.Label>
                  <Form.Control type="text" className='inputs' />
                </Form.Group>
              </Col>
            </Row>
            <hr></hr>
            <h5 className="mt-3 mb-3">Contact Information</h5>
            <Row>
                <Col lg={6}>
                <Form.Group controlId="fatherName">
                  <Form.Label style={{marginLeft:"10px"}}>Father Name<span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Control type="text" className="inputs" />
                </Form.Group>
                </Col>
                <Col lg={6}>
                <Form.Group controlId="motherName">
                  <Form.Label style={{marginLeft:"10px"}}>Mother Name<span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Control type="text" className="inputs" />
                </Form.Group>
                </Col>
            </Row>
            <Row className='mt-3'>
                <Col lg={4}>
                <Form.Group controlId="mobile">
                  <Form.Label style={{marginLeft:"10px"}}>Mobile No. <span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Control type="text" className="inputs" />
                </Form.Group>
                </Col>
                <Col lg={4}>
                <Form.Group controlId="alternate">
                  <Form.Label style={{marginLeft:"10px"}}>Alternate Mobile Number</Form.Label>
                  <Form.Control type="text" className="inputs" />
                </Form.Group>
                </Col>
                <Col lg={4}>
                <Form.Group controlId="email">
                  <Form.Label style={{marginLeft:"10px"}}>Email-Id <span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Control type="email" className="inputs" />
                </Form.Group>
                </Col>
            </Row>

            <Row className='mt-3 mb-4'>
                <Col lg={4}>
                <Form.Group controlId="city">
                  <Form.Label style={{marginLeft:"10px"}}>City <span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Control type="text" className="inputs" />
                </Form.Group>
                </Col>
                <Col lg={4}>
                <Form.Group controlId="state">
                  <Form.Label style={{marginLeft:"10px"}}>State <span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Control type="text" className="inputs" />
                </Form.Group>
                </Col>
                <Col lg={4}>
                <Form.Group controlId="pincode">
                  <Form.Label style={{marginLeft:"10px"}}>Pincode<span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Control type="text" className="inputs" />
                </Form.Group>
                </Col>
            </Row>
            <Button variant="primary">Submit</Button>
          </form>
        </div>
      </Container>
      <Footer></Footer>
    </>
  )
}

export default Admission
