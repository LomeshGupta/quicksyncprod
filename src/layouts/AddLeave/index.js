/**
=========================================================
* QuickSync Pro React - v2.2.0
=========================================================

* Product Page: https://www.quicksyncpro.netlify.app//product/material-dashboard-react
* Copyright 2023 QuickSync Pro (https://www.quicksyncpro.netlify.app/)

Coded by www.quicksyncpro.netlify.app/

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
import { Cloudinary } from "@cloudinary/url-gen";

// QuickSync Pro React components
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import { useMaterialUIController } from "context";

// QuickSync Pro React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import RiseLoader from "react-spinners/RiseLoader";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { Today } from "@mui/icons-material";
import { right } from "@cloudinary/url-gen/qualifiers/textAlignment";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

function AddLeave() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [stage, setstage] = useState(null);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const url = "https://quicksync.onrender.com/api/users/getusers";

  //   const nextok = () => setstage(stage + 1);
  //   const prev = () => setstage(stage - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setIsLoading(true);
    console.log(JSON.stringify(data2));
    const response = await fetch("https://quicksync.onrender.com/api/leaves/addleave", {
      method: "POST",
      body: JSON.stringify(data2),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log(result);
    setIsLoading(false);
    if (response.ok) {
      console.log(result);
    } else {
      toast.error(result.message);
    }
  };

  const fetchInfo = () => {
    return fetch(url)
      .then((res) => res.json())
      .then((d) => {
        setData(d);
        setIsLoading(false);
      })
      .catch();
  };

  useEffect(() => {
    setIsLoading(true);
    const date = new Date();
    setData2({ ...data2, createdDate: date });
    fetchInfo();
  }, []);

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
            <Col md={8} style={{ borderRadius: "40%" }}>
              <div>
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
              <MDBox
                color="white"
                bgColor={darkMode ? "dark" : "white"}
                variant="gradient"
                borderRadius="lg"
                shadow="lg"
                opacity={2}
                p={2}
              >
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
                    Add Leave
                  </MDTypography>
                  <div>
                    <ToastContainer style={{ fontSize: "70%" }} />
                  </div>
                </MDBox>
                <MDBox
                  color="white"
                  bgColor={darkMode ? "dark" : "white"}
                  variant="gradient"
                  borderRadius="lg"
                  opacity={2}
                >
                  <Form>
                    <MDBox>
                      <MDBox lineHeight={1} textAlign="left" style={{ marginTop: "4%" }}>
                        <MDTypography
                          display="block"
                          variant="caption"
                          color="text"
                          fontWeight="bold"
                          fontSize="20px"
                        >
                          Leave Information
                        </MDTypography>
                        <MDTypography variant="caption">Mandatory informations</MDTypography>
                      </MDBox>
                      <MDBox style={{ marginTop: "3%" }}>
                        <MDBox>
                          &nbsp;
                          <FormControl
                            variant="standard"
                            style={{ width: "25%", marginTop: "5.2%" }}
                          >
                            <InputLabel id="username">User Name</InputLabel>
                            <Select
                              labelId="username"
                              id="username"
                              // value={age}
                              label="Username"
                              onChange={(e) => setData2({ ...data2, username: e.target.value })}
                            >
                              {Array.isArray(data) ? (
                                data.map((user, index) => {
                                  return (
                                    <MenuItem key={index} value={user.username}>
                                      {user.username}
                                    </MenuItem>
                                  );
                                })
                              ) : (
                                <MenuItem value="">
                                  <em>None</em>
                                </MenuItem>
                              )}
                            </Select>
                          </FormControl>
                          {/* <MDInput
                            id="username"
                            variant="standard"
                            label="User Name"
                            type="text"
                            style={{ width: "45%" }}
                            onChange={(e) => setData({ ...data, username: e.target.value })}
                            defaultValue={data.username ? data.username : null}
                            required
                          /> */}
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <FormControl
                            variant="standard"
                            style={{ width: "25%", marginTop: "5.2%" }}
                          >
                            <InputLabel id="type">Type</InputLabel>
                            <Select
                              labelId="type"
                              id="type"
                              label="Type"
                              onChange={(e) => setData2({ ...data2, type: e.target.value })}
                            >
                              <MenuItem value="PL">Privilege Leave (PL)</MenuItem>
                              <MenuItem value="EL">Earned Leave (EL)</MenuItem>
                              <MenuItem value="CL">Casual Leave (CL)</MenuItem>
                              <MenuItem value="AL">Annual Leave (AL)</MenuItem>
                              <MenuItem value="CO">Comp Off</MenuItem>
                            </Select>
                          </FormControl>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <MDInput
                            type="number"
                            InputProps={{ inputProps: { min: 0, max: 13 } }}
                            variant="standard"
                            label="No. of Leaves"
                            style={{ width: "25%", marginTop: "4%" }}
                            onChange={(e) => setData2({ ...data2, leaves: e.target.value })}
                            // onChange={(e) => setData({ ...data, email: e.target.value })}
                            // defaultValue={data.email ? data.email : null}
                          />
                        </MDBox>
                        <MDBox style={{ marginTop: "4%" }} textAlign="right ">
                          <MDButton
                            variant="gradient"
                            color="dark"
                            size="large"
                            onClick={handleSubmit}
                          >
                            Grant
                          </MDButton>
                          &nbsp;&nbsp;
                        </MDBox>
                      </MDBox>
                    </MDBox>
                  </Form>
                </MDBox>
              </MDBox>
            </Col>
          </Row>
        </Container>
      </div>
    </DashboardLayout>
  );
}

export default AddLeave;
