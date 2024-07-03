import React from 'react'
import NavigationBar from './Navbar'
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import Footer from "./Footer";

const Feedback = () => {
  return (
    <>
        <NavigationBar/>
        <Container>
        <div style={{ textAlign: "center", marginTop: "20px"}}>
          <button className="enquiry-btn">Feedback</button>
        </div>
        <hr
          style={{ color: "orange", border: "2px solid", marginTop: "0px" }}
        ></hr>


        <div className="enquiry-form">
          <form>
            <h5 className="mt-3 mb-3">Feedback Form</h5>
            <Row className="mb-4">
              <Col lg={6} md={12}>
                <Form.Group controlId="studentName">
                  <Form.Label style={{marginLeft:"10px"}}>Name <span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Control type="text" className="inputs" />
                </Form.Group>
              </Col>
              <Col lg={6} md={6}>
                <Form.Group controlId="age">
                  <Form.Label style={{marginLeft:"10px"}}>City<span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Control type="text" className="inputs" />
                </Form.Group>
              </Col>  
            </Row>
            <Row className="mb-4">
              <Col lg={6} md={6}>
                <Form.Group controlId="city">
                  <Form.Label style={{marginLeft:"10px"}}>Mobile No. <span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Control type="number" className="inputs" />
                </Form.Group>
              </Col>
              <Col lg={6} md={6}>
                <Form.Group controlId="mobile">
                  <Form.Label style={{marginLeft:"10px"}}>Email id <span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Control type="emai" className="inputs" />
                </Form.Group>
              </Col>
             
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="enquiry">
                  <Form.Label style={{marginLeft:"10px"}}>Feedback / suggestions</Form.Label>
                  <Form.Control as="textarea" className="resizable-textarea inputs"  type="text" />
                </Form.Group>
              </Col>
            </Row>
            <hr></hr>
            <Button variant="primary">Submit</Button>
          </form>
        </div>
        </Container>
        <Footer/>
    </>
  )
}

export default Feedback
