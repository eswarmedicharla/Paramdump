import React from "react";
import SideBar from "../../components/Sidebar";
import Header from "../../components/Header";
import "bootstrap/dist/css/bootstrap.min.css";

const index = ({ content, headerIcon, headerTitle }) => {
  return (
    <SideBar>
      <Header headerTitle={headerTitle} headerIcon={headerIcon} />
      {/* <div className='col-12 pannel'></div> */}
      <div className="col-12">{content}</div>
    </SideBar>
  );
};

export default index;
