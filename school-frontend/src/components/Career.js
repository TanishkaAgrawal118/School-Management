import React from "react";
import backgroundImage from "../images/bg.jpg";
import NavigationBar from "./Navbar";
import { Col, Container, Row } from "react-bootstrap";
import Footer from "./Footer";

const Career = () => {
  const img = new URL("../images/careers.png", import.meta.url);
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
          <span className="bg-text">CAREERS</span>
        </div>
      </div>
      <hr
        style={{ border: "10px solid orange", marginTop: "-5px", zIndex: "10" }}
      ></hr>

      <Container>
        <Row className="justify-content-center " >
          <Col lg={8} className="description">
            <p className="mt-4 mb-4">
              Dream India School is a growing institution and welcomes
              applications from committed and dedicated individuals who will
              contribute to the high standards of excellence desired at all
              levels.
            </p>
            <span
              style={{
                paddingTop: "80px",
                color: "orange",
                fontWeight: "bold",
              }}
            >
              CANDIDATE PROFILE
            </span>
            <p className="mt-4 mb-4">
              DIS seeks individuals with the following qualities:
            </p>
            <ul className="tick-list">
              <li>Excellent communication skills.</li>
              <li>Multifaceted ability to contribute beyond the classroom.</li>
              <li>
                A student-centered approach to teaching and learning methods.
              </li>
              <li>
                The school hosts various individual, group and inter-house
                activities and encourages maximum participation.
              </li>
              <li>
                A desire to keep oneself updated with the latest trends in the
                field of education.
              </li>
              <li>A pro-active approach.</li>
            </ul>
            <span
              style={{
                paddingTop: "80px",
                color: "orange",
                fontWeight: "bold",
              }}
            >
              OPENINGS
            </span>
            <p className="mt-4 mb-4">
              Interested candidates may send their applications any time of the
              year. However, candidates will be contacted depending upon the
              openings.
            </p>
            <span
              style={{
                paddingTop: "80px",
                color: "orange",
                fontWeight: "bold",
              }}
            >
              HOW TO APPLY?
            </span>
            <p className="mt-4 mb-4">
              Forward your resume through email to enquiry@dreamindia.com or
              apply to any location of Dream India School you wish to join.
              <br />
              Shortlisted candidates will be intimated to come to the campus for
              a personal interview.
            </p>
            <span
              style={{
                paddingTop: "80px",
                color: "orange",
                fontWeight: "bold",
              }}
            >
              TRAINED & COMMITTED TEAM OF EDUCATORS
            </span>
            <p className="mt-4 mb-4">
            <b>The more ways we teach, the more students we reach!</b>   Our committed
              team of teachers meets the needs of each individual learner by
              adopting various methods and techniques. They strive to motivate
              and engage their learners. They take every opportunity to continue
              learning by devoting time for their own professional development.<br/>
              The Management arranges workshops and conferences in which the
              teachers participate actively. Induction and in-service
              orientation sessions are provided at regular intervals. Our
              qualified and experienced team of educators believe that they are
              life-long learners. They are trained to make a difference by
              adopting a personalized approach towards teaching methods and get
              proficient in classroom management.
            </p>
          </Col>
          <Col lg={4}>
            <img src={img} alt="activity" className="facility-img mt-5"></img>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
};

export default Career;
