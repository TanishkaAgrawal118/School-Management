import React from "react";
import { Carousel, Col, Container, Row } from "react-bootstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { FaRegSmileBeam } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaSchool } from "react-icons/fa6";
import { useSpring, animated } from "react-spring";
import Hero5 from "./Hero5";
import Footer from "./Footer";


const stud1 = new URL("../images/stud1.png", import.meta.url);
const stud2 = new URL("../images/stud2.jpg", import.meta.url);
const stud3 = new URL("../images/stud3.avif", import.meta.url);
// const stud4 = new URL("../images/stud4.jpg", import.meta.url);
const stud5 = new URL("../images/right-1.png", import.meta.url);
// const stud6 = new URL("../images/stud6.jpeg", import.meta.url);
// const stud7 = new URL("../images/stud7.png", import.meta.url);
const Home = () => {
  const navigate = useNavigate();
  const handleEnquiry = () => {
    navigate("/enquiry");
  };
  function Number({ n }) {
    const { number } = useSpring({
      from: { number: 0 },
      number: n,
      delay: 100,
      config: { mass: 1, tension: 20, friction: 10 },
    });
    return <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>;
  }

  return (
    <>
      <div>
        <Carousel
          class="carousel slide carousel-fade"
          interval={5000}
          pause={false}
        >
          <Carousel.Item>
            <img className="carousel-image" src={stud1} alt="First slide" />
            <Carousel.Caption className="carousel-caption">
              <p>Dream India Schools</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="carousel-image" src={stud2} alt="Second slide" />
            <Carousel.Caption className="carousel-caption">
              <p>Dream India Schools</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="carousel-image" src={stud3} alt="Third slide" />
            <Carousel.Caption className="carousel-caption">
              <p>Dream India Schools</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        <Container>
          <div
            style={{
              backgroundColor: "rgb(249, 198, 104)",
              marginTop: "-10px",
              height: "35px",
              position: "relative",
              zIndex: "10",
            }}
          ></div>
        </Container>
      </div>

      <Container>
        <div style={{ backgroundColor: "white", marginBottom: "60px" }}>
          <Row>
            <Col lg={7}>
              <span style={{ paddingTop: "80px", color: "orange" }}>
                WELCOME TO
              </span>
              <h2
                style={{
                  marginTop: "25px",
                  marginBottom: "0px",
                  fontWeight: "bold",
                }}
              >
                Dream India Schools
              </h2>
              <div style={{ fontSize: "15px", textAlign: "justify" }}>
                <p>
                  Dream India Schools is one of the largest educational chains
                  established on 23rd November, 2013, and having presence in 6
                  states.
                </p>
                <p>
                  Dream India Schools is a rising chain, with a network of more
                  than 11000 students and about 600 teachers, all with a bent
                  for achieving a better tomorrow. Every student at Dream India
                  Schools is nurtured to be a well-spoken and responsible
                  citizen and is encouraged to dream ahead. DIS transforms
                  students' dreams to reality through effectively designed
                  curriculum, relevant to today’s world.
                </p>
                <p>
                  Dream India is a dream to see an Educated and Empowered India!
                  Today, DIS stands tall with 35 schools, spread across 6 states
                  in India, evolving into a better and larger group.
                </p>
                <p>
                  <b>Join us in making this dream a reality!</b>
                </p>
              </div>
            </Col>
            <Col lg={5}>
              <img src={stud5} alt="img4" className="side-img "></img>
            </Col>
          </Row>
        </div>
      </Container>

      <div>
        {/* <img src={stud6} alt="stud" className="section3"></img> */}
        <div className="upside">
          <Container>
            <h6
              style={{
                fontFamily: "Poppins",
                fontWeight: "bolder",
              }}
            >
              OUR SUCCESS
            </h6>
            <h3
              style={{
                fontWeight: "bold",
                fontSize: "40px",
                marginBottom: "0px",
              }}
            >
              WHY CHOOSE DIS?
            </h3>
            <p>
              The main premise of starting the school is to ensure a more
              ehtical and responsible future generation. Hence a lot emphasis is
              laid on academics, value educaion and discipline.
            </p>
            <div
              style={{
                fontWeight: "bold",
                fontSize: "25px",
                marginBottom: "0px",
                display: "flex",
              }}
            >
              <Row>
                <Col lg={4}>
                  <Row>
                    <Col lg={2}>
                      <FaRegSmileBeam
                        style={{
                          fontSize: "30px",
                          margin: "5px 10px 0px 0px",
                        }}
                      />
                    </Col>
                    <Col lg={10}>
                      <p>Student Centric Approach</p>
                    </Col>
                  </Row>
                </Col>
                <Col lg={4}>
                  <Row>
                    <Col lg={2}>
                      <FaChalkboardTeacher
                        style={{
                          fontSize: "30px",
                          margin: "5px 10px 0px 0px",
                        }}
                      />
                    </Col>
                    <Col lg={10}>
                      <p>Experinced Faculty</p>
                    </Col>
                  </Row>
                </Col>
                <Col lg={4}>
                  <Row>
                    <Col lg={2}>
                      <FaSchool
                        style={{
                          fontSize: "30px",
                          margin: "5px 10px 0px 0px",
                        }}
                      />
                    </Col>
                    <Col lg={10}>
                      <p>Best Practices</p>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
            <div className="d-flex ">
              <div style={{ textAlign: "center", marginRight: "80px" }}>
                <span style={{ fontSize: "40px" }}>
                  <Number n={10000} />
                </span>
                <h6>Students</h6>
              </div>
              <div style={{ textAlign: "center" }}>
                <span style={{ fontSize: "40px" }}>
                  <Number n={600} />
                </span>
                <h6>Qualified staff</h6>
              </div>
            </div>
          </Container>
        </div>
      </div>
      <Hero5/>
      <Footer/>
      <button className="enquiry-button" onClick={handleEnquiry}>
        Enquiry
      </button>
    </>
  );
};

export default Home;
