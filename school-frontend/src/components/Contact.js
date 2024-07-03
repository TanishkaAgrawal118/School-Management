import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import NavigationBar from './Navbar'
import backgroundImage from "../images/bg.jpg";
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
const Contact = () => {
    const navigate = useNavigate();
    const handleEnquiry = () =>{
        navigate("/enquiry")
    }
    const handleFeedback = () =>{
      navigate("/feedback")
    }
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
          <span className="bg-text">CONTACT</span>
        </div>
      </div>
      <hr
        style={{ border: "10px solid orange", marginTop: "-5px", zIndex: "10" }}
      ></hr>

      <Container>
      <Row className="justify-content-center ">
            <Col lg={7} className="description">
            <span
              style={{
                paddingTop: "80px",
                color: "orange",
                fontWeight: "bold",
              }}
            >
              NATIONAL OFFICE
            </span>
            <p className='mb-4 mt-4'><b>Dream India Schools</b></p>
            <p>C 310-311, Unitech Business Zone, Nirvana Country South City 2,
            Sector 50 Gurugram, Pin 122018.</p>
            <p><b>Toll-Free Number: </b>1800 891 1256<br/>
            Email: enquiry@dreamindia.com</p>
            <Row>
              <Col lg={2}>
              <Button variant="primary" onClick={handleEnquiry} style={{margin:"10px"}}>Enquiry</Button>
              </Col>
              <Col lg={2}>
              <Button variant="primary" onClick={handleFeedback} style={{margin:"10px"}}>Feedback</Button>
              </Col>
            </Row>
           
            </Col>


            <Col lg={5}>
            <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.9405939407293!2d75.82367517481372!3d22.65600342990922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fc0bf32599bf%3A0x1008b35026e513e3!2sInstitute%20of%20Engineering%20%26%20Science%2C%20IPS%20Academy!5e0!3m2!1sen!2sin!4v1714823189203!5m2!1sen!2sin"
              width="400"
              height="350" 
              allowfullscreen
              loading="lazy"
              style = {{ border: "4px" }}
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
            </Col>
        </Row>
      </Container>
      <hr style={{border:"2px solid black"}}></hr>
        <Footer/>
    </>
  )
}

export default Contact
