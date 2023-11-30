/**
=========================================================
* QuickSync Pro React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 QuickSync Pro (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
// import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";
import React, { useState, useEffect, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// QuickSync Pro React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// QuickSync Pro React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import RiseLoader from "react-spinners/RiseLoader";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { Today } from "@mui/icons-material";

function Adduser() {
  const password = useRef();
  const cPassword = useRef();
  const [data, setData] = useState({});
  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    if (password.current.value === cPassword.current.value) {
      e.preventDefault();
      setIsLoading(true);
      // console.log(JSON.stringify(data));
      const response = await fetch("https://quicksync.onrender.com/api/users/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      console.log(result);
      setIsLoading(false);
      if (response.ok) {
        navigate("/users");
      } else {
        toast.error(result.message);
      }
    } else {
      toast.error("Password Does not match");
    }
  };

  const [file, setFile] = useState();
  // function handleChange(e) {
  //   console.log(e.target.files);
  //   setFile(URL.createObjectURL(e.target.files[0]));
  // }

  function preview() {
    img.src = URL.createObjectURL(event.target.files[0]);
  }

  (function () {
    $("#file").change(function (event) {
      var x = URL.createObjectURL(event.target.files[0]);
      $("#upload-img").attr("src", x);
      console.log(event);
    });
  });

  const inputRef = useRef(null);

  const handleClick = () => {
    // 👇️ open file input box on click of another element
    inputRef.current.click();
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div>
        <Container style={{ marginTop: "5%" }}>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={15}>
              <div className="border border-2 border-primary">
                {loading ? (
                  <center
                    style={{
                      position: "fixed",
                      justifyContent: "center",
                      zIndex: "9",
                      top: "0",
                      left: "0",
                      width: "100%",
                      height: "100%",
                      background: "black",
                      opacity: "0.4",
                    }}
                  >
                    <RiseLoader cssOverride={{ marginTop: "20%" }} color="#36d7b7" />
                  </center>
                ) : null}
              </div>
              <Card className="shadow px-4">
                <MDBox
                  mx={2}
                  mt={-3}
                  py={3}
                  px={2}
                  variant="gradient"
                  bgColor="info"
                  borderRadius="lg"
                  coloredShadow="info"
                >
                  <MDTypography variant="h6" color="white">
                    Add User
                  </MDTypography>
                  <div>
                    <ToastContainer style={{ fontSize: "70%" }} />
                  </div>
                </MDBox>
                <Card.Body>
                  <Form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6 grid-margin stretch-card">
                        <Form.Group className="mb-3" controlId="Name">
                          <Form.Label className="text-center">UserName</Form.Label>
                          <Form.Control
                            type="text"
                            onChange={(e) => setData({ ...data, username: e.target.value })}
                            placeholder="Enter Username"
                          />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="Name">
                          <Form.Label className="text-center">Full Name</Form.Label>
                          <Form.Control
                            type="text"
                            onChange={(e) => setData({ ...data, fullname: e.target.value })}
                            placeholder="Enter Name"
                          />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label className="text-center">Email address</Form.Label>
                          <Form.Control
                            type="email"
                            onChange={(e) => setData({ ...data, email: e.target.value })}
                            placeholder="Enter email"
                          />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label className="text-center">Designation</Form.Label>
                          <Form.Control
                            type="text"
                            onChange={(e) => setData({ ...data, designation: e.target.value })}
                            placeholder="Enter Designation"
                          />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label className="text-center">Department</Form.Label>
                          <Form.Control
                            type="text"
                            onChange={(e) => setData({ ...data, department: e.target.value })}
                            placeholder="Enter Department"
                          />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            type="password"
                            onChange={(e) => setData({ ...data, password: e.target.value })}
                            placeholder="Password"
                            ref={password}
                          />
                        </Form.Group>
                      </div>
                      <div className="col-md-6 grid-margin stretch-card">
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicEmail"
                          style={{ textAlign: "center", paddingTop: "5%" }}
                        >
                          <img
                            id="img"
                            style={{ borderRadius: "100%" }}
                            width={"55%"}
                            height={"30%"}
                            src={
                              "https://w7.pngwing.com/pngs/498/275/png-transparent-silhouette-user-person-silhouette-cdr-animals-head.png"
                            }
                            onClick={handleClick}
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label className="text-center"></Form.Label>
                          <Form.Control
                            style={{ display: "none" }}
                            name="file"
                            type="file"
                            placeholder="Enter Department"
                            onChange={preview}
                            ref={inputRef}
                          />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label className="text-center">Date of Employment</Form.Label>
                          <Form.Control
                            type="date"
                            onChange={(e) => setData({ ...data, employed: e.target.value })}
                            placeholder="Enter Date of Employment"
                          />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                          <Form.Label>Confirm Password</Form.Label>
                          <Form.Control type="password" placeholder="Password" ref={cPassword} />
                        </Form.Group>
                      </div>
                      <div className="d-grid" style={{ position: "relative" }}>
                        <Button variant="primary" type="submit">
                          Add User
                        </Button>
                      </div>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </DashboardLayout>
  );
}

export default Adduser;
