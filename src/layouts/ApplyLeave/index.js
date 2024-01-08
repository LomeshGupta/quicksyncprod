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
import Cookies from "js-cookie";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { Today } from "@mui/icons-material";
import { right } from "@cloudinary/url-gen/qualifiers/textAlignment";

import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

function ApplyLeave() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [stage, setstage] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const url = "https://quicksync.onrender.com/api/users/getusers";

  //   const nextok = () => setstage(stage + 1);
  //   const prev = () => setstage(stage - 1);

  function preview() {
    const img = document.getElementById("img");
    img.src = URL.createObjectURL(event.target.files[0]);
    const file = event.target.files[0];
    setImage(file);
  }

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
    setData({ ...data, _id: Cookies.get("id") });
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
                    Apply Leave
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
                          Leave Application
                        </MDTypography>
                        <MDTypography variant="caption">Mandatory informations</MDTypography>
                      </MDBox>
                      <MDBox style={{ marginTop: "3%" }}>
                        <MDBox>
                          &nbsp;
                          <FormControl variant="standard" style={{ width: "45%", marginTop: "1%" }}>
                            <InputLabel id="type">Type</InputLabel>
                            <Select labelId="type" id="type" label="Type">
                              <MenuItem value="PL">Privilege Leave (PL)</MenuItem>
                              <MenuItem value="EL">Earned Leave (EL)</MenuItem>
                              <MenuItem value="CL">Casual Leave (CL)</MenuItem>
                              <MenuItem value="AL">Annual Leave (AL)</MenuItem>
                              <MenuItem value="CO">Comp Off</MenuItem>
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
                          {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <MDInput
                            type="number"
                            InputProps={{ inputProps: { min: 0, max: 13 } }}
                            variant="standard"
                            label="Privilege Leave (PL)"
                            style={{ width: "45%" }}
                            // onChange={(e) => setData({ ...data, fullname: e.target.value })}
                            // defaultValue={data.fullname ? data.fullname : null}
                          /> */}
                        </MDBox>
                        <MDBox>
                          &nbsp;
                          <MDInput
                            type="date"
                            variant="standard"
                            label="From Date"
                            style={{ width: "45%", marginTop: "4%" }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            // onChange={(e) => setData({ ...data, email: e.target.value })}
                            defaultValue={
                              new Date().getMonth() +
                              "/" +
                              new Date().getDay() +
                              "/" +
                              new Date().getFullYear()
                            }
                          />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <FormControl variant="standard" style={{ width: "45%", marginTop: "5%" }}>
                            <InputLabel id="sessions">Sessions</InputLabel>
                            <Select labelId="type" id="type" label="Type">
                              <MenuItem value="S1">Session 1</MenuItem>
                              <MenuItem value="S2">Session 2</MenuItem>
                            </Select>
                          </FormControl>
                        </MDBox>
                        <MDBox>
                          &nbsp;
                          <MDInput
                            type="date"
                            variant="standard"
                            label="To Date"
                            style={{ width: "45%", marginTop: "4%" }}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            // onChange={(e) => setData({ ...data, email: e.target.value })}
                            defaultValue={
                              new Date().getMonth() +
                              "/" +
                              new Date().getDay() +
                              "/" +
                              new Date().getFullYear()
                            }
                          />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <FormControl variant="standard" style={{ width: "45%", marginTop: "5%" }}>
                            <InputLabel id="sessions">Sessions</InputLabel>
                            <Select labelId="type" id="type" label="Type">
                              <MenuItem value="S1">Session 1</MenuItem>
                              <MenuItem value="S2">Session 2</MenuItem>
                            </Select>
                          </FormControl>
                        </MDBox>
                        <MDBox style={{ marginTop: "4%" }} textAlign="right ">
                          <MDButton variant="gradient" color="dark" size="large">
                            Apply
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
      {/* <Container style={{ marginTop: "2%" }}>
        <Card
          sx={{
            position: "relative",
            mt: 5,
            mx: 3,
            py: 2,
            px: 2,
          }}
        >
          <MDBox
            sx={{
              mx: 3,
            }}
          >
            <MDBox lineHeight={1} textAlign="left" style={{ marginTop: "1%" }}>
              <MDTypography display="block" fontSize="20px" variant="h5" fontWeight="medium">
                Basic Information
              </MDTypography>
              {/* <MDTypography variant="caption">Mandatory informations</MDTypography> */}
      {/* </MDBox> */}
      {/* </MDBox> */}
      {/* </Card> */}
      {/* </Container> */}
    </DashboardLayout>
  );
}

export default ApplyLeave;
