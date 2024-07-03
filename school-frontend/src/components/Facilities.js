import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import NavigationBar from "./Navbar";
import Footer from "./Footer";
import backgroundImage from "../images/bg.jpg";
const Facilities = () => {
    const img = new URL("../images/facilities.png", import.meta.url);
    
  return (
    <>
      <NavigationBar />
      <div
        style={{
          backgroundImage: `url(${backgroundImage})`,
          overflowX:"hidden",
          backgroundPosition: "center",
          height: "30vh",
          width: "98.9vw",
          backgroundSize: "cover",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      ><div>
      <span className="bg-text">FACILITIES</span>  
      </div></div>
      <hr style={{border:"10px solid orange",marginTop:"-5px", zIndex:"10"}}></hr>  
      <Container>

        <Row className="justify-content-center " style={{ minHeight: '80vh' }}>
          <Col lg={8} className="description">
            <p className="mb-4">
              The school provides suitable learning spaces which include
              spacious and refurbished buildings with well-ventilated
              classrooms, creating the right ambience to facilitate learning.
              Other facilities include:
            </p>
            <ul className="tick-list">
              <li>Attractive and engaging classrooms with learning aids</li>
              <li>Resource bank for students and teachers</li>
              <li>Well-equipped Laboratories</li>
            </ul>
            <p className="mb-4">
              At Dream India School, technology is an integral part of the
              system. Our schools are equipped with
            </p>
            <ul className="tick-list">
              <li> Digital Classroom enabled with multimedia content.</li>
              <li> Computer Lab with Internet Facility</li>
              <li>CCTV Surveillance System</li>
              <li>Online School Management ERP Solution</li>
            </ul>
           
          </Col>
          <Col lg={4}>
            <img src={img} alt="facilties" className="facility-img"></img>
          </Col>
        </Row>
      </Container>
      <Footer/>
    </>
  );
};

export default Facilities;
