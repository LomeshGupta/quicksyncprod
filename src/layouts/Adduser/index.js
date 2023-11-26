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
import React, { useState, useEffect } from "react";
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";

// QuickSync Pro React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// QuickSync Pro React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

function Adduser() {
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
                    Users List
                  </MDTypography>
                </MDBox>
                <Card.Body>
                  <Form>
                    <Form.Group className="mb-3" controlId="Name">
                      <Form.Label className="text-center">Name</Form.Label>
                      <Form.Control type="text" placeholder="Enter Name" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label className="text-center">Email address</Form.Label>
                      <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
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
