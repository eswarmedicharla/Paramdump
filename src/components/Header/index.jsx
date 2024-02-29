import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoIosSearch } from "react-icons/io";
//import $ from 'jquery';
//import 'datatables.net';
//import 'datatables.net-dt/css/jquery.dataTables.css';

// for Sidebar And Navbar
//import Search from '../Images/search.png';
//import Notification from '../images/notification.png';
//import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

const Header = ({ headerIcon, headerTitle }) => {
  const Session_userName = sessionStorage.getItem("userName");
  //sessionStorage.setItem("userName",userName);

  return (
    <div className="pannel nav" style={{ backgroundColor: "#dadada" }}>
      <div className="row col-12">
        <div
          className="col-4 d-flex align-items-center gap-6px"
          style={{ color: "#434343", fontSize: "13px", fontWeight: "bold" }}
        >
          <div
            className="header-icon"
            style={{ fontSize: "16px", lineHeight: "1px", marginRight: "3px" }}
          >
            {" "}
            {headerIcon}
          </div>
          <div className="header-title">{headerTitle}</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
