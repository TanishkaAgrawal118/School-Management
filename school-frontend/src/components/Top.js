import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import Navbar from "./Navbar";
import Home from "./Home";
import { useNavigate } from "react-router-dom";


const Top = () => {
  const navigate = useNavigate();
  const handleClick = () =>{
    navigate("/login-as");
  }
  return (
    <>
      <div className="top">
        <Container>
          <Row style={{ justifyContent: "center" }}>
            <Col className="text-center" style={{ display: "inline-block" }}>
              <MdOutlineMailOutline
                style={{ color: "orange", margin: "6px" }}
              />
              <a href="mailto:enquiry@dreamindia.com" className="email">
                enquiry@dreamindia.com
              </a>
            </Col>
            <Col className="text-center">
              <button className="login-button" onClick={handleClick}>
                {" "}
                <CiUser
                  style={{
                    fontSize: "18px",
                    paddingBottom: "2px",
                    color: "orange",
                  }}
                />
                ERP Login
              </button>
              <FaFacebook style={{ margin: "6px" }} />
              <FaTwitter style={{ margin: "6px" }} />
              <FaInstagram style={{ margin: "6px" }} />
            </Col>
          </Row>
        </Container>
      </div>
      <Navbar />
     <Home/>
    </>
  );
};

export default Top;
