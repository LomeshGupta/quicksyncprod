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
import { useState, useEffect } from "react";
import RiseLoader from "react-spinners/RiseLoader";
import { ToastContainer, toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";
import MDBox from "components/MDBox";
import Cookies from "js-cookie";
import Card from "@mui/material/Card";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import { useMaterialUIController } from "context";
import MDAvatar from "components/MDAvatar";
import { Lightbox } from "react-modal-image";

// QuickSync Pro React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MasterCard from "examples/Cards/MasterCard";
import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import { Cookie } from "@mui/icons-material";
// import Select from "react-select";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

function Edituser() {
  const [openImg, setImg] = useState(false);
  const [controller, dispatch] = useMaterialUIController();
  const { darkMode } = controller;
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleDarkMode = () => setDarkMode(dispatch, !darkMode);
  const closeLightbox = () => setImg(false);
  const OpenLightbox = () => setImg(true);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const [data2, setData2] = useState({});
  const navigate = useNavigate();

  const handleupdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // alert(JSON.stringify(data2));

    const response = await fetch("https://quicksync.onrender.com/api/users/updateuser", {
      method: "POST",
      body: JSON.stringify(data2),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    if (response.ok) {
      setIsLoading(false);
      toast.success("Updated Successfully.");
      // navigate("/profile");
    } else {
      setIsLoading(false);
      toast.error(result.message);
    }
    data2.username ? Cookies.set("username", data2.username, { expires: 0.2 }) : null;
    data2.fullname ? Cookies.set("fullname", data2.fullname, { expires: 0.2 }) : null;
    data2.employed ? Cookies.set("employed", data2.employed, { expires: 0.2 }) : null;
    data2.email ? Cookies.set("email", data2.email, { expires: 0.2 }) : null;
    data2.designation ? Cookies.set("designation", data2.designation, { expires: 0.2 }) : null;
    data2.department ? Cookies.set("department", data2.department, { expires: 0.2 }) : null;
    data2.phone ? Cookies.set("phone", data2.phone, { expires: 0.2 }) : null;
    data2.address1 ? Cookies.set("address1", data2.address1, { expires: 0.2 }) : null;
    data2.address2 ? Cookies.set("address2", data2.address2, { expires: 0.2 }) : null;
    data2.city ? Cookies.set("city", data2.city, { expires: 0.2 }) : null;
    data2.state ? Cookies.set("state", data2.state, { expires: 0.2 }) : null;
    data2.pincode ? Cookies.set("pincode", data2.pincode, { expires: 0.2 }) : null;
    data2.insta ? Cookies.set("insta", data2.insta, { expires: 0.2 }) : null;
    data2.facebook ? Cookies.set("facebook", data2.facebook, { expires: 0.2 }) : null;
    data2.twitter ? Cookies.set("twitter", data2.twitter, { expires: 0.2 }) : null;
    data2.bio ? Cookies.set("bio", data2.bio, { expires: 0.2 }) : null;
  };

  const handlePasschange = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await fetch("https://quicksync.onrender.com/api/users/changepass", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log(result);
    if (response.ok) {
      setIsLoading(false);
      navigate("/profile");
    } else {
      setIsLoading(false);
      toast.error(result.message);
    }
  };

  useEffect(() => {
    setData2({ ...data2, _id: Cookies.get("id") });
    setData({ ...data, _id: Cookies.get("id") });
  }, []);

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
              <MDAvatar
                src={Cookies.get("photo")}
                alt="profile-image"
                size="xl"
                shadow="sm"
                onClick={OpenLightbox}
              />
              {openImg ? (
                <Lightbox
                  large={Cookies.get("photo")}
                  hideZoom
                  hideDownload
                  onClose={closeLightbox}
                />
              ) : null}
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
            <Grid item xs={12} md={6} lg={3} sx={{ ml: "auto" }}>
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
              Basic Information
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
                onChange={(e) => setData2({ ...data2, username: e.target.value })}
                required
                defaultValue={Cookies.get("username")}
              />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <MDInput
                variant="standard"
                label="Full Name"
                style={{ width: "45%" }}
                defaultValue={Cookies.get("fullname")}
                onChange={(e) => setData2({ ...data2, fullname: e.target.value })}
              />
              {/* <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-simple-select-standard-label">Age</InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  // value={age}
                  // onChange={handleChange}
                  label="Age"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl> */}
            </MDBox>
            <MDBox>
              &nbsp;
              <MDInput
                variant="standard"
                label="Email Adress"
                style={{ width: "45%", marginTop: "4%" }}
                defaultValue={Cookies.get("email")}
                onChange={(e) => setData2({ ...data2, email: e.target.value })}
              />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <MDInput
                variant="standard"
                label="Phone No."
                style={{ width: "45%", marginTop: "4%" }}
                defaultValue={Cookies.get("phone")}
                onChange={(e) => setData2({ ...data2, phone: e.target.value })}
              />
            </MDBox>
            <MDBox>
              <MDBox>
                &nbsp;
                <MDInput
                  variant="standard"
                  label="Address 1"
                  defaultValue={Cookies.get("address1")}
                  onChange={(e) => setData2({ ...data2, address1: e.target.value })}
                  style={{ width: "100%" }}
                />
              </MDBox>
              <MDBox>
                &nbsp;
                <MDInput
                  variant="standard"
                  label="Address 2"
                  defaultValue={Cookies.get("address2")}
                  onChange={(e) => setData2({ ...data2, address2: e.target.value })}
                  style={{ width: "100%" }}
                />
              </MDBox>
              <MDBox>
                &nbsp;
                <MDInput
                  variant="standard"
                  label="City"
                  defaultValue={Cookies.get("city")}
                  style={{ width: "40%", marginTop: "4%" }}
                  onChange={(e) => setData2({ ...data2, city: e.target.value })}
                />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <MDInput
                  variant="standard"
                  label="State"
                  defaultValue={Cookies.get("state")}
                  onChange={(e) => setData2({ ...data2, state: e.target.value })}
                  style={{ marginTop: "4%" }}
                />
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <MDInput
                  variant="standard"
                  label="Pin Code"
                  defaultValue={Cookies.get("pincode")}
                  onChange={(e) => setData2({ ...data2, pincode: e.target.value })}
                  style={{ marginTop: "4%" }}
                />
              </MDBox>
            </MDBox>
            <MDBox>
              <MDBox>
                <MDBox>
                  &nbsp;
                  <MDInput
                    variant="standard"
                    label="Instagram Handle"
                    defaultValue={Cookies.get("insta")}
                    onChange={(e) => setData2({ ...data2, insta: e.target.value })}
                    style={{ width: "100%" }}
                  />
                </MDBox>
                <MDBox>
                  &nbsp;
                  <MDInput
                    variant="standard"
                    label="Facebook Handle"
                    defaultValue={Cookies.get("facebook")}
                    onChange={(e) => setData2({ ...data2, facebook: e.target.value })}
                    style={{ width: "100%" }}
                  />
                </MDBox>
                <MDBox>
                  &nbsp;
                  <MDInput
                    variant="standard"
                    label="Twitter Handle"
                    defaultValue={Cookies.get("twitter")}
                    onChange={(e) => setData2({ ...data2, twitter: e.target.value })}
                    style={{ width: "100%" }}
                  />
                </MDBox>
                <MDBox style={{ marginTop: "" }}>
                  &nbsp;
                  <MDInput
                    label="Add Something about yourself here..."
                    multiline
                    rows={5}
                    defaultValue={Cookies.get("bio")}
                    onChange={(e) => setData2({ ...data2, bio: e.target.value })}
                    style={{ width: "100%" }}
                  />
                </MDBox>
              </MDBox>
            </MDBox>
            <MDBox style={{ marginTop: "4%" }} textAlign="right ">
              <MDButton variant="gradient" color="dark" size="large" onClick={handleupdate}>
                Save
              </MDButton>
              &nbsp;&nbsp;
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
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
              Change Password
            </MDTypography>
            {/* <MDTypography variant="caption">Mandatory informations</MDTypography> */}
          </MDBox>
          <MDBox style={{ marginTop: "" }}>
            <MDBox>
              <MDBox>
                &nbsp;
                <MDInput
                  variant="outlined"
                  type="password"
                  label="Current Password"
                  style={{ width: "100%" }}
                  onChange={(e) => setData({ ...data, oldPassword: e.target.value })}
                />
              </MDBox>
              <MDBox>
                &nbsp;
                <MDInput
                  variant="outlined"
                  type="password"
                  label="New Password"
                  style={{ width: "100%" }}
                  onChange={(e) => setData({ ...data, password: e.target.value })}
                />
              </MDBox>
              <MDBox>
                &nbsp;
                <MDInput
                  variant="outlined"
                  type="password"
                  label="Confirm New Password"
                  style={{ width: "100%" }}
                />
              </MDBox>
            </MDBox>
            <MDBox style={{ marginTop: "1%" }} textAlign="right ">
              <MDButton variant="gradient" color="dark" size="small" onClick={handlePasschange}>
                Update Password
              </MDButton>
              &nbsp;&nbsp;
            </MDBox>
          </MDBox>
        </MDBox>
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
      </Card>
    </DashboardLayout>
  );
}

export default Edituser;
