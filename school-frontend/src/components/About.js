import React from 'react'
import backgroundImage from "../images/bg.jpg";
import NavigationBar from './Navbar';
import { Col, Container, Row } from 'react-bootstrap';
import Footer from './Footer';

const About = () => {
    const img = new URL("../images/about.png",import.meta.url);
  return (
    <>
    <NavigationBar/>
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
          <span className="bg-text">ABOUT</span>
        </div>
      </div>
      <hr
        style={{ border: "10px solid orange", marginTop: "-5px", zIndex: "10" }}
      ></hr>

    <Container>
    <Row className="justify-content-center " >
          <Col lg={8} className="description">
          <span
              style={{
                paddingTop: "80px",
                color: "orange",
                fontWeight: "bold",
              }}
            >
              VISION
            </span>
            <p className="mb-4">
            Dream India Schools envision to contribute towards India’s progress, making quality education affordable and accessible, thus making the nation educated and empowered. The vision encompasses taking DIS to its rightful position, among India’s largest chain of schools.
            </p>
            <span
              style={{
                paddingTop: "80px",
                color: "orange",
                fontWeight: "bold",
              }}
            >
              MISSION
            </span>
            <p className="mb-4">
            To serve students from all backgrounds, in a safe and supportive environment, working together with teachers and parents, developing self-disciplined adults who will contribute responsibly in a global community.
            </p>
           
          </Col>
          <Col lg={4}>
            <img src={img} alt="facilties" className="facility-img"></img>
          </Col>
        </Row>
    </Container>
    <Footer/>
    </>
  )
}

export default About
