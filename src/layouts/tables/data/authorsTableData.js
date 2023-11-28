/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import React, { useState, useEffect } from "react";
import { stringify } from "stylis";

export default function data() {
  const url = "https://quicksync.onrender.com/api/users/getusers";
  const [data, setData] = useState([]);
  let [status, setStatus] = useState(null);

  const fetchInfo = () => {
    return fetch(url)
      .then((res) => res.json())
      .then((d) => setData(d))
      .catch();
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  async function deleteUser(param) {
    setStatus(null); // clear status on retrigger
    try {
      console.log(param);
      // delete user endpoint
      const res = await fetch("https://quicksync.onrender.com/api/users/deleteuser", {
        method: "POST",
        body: {
          username: param,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      setStatus({
        type: "pass",
        status: res.status,
        message: `${param} deleted`,
      });

      // if deletion is successful reload the table after x seconds
      setTimeout(function () {
        fetchInfo();
      }, 3000);
    } catch (err) {
      console.log("error occurred", err);
      setStatus({
        type: "fail",
        message: err.message,
      });
    }
  }

  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );

  const row = [];

  {
    data.map((user, index) => {
      row.push({
        user: <Author image={user.photo} name={user.fullname} email={user.email} />,
        designation: <Job title="Consultant" description="Techincal" />,
        username: user.username,
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="p" href="#" variant="caption" color="text" fontWeight="medium">
            14/09/23
          </MDTypography>
        ),
        action: (
          <MDTypography
            component="button"
            onClick={() => deleteUser(user.username)}
            variant="caption"
            color="text"
            fontWeight="medium"
          >
            Delete
          </MDTypography>
        ),
      });
    });
  }
  return {
    columns: [
      { Header: "user", accessor: "user", width: "25%", align: "left" },
      { Header: "designation", accessor: "designation", align: "left" },
      { Header: "User Name", accessor: "username", width: "15%", align: "left" },
      { Header: "Status", accessor: "status", align: "left" },
      { Header: "employed", accessor: "employed", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],
    rows: row,
  };
}
