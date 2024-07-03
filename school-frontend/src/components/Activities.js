import React from "react";
import backgroundImage from "../images/bg.jpg";
import NavigationBar from "./Navbar";
import { Col, Container, Row } from "react-bootstrap";
import Footer from "./Footer";

const Acitivities = () => {
  const activity = new URL("../images/activity.png", import.meta.url);
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
          <span className="bg-text">ACTIVITIES</span>
        </div>
      </div>
      <hr
        style={{ border: "10px solid orange", marginTop: "-5px", zIndex: "10" }}
      ></hr>

      <Container>
        <Row className="justify-content-center " style={{ minHeight: "80vh" }}>
          <Col lg={8} className="description">
            <span
              style={{
                paddingTop: "80px",
                color: "orange",
                fontWeight: "bold",
              }}
            >
              TRANSFORMING YOUNG DREAMERS TO LIFETIME ACHIEVERS!
            </span>
            <p className="mt-4 mb-4">
              DIS believes in balancing learning with enriching activities which
              include innovations, thought sharing talks, celebrations, field
              trips, awareness programs and much more.
            </p>
            <ul className="tick-list">
              <li>
                Assembly is a platform to showcase talents and express one’s
                views in front of the audience. At DIS, the morning assembly is
                invigorating and cultivates a sense of belongingness, respect
                and appreciation for others.
              </li>
              <li>
                Our Public Speaking program enables students to organize their
                thoughts and enhances their self-esteem
              </li>
              <li>Festive occasions promote secularism.</li>
              <li>The school hosts various individual, group and inter-house activities and encourages maximum participation.</li>
              <li>Students also participate in various Inter-school competitions and external competitive examinations of national and international repute.</li>
              <li>Art & craft activities like making rangolis and rakhis, decorating kites and diyas, etc., bring out the latent creative skills of students.</li>
              <li>Various sports and games, dramatics and awareness programs are interwoven in the day to day schedule of the school.</li>
              <li>Fun-filled Saturdays, with aerobics, music, dance and martial arts, are much awaited by our students.</li>
            </ul>
          </Col>
          <Col lg={4}>
            <img src={activity} alt="activity" className="facility-img mt-5"></img>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Acitivities;
