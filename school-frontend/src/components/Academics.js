import React from "react";
import backgroundImage from "../images/bg.jpg";
import NavigationBar from "./Navbar";
import { Col, Container, Row } from "react-bootstrap";
import Footer from "./Footer";

const Academics = () => {
  const academics = new URL("../images/acad.png", import.meta.url);
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
          <span className="bg-text">ACADEMICS</span>
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
              CURRICULUM RELEVANT TO TODAY’S WORLD
            </span>
            <p className="mt-4 mb-4">
              We are dealing with a digital generation, affectionately called
              the millennials. Their world is evolving to stay more connected
              and open day by day. Communication plays an important role in this
              ultra-modern world.Our curriculum enables
            </p>
            <ul className="tick-list">
              <li>Research-based learning</li>
              <li>Hands on learning experiences</li>
              <li>Conducive learning environment</li>
              <li>Freedom for Expression & Creativity</li>
              <li>Customized learning opportunities</li>
            </ul>
            <p className="mt-4 mb-4">
              In the Pre-primary classes, teachers lay a lot of emphasis on the
              Play-way method. Games are a natural means of teaching little ones
              and an integral part of every classroom. Teachers use flash cards
              and digital media content to reinforce learning. Songs and rhymes
              are used to develop vocabulary.
            </p>
            <p className="mt-4 mb-4">
              At the Primary level, learning is experiential, fun & activity
              based. The curriculum is based on the NCERT guidelines and focuses
              on laying the foundations of knowledge, skills and attitudes which
              will guide the young learners for life. The focus is on conceptual
              clarity by relating learning to everyday life, developing thinking
              and analytical skills.
            </p>
            <span
              style={{
                paddingTop: "80px",
                fontWeight: "bold",
              }}
            >
              CURRICULUM RELEVANT TO TODAY’S WORLD
            </span>
            <ul className="tick-list">
              <li>
                Languages (English, Hindi / Regional language and/or Sanskrit)
              </li>
              <li>Mathematics</li>
              <li>Science</li>
              <li>Social Science</li>
              <li>Visual & Performing Arts</li>
              <li>Physical & Health Education</li>
              <li>Life skills & Value Education</li>
            </ul>

            <p className="mb-4 mt-4">
              Children also get opportunities to participate in various
              inter-school competitions, school assemblies, annual days, events
              &celebrations and social awareness campaigns. Our well planned and
              organized field trips spark excitement among students, enriching
              and expanding the curriculum and strengthening observation skills.
            </p>
          </Col>
          <Col lg={4}>
            <img
              src={academics}
              alt="activity"
              className="facility-img mt-5"
            ></img>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Academics;
