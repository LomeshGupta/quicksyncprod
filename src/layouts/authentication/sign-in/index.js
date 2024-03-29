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

import React, { useState, useEffect, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import RiseLoader from "react-spinners/RiseLoader";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// QuickSync Pro React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import { ToastContainer, toast } from "react-toastify";
// import { CookiesProvider, useCookies } from "react-cookie";
import Cookies from "js-cookie";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { Cookie } from "@mui/icons-material";

function Basic() {
  // const [rememberMe, setRememberMe] = useState(false);

  // const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const response = await fetch("https://quicksync.onrender.com/api/users/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log(result);
    // setIsLoading(false);

    if (response.ok) {
      Cookies.set("username", result.username, { expires: 0.2 });
      Cookies.set("id", result._id, { expires: 0.2 });
      Cookies.set("photo", result.photo, { expires: 0.2 });
      Cookies.set("fullname", result.fullname, { expires: 0.2 });
      Cookies.set("employed", result.employed, { expires: 0.2 });
      Cookies.set("email", result.email, { expires: 0.2 });
      Cookies.set("designation", result.designation, { expires: 0.2 });
      Cookies.set("department", result.department, { expires: 0.2 });
      Cookies.set("phone", result.phone, { expires: 0.2 });
      Cookies.set("address1", result.address1, { expires: 0.2 });
      Cookies.set("address2", result.address2, { expires: 0.2 });
      Cookies.set("city", result.city, { expires: 0.2 });
      Cookies.set("state", result.state, { expires: 0.2 });
      Cookies.set("pincode", result.pincode, { expires: 0.2 });
      Cookies.set("insta", result.insta, { expires: 0.2 });
      Cookies.set("facebook", result.facebook, { expires: 0.2 });
      Cookies.set("twitter", result.twitter, { expires: 0.2 });
      Cookies.set("bio", result.bio, { expires: 0.2 });
      Cookies.set("token", result.token, { expires: 0.2 });
      setIsLoading(false);
      if (Cookies.get("fullname")) {
        navigate("/");
      }
    } else {
      setIsLoading(false);
      toast.error(result.message);
    }
  };

  return (
    <BasicLayout
      image={
        "https://images.unsplash.com/photo-1547444196-2ea3ce201cc6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      }
    >
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
        </MDBox>
        <div>
          <ToastContainer style={{ fontSize: "70%" }} />
        </div>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput
                type="name"
                label="Username"
                fullWidth
                onChange={(e) => setData({ ...data, username: e.target.value })}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                fullWidth
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
            </MDBox>
            {/* <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox> */}
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" type="submit" color="info" fullWidth>
                sign in
              </MDButton>
            </MDBox>
            {/* <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox> */}
            {isLoading ? (
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
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
