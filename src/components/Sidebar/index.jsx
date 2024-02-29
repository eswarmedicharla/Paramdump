import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BiAnalyse, BiSearch } from "react-icons/bi";
import { useState } from "react";
import SidebarMenu from "../SidebarMenu";
import { LuLayoutDashboard } from "react-icons/lu";
import { TiTicket } from "react-icons/ti";
import { PiUserSwitchBold } from "react-icons/pi";

const routes = [
  // {

  //   ModuleName: "Paramarsh",
  //   icon: <LuLayoutDashboard />,
  // },
  {
    URL: "/DashBoard",
    ModuleName: "Task Pane",
    icon: <LuLayoutDashboard />,
  },
  {
    URL: "/TicketDetails",
    ModuleName: "Ticket Details",
    icon: <FaHome />,
  },
  {
    URL: "/Workflow",
    ModuleName: "Workflow",
    icon: <FaUser />,
  },
  {
    URL: "/Hybrid",
    ModuleName: "Hybrid",
    icon: <MdMessage />,
  },
  {
    URL: "/Category",
    ModuleName: "Category",
    icon: <BiAnalyse />,
  },
  {
    URL: "/SubCategory",
    ModuleName: "SubCategory",
    icon: <BiAnalyse />,
  },

  // {
  //   URL: "/settings",
  //   ModuleName: "Settings",
  //   icon: <BiCog />,
  //   exact: true,
  //   subRoutes: [
  //     {
  //       URL: "/settings/profile",
  //       ModuleName: "Profile ",
  //       icon: <FaUser />,
  //     },
  //     {
  //       URL: "/settings/2fa",
  //       ModuleName: "2FA",
  //       icon: <FaLock />,
  //     },
  //     {
  //       URL: "/settings/billing",
  //       ModuleName: "Billing",
  //       icon: <FaMoneyBill />,
  //     },
  //   ],
  // },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <div
        className="main-container"
        style={{ display: "flex", height: "100vh" }}
      >
        <div
          className={`sidebar `}
          style={{
            width: isOpen ? "250px" : "0px", // Set the width directly
            overflowY: "auto", // Add overflowY property to enable scrolling
            color: "white",
            height: "100vh",
            background: "rgb(0, 7, 61)",
          }}
        >
          {/* Sidebar content */}
          <div className="top_section">
            <div className="icon" style={{ fontSize: "28px" }}>
              <TiTicket />
            </div>
            <h1 className="logo">Paramarsh</h1>
          </div>
          <div
            className="switch-role"
            style={{ textAlign: "center", color: "#ffffff" }}
          >
            <span
              className="switch-icon"
              style={{ padding: "0 5px", fontSize: "17px", fontWeight: "600" }}
            >
              <PiUserSwitchBold />
            </span>
            <button
              style={{
                border: "none",
                backgroundColor: "transparent",
                color: "#ffffff",
              }}
            >
              Switch Role
            </button>
          </div>

          <section className="routes" style={{ height: "auto" }}>
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    key={index}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.URL}
                  key={index}
                  className="link"
                  activeClassName="active"
                >
                  <div className="icon">{route.icon}</div>
                  {isOpen && <div>{route.ModuleName}</div>}
                </NavLink>
              );
            })}
          </section>
        </div>

        <main
          style={{
            flex: 1,
            overflowY: "auto", // Add overflowY property to enable scrolling
          }}
        >
          {/* Main content */}
          {children}
          <footer></footer>
        </main>
      </div>
    </>
  );
};

export default SideBar;
