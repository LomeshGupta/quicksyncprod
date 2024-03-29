/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.quicksyncpro.netlify.app//product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.quicksyncpro.netlify.app/)

Coded by www.quicksyncpro.netlify.app/

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from "react";
import RiseLoader from "react-spinners/RiseLoader";
import Switch from "@mui/material/Switch";

// react-router components
import { useLocation, Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";

// @material-ui core components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import Icon from "@mui/material/Icon";
import { Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
// import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import {
  // useMaterialUIController,
  // setOpenConfigurator,
  setTransparentSidenav,
  setWhiteSidenav,
  setFixedNavbar,
  setSidenavColor,
  setDarkMode,
} from "context";

// Material Dashboard 2 React example components
import Breadcrumbs from "examples/Breadcrumbs";
import NotificationItem from "examples/Items/NotificationItem";

// Custom styles for DashboardNavbar
import {
  navbar,
  navbarContainer,
  navbarRow,
  navbarIconButton,
  navbarMobileMenu,
} from "examples/Navbars/DashboardNavbar/styles";

// Material Dashboard 2 React context
import {
  useMaterialUIController,
  setTransparentNavbar,
  setMiniSidenav,
  setOpenConfigurator,
} from "context";

function DashboardNavbar({ absolute, light, isMini }) {
  const [isLoading, setIsLoading] = useState(false);
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator, darkMode } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const route = useLocation().pathname.split("/").slice(1);

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }
    //lomesh
    // A function that sets the transparent state of the navbar.
    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    /** 
     The event listener that's calling the handleTransparentNavbar function when 
     scrolling the window.
    */
    window.addEventListener("scroll", handleTransparentNavbar);

    // Call the handleTransparentNavbar function to set the state with the initial value.
    handleTransparentNavbar();

    // Remove event listener on cleanup
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);
  const handleOpenProfile = (event) => setOpenProfile(event.currentTarget);
  const handleCloseProfile = () => setOpenProfile(false);
  const navigate = useNavigate();

  // Render the notifications menu
  const renderMenu = () => (
    <Menu
      anchorEl={openMenu}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openMenu)}
      onClose={handleCloseMenu}
      sx={{ mt: 2 }}
    >
      <NotificationItem icon={<Icon>email</Icon>} title="Check new messages" />
      <NotificationItem icon={<Icon>podcasts</Icon>} title="Manage Podcast sessions" />
      <NotificationItem icon={<Icon>shopping_cart</Icon>} title="Payment successfully completed" />
    </Menu>
  );
  const url = "https://quicksync.onrender.com/api/users/logout";
  const logouthandler = async (e) => {
    setIsLoading(true);
    const resp = await fetch(url, {
      method: "GET",
    });
    const result = await resp.json();
    console.log(result);
    if (resp.ok) {
      setIsLoading(false);
      toast.success(result.message);
      Cookies.remove("username");
      Cookies.remove("id");
      Cookies.remove("photo");
      Cookies.remove("token");
      Cookies.remove("fullname");
      Cookies.remove("employed");
      Cookies.remove("email");
      Cookies.remove("designation");
      Cookies.remove("department");
      Cookies.remove("phone");
      navigate("/authentication/sign-in");
    }
  };

  const renderProfile = () => (
    <Menu
      anchorEl={openProfile}
      anchorReference={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={Boolean(openProfile)}
      onClose={handleCloseProfile}
      sx={{ mt: 2 }}
    >
      <Link to="/profile">
        <NotificationItem icon={<Icon>person</Icon>} title="Profile" />
      </Link>
      <NotificationItem icon={<Icon>logout</Icon>} onClick={logouthandler} title="Logout" />
    </Menu>
  );

  // Styles for the navbar icons
  const iconsStyle = ({ palette: { dark, white, text }, functions: { rgba } }) => ({
    color: () => {
      let colorValue = light || darkMode ? white.main : dark.main;

      if (transparentNavbar && !light) {
        colorValue = darkMode ? rgba(text.main, 0.6) : text.main;
      }

      return colorValue;
    },
  });

  const handleDarkMode = () => setDarkMode(dispatch, !darkMode);

  return (
    <AppBar
      position={absolute ? "absolute" : navbarType}
      color="inherit"
      sx={(theme) => navbar(theme, { transparentNavbar, absolute, light, darkMode })}
    >
      <Toolbar sx={(theme) => navbarContainer(theme)}>
        <MDBox color="inherit" mb={{ xs: 1, md: 0 }} sx={(theme) => navbarRow(theme, { isMini })}>
          <Breadcrumbs icon="home" title={route[route.length - 1]} route={route} light={light} />
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
        {isMini ? null : (
          <MDBox sx={(theme) => navbarRow(theme, { isMini })}>
            <MDBox pr={1}>
              <MDInput label="Search here" />
            </MDBox>
            <MDBox color={light ? "white" : "inherit"}>
              {renderProfile()}
              <IconButton
                sx={navbarIconButton}
                size="small"
                disableRipple
                onClick={handleOpenProfile}
              >
                <Icon sx={iconsStyle}>account_circle</Icon>
              </IconButton>
              {/* <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarMobileMenu}
                onClick={handleMiniSidenav}
              >
                <Icon sx={iconsStyle} fontSize="medium">
                  {miniSidenav ? "menu open" : "menu"}
                </Icon>
              </IconButton> */}
              <Link to="/editprofile">
                <IconButton
                  size="small"
                  disableRipple
                  color="inherit"
                  sx={navbarIconButton}
                  // onClick={handleConfiguratorOpen}
                >
                  <Icon sx={iconsStyle}>settings</Icon>
                </IconButton>
              </Link>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleOpenMenu}
              >
                <Icon sx={iconsStyle}>notifications</Icon>
              </IconButton>
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                aria-controls="notification-menu"
                aria-haspopup="true"
                variant="contained"
                onClick={handleDarkMode}
              >
                <Icon sx={iconsStyle}>light_mode</Icon>
              </IconButton>
              {renderMenu()}
              <IconButton
                size="small"
                disableRipple
                color="inherit"
                sx={navbarIconButton}
                onClick={handleMiniSidenav}
              >
                <Icon sx={iconsStyle} fontSize="medium">
                  {miniSidenav ? "menu open" : "menu"}
                </Icon>
              </IconButton>
              {/* <Switch checked={darkMode} onChange={handleDarkMode} /> */}
            </MDBox>
            <div>
              <ToastContainer style={{ fontSize: "70%" }} />
            </div>
          </MDBox>
        )}
      </Toolbar>
    </AppBar>
  );
}

// Setting default values for the props of DashboardNavbar
DashboardNavbar.defaultProps = {
  absolute: false,
  light: false,
  isMini: false,
};

// Typechecking props for the DashboardNavbar
DashboardNavbar.propTypes = {
  absolute: PropTypes.bool,
  light: PropTypes.bool,
  isMini: PropTypes.bool,
};

export default DashboardNavbar;
