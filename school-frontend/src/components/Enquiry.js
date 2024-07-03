import React from "react";
import NavigationBar from "./Navbar";
import { Col, Container, Form, Row, Button } from "react-bootstrap";
import Footer from "./Footer";


const Enquiry = () => {
  return (
    <>
      <NavigationBar />
      <Container className="mb-5">
        <div style={{ textAlign: "center", marginTop: "20px"}}>
          <button className="enquiry-btn">Enquiry</button>
        </div>
        <hr
          style={{ color: "orange", border: "2px solid", marginTop: "0px" }}
        ></hr>
        <div className="enquiry-form">
          <form>
            <h5 className="mt-3 mb-3">Enquiry Form</h5>
            <Row className="mb-4">
              <Col lg={5} md={12}>
                <Form.Group controlId="studentName">
                  <Form.Label style={{marginLeft:"10px"}}>Name of Student <span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Control type="text" className="inputs" />
                </Form.Group>
              </Col>
              <Col lg={3} md={6}>
                <Form.Group controlId="age">
                  <Form.Label style={{marginLeft:"10px"}}>Age <span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Control type="number" className="inputs" />
                </Form.Group>
              </Col>
              <Col lg={3} md={6}>
                <Form.Group controlId="class">
                  <Form.Label style={{marginLeft:"10px"}}>Select a class <span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Select className="inputs">
                    <option>Select an option</option>
                    <option value="1">Grade 1</option>
                    <option value="2">Grade 2</option>
                    <option value="3">Grade 3</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col lg={3} md={6}>
                <Form.Group controlId="city">
                  <Form.Label style={{marginLeft:"10px"}}>City</Form.Label>
                  <Form.Control type="text" className="inputs" />
                </Form.Group>
              </Col>
              <Col lg={3} md={6}>
                <Form.Group controlId="mobile">
                  <Form.Label style={{marginLeft:"10px"}}>Mobile No. <span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Control type="number" className="inputs" />
                </Form.Group>
              </Col>
              <Col lg={5} md={12}>
                <Form.Group controlId="email">
                  <Form.Label style={{marginLeft:"10px"}}>Email id <span style={{ color: "red" }}>*</span></Form.Label>
                  <Form.Control type="email" className="inputs" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="enquiry">
                  <Form.Label style={{marginLeft:"10px"}}>Enquiry</Form.Label>
                  <Form.Control as="textarea" className="resizable-textarea inputs"  type="text" />
                </Form.Group>
              </Col>
            </Row>
            <hr></hr>
            <Button variant="primary">Submit</Button>
          </form>
        </div>
      </Container>
      <Footer></Footer>
    </>
  );
};

export default Enquiry;
