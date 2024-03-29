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

/** 
  All of the routes for the QuickSync Pro React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// QuickSync Pro React layouts
import Dashboard from "layouts/dashboard";
import Users from "layouts/tables";
import Adduser from "./layouts/Adduser/index";
import Billing from "layouts/billing";
import Edit from "./layouts/Edituser";
import RTL from "layouts/rtl";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import AddLeave from "layouts/AddLeave";
import ApplyLeave from "layouts/ApplyLeave";

// @mui icons
import Icon from "@mui/material/Icon";
import { Navigate } from "react-router-dom";
import Bill from "layouts/billing/components/Bill";
import Cookies from "js-cookie";
import MDAvatar from "components/MDAvatar";
import Leavecalender from "layouts/Leavecalender";

const routes = [
  {
    type: "collapse",
    name: "cookie",
    key: "profile",
    icon: "cookie",
    child: [
      {
        type: "route",
        name: "Profile",
        key: "profile",
        icon: <Icon fontSize="small">person</Icon>,
        route: "/profile",
        component: <Profile />,
      },
      {
        type: "route",
        name: "Settings",
        key: "editprofile",
        icon: <Icon fontSize="small">settings</Icon>,
        route: "/editprofile",
        component: <Edit />,
      },
    ],
  },
  {
    type: "divider",
  },
  {
    type: "collapse",
    name: "Home",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "divider",
  },
  {
    type: "title",
    title: "HR Module",
  },
  {
    type: "route",
    name: "Users",
    key: "users",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/users",
    component: <Users />,
  },
  {
    type: "collapse",
    name: "Users",
    key: "user",
    icon: <Icon fontSize="small">table_view</Icon>,
    // route: "/users",
    // component: <Users />,
    child: [
      {
        type: "route",
        name: "Add User",
        key: "additem",
        icon: <Icon fontSize="small">route</Icon>,
        route: "/additem",
        component: <Adduser />,
      },
      {
        type: "collapse",
        name: "Users List",
        key: "users",
        icon: <Icon fontSize="small">table_view</Icon>,
        route: "/users",
        component: <Users />,
      },
    ],
  },
  {
    type: "route",
    name: "Add Leave",
    key: "AddLeave",
    icon: <Icon fontSize="small">add_box</Icon>,
    route: "/AddLeave",
    component: <AddLeave />,
  },
  {
    type: "route",
    name: "Apply Leave",
    key: "ApplyLeave",
    icon: <Icon fontSize="small">padding</Icon>,
    route: "/ApplyLeave",
    component: <ApplyLeave />,
  },
  {
    type: "collapse",
    name: "Leaves",
    key: "ApplyLeave",
    icon: <Icon fontSize="small">padding</Icon>,
    child: [
      {
        type: "collapse",
        name: "Add Leave",
        key: "AddLeave",
        icon: <Icon fontSize="small">add_box</Icon>,
        route: "/AddLeave",
        component: <AddLeave />,
      },
      {
        type: "collapse",
        name: "Apply Leave",
        key: "ApplyLeave",
        icon: <Icon fontSize="small">padding</Icon>,
        route: "/ApplyLeave",
        component: <ApplyLeave />,
      },
      {
        type: "collapse",
        name: "Leave Calender",
        key: "leavecalender",
        icon: <Icon fontSize="small">padding</Icon>,
        route: "/leavecalender",
        component: <Leavecalender />,
      },
    ],
  },
  {
    type: "divider",
  },
  {
    type: "route",
    name: "Leave Calender",
    key: "leavecalender",
    icon: <Icon fontSize="small">padding</Icon>,
    route: "/leavecalender",
    component: <Leavecalender />,
  },
  {
    type: "route",
    name: "additem",
    key: "additem",
    icon: <Icon fontSize="small">route</Icon>,
    route: "/additem",
    component: <Adduser />,
  },
  {
    type: "route",
    name: "editprofile",
    key: "editprofile",
    icon: <Icon fontSize="small"></Icon>,
    route: "/editprofile",
    component: <Edit />,
  },
  // {
  //   type: "collapse",
  //   name: "Notifications",
  //   key: "notifications",
  //   icon: <Icon fontSize="small">notifications</Icon>,
  //   route: "/notifications",
  //   component: <Notifications />,
  // },
  {
    type: "route",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  // {
  //   type: "route",
  //   name: "Sign In",
  //   key: "sign-in",
  //   icon: <Icon fontSize="small">login</Icon>,
  //   route: "/authentication/sign-in",
  //   component: <SignIn />,
  // },
  // {
  //   type: "collapse",
  //   name: "Sign Up",
  //   key: "sign-up",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/authentication/sign-up",
  //   component: <SignUp />,
  // },
];

export default routes;
