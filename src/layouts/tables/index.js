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
import Card from "@mui/material/Card";
import React, { useState, useEffect, CSSProperties } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import RiseLoader from "react-spinners/RiseLoader";

// QuickSync Pro React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// QuickSync Pro React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { Col, Button, Row, Container, Form } from "react-bootstrap";

// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
// import projectsTableData from "layouts/tables/data/projectsTableData";

function Tables() {
  const { columns, rows, loading } = authorsTableData();
  // const { columns: pColumns, rows: pRows } = projectsTableData();

  // const url = "https://quicksync.onrender.com/api/users/getusers";
  // const [data, setData] = useState([]);

  // const fetchInfo = () => {
  //   return fetch(url)
  //     .then((res) => res.json())
  //     .then((d) => setData(d))
  //     .catch();
  // };

  // useEffect(() => {
  //   fetchInfo();
  // }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div className="button-container" style={{ display: "flex" }}>
        <a href="/additem" style={{ textDecoration: "none", marginRight: "2%" }}>
          <Button type="button" variant="primary" className="btn btn-default  ribbon">
            + Add Users
          </Button>
        </a>
        {/* <a href="/uom" style={{ textDecoration: "none", marginRight: "2%" }}>
          <p className="card-description"> Unit of Measure </p>
        </a> */}
      </div>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
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
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={true}
                  entriesPerPage={true}
                  showTotalEntries={true}
                  noEndBorder
                />
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
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
