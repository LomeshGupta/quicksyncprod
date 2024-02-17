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

function Adduser() {
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [stage, setstage] = useState(null);
  const [data, setData] = useState({});
  const [loading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data2 = new FormData();
    data2.append("file", image);
    data2.append("upload_preset", "rvz7sudp");
    data2.append("cloud_name", "dnbral0xq");
    data2.append("folder", "Cloudinary-React");

    const resp = await fetch("https://api.cloudinary.com/v1_1/dnbral0xq/image/upload", {
      method: "POST",
      body: data2,
    });
    const res = await resp.json();
    var pic = {
      photo: res.secure_url,
    };
    data.photo = res.secure_url;
    console.log(data.photo);
    // JSON.parse(data).push(pic);
    (e) => setData({ ...data, photo: res.secure_url });
    console.log(res.secure_url);
    console.log(JSON.stringify(data));
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
  };

  const nextok = () => setstage(stage + 1);
  const prev = () => setstage(stage - 1);

  function preview() {
    const img = document.getElementById("img");
    img.src = URL.createObjectURL(event.target.files[0]);
    const file = event.target.files[0];
    setImage(file);
  }

  useEffect(() => {
    setstage(1);
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
                    Add User
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
                  <Form onSubmit={handleSubmit}>
                    {stage === 1 ? (
                      <MDBox>
                        <MDBox lineHeight={1} textAlign="left" style={{ marginTop: "4%" }}>
                          <MDTypography
                            display="block"
                            variant="caption"
                            color="text"
                            fontWeight="bold"
                            fontSize="20px"
                          >
                            User Information
                          </MDTypography>
                          <MDTypography variant="caption">Mandatory informations</MDTypography>
                        </MDBox>
                        <MDBox style={{ marginTop: "2%" }}>
                          <MDBox>
                            &nbsp;
                            <MDInput
                              id="username"
                              variant="standard"
                              label="User Name"
                              type="text"
                              style={{ width: "45%" }}
                              onChange={(e) => setData({ ...data, username: e.target.value })}
                              defaultValue={data.username ? data.username : null}
                              required
                              // error={!data.username ? true : false}
                            />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <MDInput
                              variant="standard"
                              label="Full Name"
                              style={{ width: "45%" }}
                              onChange={(e) => setData({ ...data, fullname: e.target.value })}
                              defaultValue={data.fullname ? data.fullname : null}
                            />
                          </MDBox>
                          <MDBox>
                            &nbsp;
                            <MDInput
                              variant="standard"
                              label="Email Adress"
                              style={{ width: "45%", marginTop: "4%" }}
                              onChange={(e) => setData({ ...data, email: e.target.value })}
                              defaultValue={data.email ? data.email : null}
                            />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <MDInput
                              variant="standard"
                              label="Phone No."
                              style={{ width: "45%", marginTop: "4%" }}
                              onChange={(e) => setData({ ...data, phone: e.target.value })}
                              defaultValue={data.phone ? data.phone : null}
                            />
                          </MDBox>
                          <MDBox>
                            &nbsp;
                            <MDInput
                              variant="standard"
                              type="password"
                              label="Password"
                              style={{ width: "45%", marginTop: "4%" }}
                              onChange={(e) => setData({ ...data, password: e.target.value })}
                              defaultValue={data.password ? data.password : null}
                            />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <MDInput
                              variant="standard"
                              label="Confirm Password"
                              style={{ width: "45%", marginTop: "4%" }}
                            />
                          </MDBox>
                          <MDBox style={{ marginTop: "4%" }} textAlign="right ">
                            <MDButton variant="gradient" color="dark" size="large" onClick={nextok}>
                              Next
                            </MDButton>
                            &nbsp;&nbsp;
                          </MDBox>
                        </MDBox>
                      </MDBox>
                    ) : null}{" "}
                    {stage === 2 ? (
                      <MDBox>
                        <MDBox lineHeight={1} textAlign="left" style={{ marginTop: "4%" }}>
                          <MDTypography
                            display="block"
                            variant="caption"
                            color="text"
                            fontWeight="bold"
                            fontSize="20px"
                          >
                            Address
                          </MDTypography>
                          <MDTypography variant="caption">(Optional Information)</MDTypography>
                        </MDBox>
                        <MDBox>
                          <MDBox>
                            &nbsp;
                            <MDInput
                              variant="standard"
                              label="Address 1"
                              style={{ width: "100%" }}
                            />
                          </MDBox>
                          <MDBox>
                            &nbsp;
                            <MDInput
                              variant="standard"
                              label="Address 2"
                              style={{ width: "100%" }}
                            />
                          </MDBox>
                          <MDBox>
                            &nbsp;
                            <MDInput
                              variant="standard"
                              label="City"
                              style={{ width: "40%", marginTop: "4%" }}
                            />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <MDInput variant="standard" label="State" style={{ marginTop: "4%" }} />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <MDInput
                              variant="standard"
                              label="Pin Code"
                              style={{ marginTop: "4%" }}
                            />
                          </MDBox>
                          <MDBox style={{ marginTop: "4%" }} textAlign="right ">
                            <MDButton
                              size="large"
                              variant="gradient"
                              color="secondary"
                              onClick={prev}
                            >
                              Back
                            </MDButton>
                            &nbsp;&nbsp;&nbsp;
                            <MDButton variant="gradient" color="dark" size="large" onClick={nextok}>
                              Next
                            </MDButton>
                            &nbsp;&nbsp;
                          </MDBox>
                        </MDBox>
                      </MDBox>
                    ) : null}
                    {stage === 3 ? (
                      <MDBox>
                        <MDBox lineHeight={1} textAlign="left" style={{ marginTop: "4%" }}>
                          <MDTypography
                            display="block"
                            variant="caption"
                            color="text"
                            fontWeight="bold"
                            fontSize="20px"
                          >
                            Social
                          </MDTypography>
                          <MDTypography variant="caption">(Optional Information)</MDTypography>
                        </MDBox>
                        <MDBox>
                          <MDBox>
                            &nbsp;
                            <MDInput
                              variant="standard"
                              label="Instagram Handle"
                              style={{ width: "100%" }}
                            />
                          </MDBox>
                          <MDBox>
                            &nbsp;
                            <MDInput
                              variant="standard"
                              label="Facebook Handle"
                              style={{ width: "100%" }}
                            />
                          </MDBox>
                          <MDBox>
                            &nbsp;
                            <MDInput
                              variant="standard"
                              label="Twitter Handle"
                              style={{ width: "100%" }}
                            />
                          </MDBox>
                          <MDBox style={{ marginTop: "4%" }} textAlign="right ">
                            <MDButton
                              size="large"
                              variant="gradient"
                              color="secondary"
                              onClick={prev}
                            >
                              Back
                            </MDButton>
                            &nbsp;&nbsp;&nbsp;
                            <MDButton variant="gradient" color="dark" size="large" onClick={nextok}>
                              Next
                            </MDButton>
                            &nbsp;&nbsp;
                          </MDBox>
                        </MDBox>
                      </MDBox>
                    ) : null}
                    {stage === 4 ? (
                      <MDBox>
                        <MDBox lineHeight={1} textAlign="left" style={{ marginTop: "4%" }}>
                          <MDTypography
                            display="block"
                            variant="caption"
                            color="text"
                            fontWeight="bold"
                            fontSize="20px"
                          >
                            Designation
                          </MDTypography>
                          <MDTypography variant="caption">(Mandatory Information)</MDTypography>
                        </MDBox>
                        <MDBox style={{ marginTop: "2%" }}>
                          <MDBox>
                            &nbsp;
                            <MDInput
                              variant="standard"
                              label="Designation"
                              type="text"
                              style={{ width: "30%" }}
                              onChange={(e) => setData({ ...data, designation: e.target.value })}
                              defaultValue={data.designation ? data.designation : null}
                            />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <MDInput
                              variant="standard"
                              label="Department"
                              style={{ width: "30%" }}
                              onChange={(e) => setData({ ...data, department: e.target.value })}
                              defaultValue={data.department ? data.department : null}
                            />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <MDInput
                              variant="standard"
                              label="Employment Date"
                              type="date"
                              style={{ width: "20%" }}
                              onChange={(e) => setData({ ...data, employed: e.target.value })}
                              defaultValue={data.employed ? data.employed : "2000-01-01"}
                              // value="2022-03-25"
                            />
                          </MDBox>
                          <MDBox style={{ marginTop: "4%" }} textAlign="right ">
                            <MDButton
                              size="large"
                              variant="gradient"
                              color="secondary"
                              onClick={prev}
                            >
                              Back
                            </MDButton>
                            &nbsp;&nbsp;&nbsp;
                            <MDButton variant="gradient" color="dark" size="large" onClick={nextok}>
                              Next
                            </MDButton>
                            &nbsp;&nbsp;
                          </MDBox>
                        </MDBox>
                      </MDBox>
                    ) : null}
                    {stage === 5 ? (
                      <MDBox>
                        <MDBox lineHeight={1} textAlign="left" style={{ marginTop: "4%" }}>
                          <MDTypography
                            display="block"
                            variant="caption"
                            color="text"
                            fontWeight="bold"
                            fontSize="20px"
                          >
                            Profile Pic
                          </MDTypography>
                          <MDTypography variant="caption">(Optional Information)</MDTypography>
                        </MDBox>
                        <MDBox style={{ marginTop: "4%" }}>
                          <MDBox>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <img
                              id="img"
                              style={{ borderRadius: "100%" }}
                              width={"30%"}
                              height={"30%"}
                              src={
                                "https://w7.pngwing.com/pngs/498/275/png-transparent-silhouette-user-person-silhouette-cdr-animals-head.png"
                              }
                              onClick={handleClick}
                            />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <input
                              type="file"
                              style={{ width: "30%", marginTop: "12%" }}
                              onChange={preview}
                              ref={inputRef}
                            />
                          </MDBox>
                          <MDBox style={{ marginTop: "2%" }} textAlign="right ">
                            <MDButton
                              variant="gradient"
                              color="dark"
                              size="large"
                              onClick={handleSubmit}
                            >
                              Submit
                            </MDButton>
                            &nbsp;&nbsp;
                          </MDBox>
                        </MDBox>
                      </MDBox>
                    ) : null}
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

export default Adduser;
