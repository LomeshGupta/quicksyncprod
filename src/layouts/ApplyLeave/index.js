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
import Grid from "@mui/material/Grid";
import { Radar } from "react-chartjs-2";
import { useMemo } from "react";

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
import PieChart from "examples/Charts/PieChart";

function ApplyLeave() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const form = useRef();
  // const [stage, setstage] = useState(null);
  // const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [setbal, setBalance] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDate2, setSelectedDate2] = useState(new Date());
  const [numberOfDays, setNumberOfDays] = useState(0);
  const [plval, setPL] = useState(0);
  const [elval, setEL] = useState(0);
  const [clval, setCL] = useState(0);
  const [alval, setAL] = useState(0);
  const [coval, setCO] = useState(0);
  const [Remainingdays, setRemainingdays] = useState(0);
  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const url = "https://quicksync.onrender.com/api/users/getusers";

  const getleaves = async (Type) => {
    const data1 = {
      username: Cookies.get("username"),
      type: "PL",
    };
    const data2 = {
      username: Cookies.get("username"),
      type: "AL",
    };
    const data3 = {
      username: Cookies.get("username"),
      type: "CL",
    };
    const data4 = {
      username: Cookies.get("username"),
      type: "EL",
    };
    const data5 = {
      username: Cookies.get("username"),
      type: "CO",
    };

    // e.preventDefault();
    // setIsLoading(true);

    const response1 = await fetch("https://quicksync.onrender.com/api/leaves/getleavebal", {
      method: "POST",
      body: JSON.stringify(data1),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result1 = await response1.json();
    console.log(result1);
    setIsLoading(false);
    if (response1.ok) {
      setPL(result1);
    } else {
      toast.error(result.message);
    }

    const response2 = await fetch("https://quicksync.onrender.com/api/leaves/getleavebal", {
      method: "POST",
      body: JSON.stringify(data2),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result2 = await response2.json();
    console.log(result2);
    setIsLoading(false);
    if (response2.ok) {
      setAL(result2);
    } else {
      toast.error(result2.message);
    }

    const response3 = await fetch("https://quicksync.onrender.com/api/leaves/getleavebal", {
      method: "POST",
      body: JSON.stringify(data3),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result3 = await response3.json();
    console.log(result3);
    setIsLoading(false);
    if (response3.ok) {
      setCL(result3);
    } else {
      toast.error(result3.message);
    }

    const response4 = await fetch("https://quicksync.onrender.com/api/leaves/getleavebal", {
      method: "POST",
      body: JSON.stringify(data4),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result4 = await response4.json();
    console.log(result4);
    setIsLoading(false);
    if (response4.ok) {
      setEL(result4);
    } else {
      toast.error(result4.message);
    }

    const response5 = await fetch("https://quicksync.onrender.com/api/leaves/getleavebal", {
      method: "POST",
      body: JSON.stringify(data5),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result5 = await response5.json();
    console.log(result5);
    setIsLoading(false);
    if (response5.ok) {
      setCO(result5);
    } else {
      toast.error(result5.message);
    }
  };

  const handleSubmit = async (e) => {
    setSelectedOption(e.target.value);

    const data1 = {
      username: Cookies.get("username"),
      type: e.target.value,
      // Add other fields as needed
    };

    e.preventDefault();
    // setIsLoading(true);

    const response = await fetch("https://quicksync.onrender.com/api/leaves/getleavebal", {
      method: "POST",
      body: JSON.stringify(data1),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log(result);
    setIsLoading(false);
    if (response.ok) {
      setBalance(result);
    } else {
      toast.error(result.message);
    }
  };

  useEffect(() => {
    getleaves();
  }, []);

  const inputRef = useRef(null);

  const handleClick = () => {
    // 👇️ open file input box on click of another element
    inputRef.current.click();
  };

  const handleDateChange = (event) => {
    const newDate = new Date(event.target.value);
    setSelectedDate(newDate);
    // calculateNumberOfDays(newDate);
  };

  const handleDateChange2 = (event) => {
    if (!selectedDate) {
      alert("Enter From date first");
    }
    const newDate = new Date(event.target.value);
    setSelectedDate(newDate);
    calculateNumberOfDays(selectedDate, newDate);
  };

  const calculateNumberOfDays = (selectedDate, selectedDate2) => {
    // const currentDate = new Date();
    const timeDifference = selectedDate2.getTime() - selectedDate.getTime();
    const daysDifference = Math.round(timeDifference / (1000 * 3600 * 24));
    setNumberOfDays(daysDifference + 1);
    setRemainingdays(setbal - Math.abs(daysDifference + 1));
  };

  const handleSubmitleave = async (e) => {
    e.preventDefault();

    const date = new Date();

    const data2 = {
      username: Cookies.get("username"),
      type: selectedOption,
      createdDate: date,
      leaves: -numberOfDays,
      // Add other fields as needed
    };
    setIsLoading(true);
    console.log(JSON.stringify(data2));
    const response = await fetch("https://quicksync.onrender.com/api/leaves/addleave", {
      method: "POST",
      body: JSON.stringify(data2),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    // console.log(result);
    setIsLoading(false);
    if (response.ok) {
      console.log(result);
      form.current.reset();
      setSelectedDate2(new Date());
      setSelectedDate(new Date());
      setBalance("0");
      setSelectedOption("");
      setNumberOfDays(0);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div>
        <Container style={{ marginTop: "5%" }}>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={7}>
              <Col style={{ borderRadius: "40%" }}>
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
                    <Form ref={form}>
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
                            <FormControl
                              variant="standard"
                              style={{ width: "45%", marginTop: "1%" }}
                            >
                              <InputLabel id="type">Type</InputLabel>
                              <Select labelId="type" id="type" label="Type" onChange={handleSubmit}>
                                <MenuItem value="PL">Privilege Leave (PL)</MenuItem>
                                <MenuItem value="EL">Earned Leave (EL)</MenuItem>
                                <MenuItem value="CL">Casual Leave (CL)</MenuItem>
                                <MenuItem value="AL">Annual Leave (AL)</MenuItem>
                                <MenuItem value="CO">Comp Off</MenuItem>
                              </Select>
                            </FormControl>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <MDInput
                              id="applyingfor"
                              variant="standard"
                              label="Applying For"
                              type="text"
                              style={{ width: "45%" }}
                              value={numberOfDays}
                              defaultValue={numberOfDays}
                              required
                            />
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
                              onChange={handleDateChange}
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
                            <FormControl
                              variant="standard"
                              style={{ width: "45%", marginTop: "5%" }}
                            >
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
                              onChange={handleDateChange2}
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
                            <FormControl
                              variant="standard"
                              style={{ width: "45%", marginTop: "5%" }}
                            >
                              <InputLabel id="sessions">Sessions</InputLabel>
                              <Select labelId="type" id="type" label="Type">
                                <MenuItem value="S1">Session 1</MenuItem>
                                <MenuItem value="S2">Session 2</MenuItem>
                              </Select>
                            </FormControl>
                          </MDBox>
                          <MDBox style={{ marginTop: "4%" }} textAlign="right ">
                            <MDButton
                              variant="gradient"
                              color="dark"
                              size="large"
                              onClick={handleSubmitleave}
                            >
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
            </Col>
            <Col md={4}>
              <Col style={{ borderRadius: "40%", marginTop: "2%" }}>
                <MDBox
                  color="white"
                  bgColor={darkMode ? "dark" : "white"}
                  variant="gradient"
                  borderRadius="lg"
                  shadow="lg"
                  opacity={2}
                  p={2}
                >
                  {plval ? (
                    <PieChart
                      height="20.500rem"
                      chart={{
                        labels: [
                          "PL (Privilege Leave)",
                          "EL (Earned Leave)",
                          "CL (Casual Leave)",
                          "AL (Annual Leave)",
                          "CO (Comp Off)",
                        ],
                        datasets: {
                          label: "Projects",
                          backgroundColors: ["info", "primary", "warning", "secondary", "success"],
                          data: [plval, elval, clval, alval, coval],
                        },
                      }}
                    />
                  ) : (
                    <PieChart
                      height="25.125rem"
                      chart={{
                        labels: [
                          "PL (Privilege Leave)",
                          "EL (Earned Leave)",
                          "CL (Casual Leave)",
                          "AL (Annual Leave)",
                          "CO (Comp Off)",
                        ],
                        datasets: {
                          label: "Projects",
                          backgroundColors: ["info", "primary", "warning", "secondary", "success"],
                          data: [plval, elval, clval, alval, coval],
                        },
                      }}
                    />
                  )}
                  <Row>
                    &nbsp; &nbsp;
                    <MDBox
                      color="white"
                      bgColor="info"
                      variant="gradient"
                      borderRadius="lg"
                      shadow="lg"
                      opacity={1}
                      width="17%"
                      p={1}
                    >
                      <MDTypography
                        display="block"
                        variant="caption"
                        color="white"
                        fontWeight="bold"
                        fontSize="15px"
                      >
                        PL : {plval}
                      </MDTypography>
                    </MDBox>
                    &nbsp;
                    <MDBox
                      color="white"
                      bgColor="primary"
                      variant="gradient"
                      borderRadius="lg"
                      shadow="lg"
                      opacity={1}
                      width="17%"
                      p={1}
                    >
                      <MDTypography
                        display="block"
                        variant="caption"
                        color="white"
                        fontWeight="bold"
                        fontSize="15px"
                      >
                        EL : {elval}
                      </MDTypography>
                    </MDBox>
                    &nbsp;
                    <MDBox
                      color="white"
                      bgColor="warning"
                      variant="gradient"
                      borderRadius="lg"
                      shadow="lg"
                      opacity={1}
                      width="17%"
                      p={1}
                    >
                      <MDTypography
                        display="block"
                        variant="caption"
                        color="white"
                        fontWeight="bold"
                        fontSize="15px"
                      >
                        CL : {clval}
                      </MDTypography>
                    </MDBox>
                    &nbsp;
                    <MDBox
                      color="white"
                      bgColor="secondary"
                      variant="gradient"
                      borderRadius="lg"
                      shadow="lg"
                      opacity={1}
                      width="17%"
                      p={1}
                    >
                      <MDTypography
                        display="block"
                        variant="caption"
                        color="white"
                        fontWeight="bold"
                        fontSize="15px"
                      >
                        AL : {alval}
                      </MDTypography>
                    </MDBox>
                    &nbsp;
                    <MDBox
                      color="white"
                      bgColor="success"
                      variant="gradient"
                      borderRadius="lg"
                      shadow="lg"
                      opacity={1}
                      width="17%"
                      p={1}
                    >
                      <MDTypography
                        display="block"
                        variant="caption"
                        color="white"
                        fontWeight="bold"
                        fontSize="15px"
                      >
                        CO : {coval}
                      </MDTypography>
                    </MDBox>
                  </Row>
                </MDBox>
              </Col>
              {/* <Col style={{ borderRadius: "40%", marginTop: "2%" }}>
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
                    color="white"
                    bgColor={darkMode ? "dark" : "white"}
                    variant="gradient"
                    borderRadius="lg"
                    opacity={2}
                  >
                    <MDBox>
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
                        </MDBox>
                        <MDBox style={{ marginTop: "3%" }}>
                          <MDBox>
                            <br />
                            <MDInput
                              label="Available Leaves"
                              bgColor={darkMode ? "dark" : "white"}
                              defaultValue={setbal + " Days"}
                              value={setbal + " Days"}
                              // disabled
                            />
                          </MDBox>
                          <MDBox>
                            <br />
                            <MDInput
                              label="Applying For"
                              defaultValue={numberOfDays + " Days"}
                              value={numberOfDays + " Days"}
                              // disabled
                            />
                          </MDBox>
                          <MDBox>
                            <br />
                            <MDInput
                              label="Remaining Leaves"
                              defaultValue={setbal + " Days"}
                              value={Remainingdays + " Days"}
                              // disabled
                            />
                          </MDBox>
                        </MDBox>
                      </MDBox>
                    </MDBox>
                  </MDBox>
                </MDBox>
              </Col> */}
            </Col>
          </Row>
        </Container>
      </div>
      <div>
        <Container style={{ marginTop: "3%" }}>
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={8} style={{ borderRadius: "40%" }}>
              {/* <MDBox
                color="Transparent"
                bgColor="Transparent"
                variant="gradient"
                borderRadius="lg"
                shadow="lg"
                opacity={2}
                p={2}
              > */}
              {/* </MDBox> */}
            </Col>
          </Row>
        </Container>
      </div>
    </DashboardLayout>
  );
}

export default ApplyLeave;
