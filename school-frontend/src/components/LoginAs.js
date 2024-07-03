import { Paper } from "@mui/material";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LoginAs = () => {
  const admin = new URL('../images/admin.jpg', import.meta.url);
  const faculty = new URL('../images/faculty.jpg', import.meta.url);
  const student = new URL('../images/student.jpg', import.meta.url);

  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    navigate(`/login/${role}`);
  };
  return (
    <>
    <div style={{ backgroundColor: "#f0fdf4", height:"100vh"}}>
    <div style={{ overflowX:"hidden"}}>
        <Container>
        <Row style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
          <Col lg={3} >
            <Paper elevation={3} className="login-as" onClick={() => handleRoleSelect('admin')} >
            <div className="login-content">
              <h4>Login as Admin</h4>
              <img src={admin} alt="admins" className="login-logo" />
            </div>
              
            </Paper>
          </Col>
          <Col lg={3} >
            <Paper elevation={3} className="login-as" onClick={() => handleRoleSelect('faculty')}>
            <div className="login-content">
              <h4>Login as Faculty</h4>
              <img src={faculty} alt="admins" className="login-logo" />
            </div>
            </Paper>
          </Col>
          <Col lg={3} >
            <Paper elevation={3} className="login-as" onClick={() => handleRoleSelect('student')}>
            <div className="login-content">
              <h4>Login as Student</h4>
              <img src={student} alt="admins" className="login-logo" />
            </div>
            </Paper>
          </Col>
        </Row>
        </Container>
       
      </div>
    </div>
      
    </>
  );
};

export default LoginAs;
