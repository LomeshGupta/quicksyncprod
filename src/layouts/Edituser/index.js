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
import Grid from "@mui/material/Grid";
import {
  // useMaterialUIController,
  setOpenConfigurator,
  setTransparentSidenav,
  setWhiteSidenav,
  setFixedNavbar,
  setSidenavColor,
  setDarkMode,
} from "context";

// QuickSync Pro React components
import Switch from "@mui/material/Switch";
import MDBox from "components/MDBox";
import Cookies from "js-cookie";
import Card from "@mui/material/Card";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import { useMaterialUIController } from "context";
import MDAvatar from "components/MDAvatar";

// QuickSync Pro React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MasterCard from "examples/Cards/MasterCard";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";

function Billing() {
  const [controller, dispatch] = useMaterialUIController();
  const { darkMode } = controller;
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleDarkMode = () => setDarkMode(dispatch, !darkMode);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox position="relative" mb={5}>
        <Card
          sx={{
            position: "relative",
            mt: 5,
            mx: 3,
            py: 2,
            px: 2,
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item>
              <MDAvatar src={Cookies.get("photo")} alt="profile-image" size="xl" shadow="sm" />
            </Grid>
            <Grid item>
              <MDBox height="100%" mt={0.5} lineHeight={1}>
                <MDTypography variant="h5" fontWeight="medium">
                  {Cookies.get("fullname")}
                </MDTypography>
                <MDTypography variant="button" color="text" fontWeight="regular">
                  {Cookies.get("designation") + " / " + Cookies.get("department")}
                </MDTypography>
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4} sx={{ ml: "auto" }}>
              <MDTypography variant="button" color="text" fontWeight="regular">
                Dark Mode
              </MDTypography>
              <Switch checked={darkMode} onChange={handleDarkMode} />
            </Grid>
          </Grid>
        </Card>
      </MDBox>
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
              User Information
            </MDTypography>
            {/* <MDTypography variant="caption">Mandatory informations</MDTypography> */}
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
                required
                defaultValue={Cookies.get("username")}
              />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <MDInput
                variant="standard"
                label="Full Name"
                style={{ width: "45%" }}
                defaultValue={Cookies.get("fullname")}
              />
            </MDBox>
            <MDBox>
              &nbsp;
              <MDInput
                variant="standard"
                label="Email Adress"
                style={{ width: "45%", marginTop: "4%" }}
                defaultValue={Cookies.get("email")}
              />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <MDInput
                variant="standard"
                label="Phone No."
                style={{ width: "45%", marginTop: "4%" }}
                defaultValue={Cookies.get("phone")}
              />
            </MDBox>
            <MDBox>
              <MDBox>
                &nbsp;
                <MDInput variant="standard" label="Address 1" style={{ width: "100%" }} />
              </MDBox>
              <MDBox>
                &nbsp;
                <MDInput variant="standard" label="Address 2" style={{ width: "100%" }} />
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
                <MDInput variant="standard" label="Pin Code" style={{ marginTop: "4%" }} />
              </MDBox>
            </MDBox>
            <MDBox style={{ marginTop: "4%" }} textAlign="right ">
              <MDButton variant="gradient" color="dark" size="large">
                Save
              </MDButton>
              &nbsp;&nbsp;
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </DashboardLayout>
  );
}

export default Billing;
