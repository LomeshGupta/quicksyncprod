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
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";

// QuickSync Pro React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// QuickSync Pro React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { Today } from "@mui/icons-material";

function Adduser() {
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
            <Col md={10}>
              <div className="border border-2 border-primary"></div>
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
                </MDBox>
                <Card.Body>
                  <Form>
                    <div className="row">
                      <div className="col-md-6 grid-margin stretch-card">
                        <Form.Group className="mb-3" controlId="Name">
                          <Form.Label className="text-center">UserName</Form.Label>
                          <Form.Control type="text" placeholder="Enter Username" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="Name">
                          <Form.Label className="text-center">Full Name</Form.Label>
                          <Form.Control type="text" placeholder="Enter Name" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label className="text-center">Email address</Form.Label>
                          <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label className="text-center">Designation</Form.Label>
                          <Form.Control type="text" placeholder="Enter Designation" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label className="text-center">Department</Form.Label>
                          <Form.Control type="text" placeholder="Enter Department" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                          <Form.Label>Password</Form.Label>
                          <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                      </div>
                      <div className="col-md-6 grid-margin stretch-card">
                        <img
                          id="img"
                          style={{ borderRadius: "100%", paddingLeft: "5%", marginLeft: "5%" }}
                          width={"80%"}
                          height={"56%"}
                          src={
                            "https://w7.pngwing.com/pngs/498/275/png-transparent-silhouette-user-person-silhouette-cdr-animals-head.png"
                          }
                          onClick={handleClick}
                        />
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
                          <Form.Control type="date" placeholder="Enter Date of Employment" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                          <Form.Label>Confirm Password</Form.Label>
                          <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                      </div>
                    </div>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox"></Form.Group>
                    <div className="d-grid">
                      <Button variant="primary" type="submit">
                        Create Account
                      </Button>
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