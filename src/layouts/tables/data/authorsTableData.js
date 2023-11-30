/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import React, { useState, useEffect } from "react";
import { FaMinusCircle } from "react-icons/fa";
import { format } from "date-fns";
import dateFormat from "dateformat";
import { stringify } from "stylis";

export default function data() {
  const url = "https://quicksync.onrender.com/api/users/getusers";
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  let [status, setStatus] = useState(null);

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
    fetchInfo();
  }, []);

  async function deleteUser(param) {
    setStatus(null); // clear status on retrigger
    setIsLoading(true);
    try {
      console.log(param);
      const obj = { username: param };
      // delete user endpoint
      const res = await fetch("https://quicksync.onrender.com/api/users/deleteuser", {
        method: "POST",
        body: JSON.stringify(obj),
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
      // console.log("error occurred", err);
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
        designation: <Job title={user.designation} description={user.department} />,
        username: user.username.toUpperCase(),
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        employed: (
          <MDTypography component="p" href="#" variant="caption" color="text" fontWeight="medium">
            {user.employed ? dateFormat(user.employed, "mmmm dS, yyyy") : null}
          </MDTypography>
        ),
        action: (
          <MDTypography
            component="button"
            onClick={() => deleteUser(user.username)}
            variant="caption"
            border="0"
            borderRadius="50%"
            boxShadow="3px 0px 5px rgba(81,67,21,0.8)"
            opacity="0.8"
          >
            <FaMinusCircle
              style={{
                fontSize: "200%",
                borderRadius: "50%",
                color: "#8B0000",
                border: "0",
                backgroundColor: "transparent",
              }}
            />
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
    loading: isLoading,
  };
}
