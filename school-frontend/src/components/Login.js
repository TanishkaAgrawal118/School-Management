import React, { useState } from "react";
import { Container, Button, Form } from "react-bootstrap";
import backgroundImage from "../images/stud6.jpeg";
import { Paper } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { adminLogin, facultyLogin, studentLogin } from "./ApiSerives";
import { useUser } from './UserContext';

const Login = () => {
  const logo = new URL("../images/school.png", import.meta.url);
  const [formData, setFormData] = useState({});
  const [errormsg, setErrormsg] = useState("");
  const navigate = useNavigate();
  const { role } = useParams();
  const { setUser } = useUser();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrormsg("");
    try {
      let response;
      if (role === "admin") {
        response = await adminLogin(formData);
        navigate("/adminDashboard");
      } else if (role === "student") {
        response = await studentLogin(formData);
        if (response && response.data) {
          const student = {
            id: response.data.id,
            token: response.data.token,
          };
          setUser(student); 
          console.log(student);
          navigate("/studentDashboard");
        }

      } else if (role === "faculty") {
        response = await facultyLogin(formData);
        if(response && response.data){
          const faculty = {
            id: response.data.id,
            token: response.data.token,
          }
          setUser(faculty);
          navigate("/facultyDashboard");
        }
        
      }

      if (response && response.data) {
        const token = response.data.token;
        localStorage.setItem("token", token);
      } else {
        setErrormsg("No response from server");
        console.error("No response data", response);
      }
    } catch (error) {
      console.error("Error during login", error);
      setErrormsg("Invalid email or password");
      setTimeout(() => {
        setErrormsg("");
      }, 2000);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
        backgroundSize: "cover",
        overflowX: "hidden",
      }}
    >
      <div className="d-flex justify-content-center align-items-center">
        <img src={logo} className="login-logo" alt="logo"></img>
      </div>

      <Container className="d-flex justify-content-center align-items-center">
        <Paper elevation={3} className="login">
          <div className="login p-4">
            <h4 className="text-center">Login</h4>
            <Container>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    className="mb-1"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="mb-1"
                    onChange={handleChange}
                  />
                </Form.Group>
                <Button
                  type="submit"
                  className="login-btn"
                  style={{ backgroundColor: "#083344", padding: "2px" }}
                >
                  LOGIN
                </Button>
              </Form>
              {errormsg && <p className="text-danger">{errormsg}</p>}
            </Container>
          </div>
        </Paper>
      </Container>
    </div>
  );
};

export default Login;
