import React, { useState } from "react";
import { FaBars, FaTh, FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const StudSidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const menuItem = [
    {
      path: "/studentDashboard",
      name: "Dashboard",
      icon: <FaTh />,
    },
    {
      path: "/stud-results",
      name: "Results",
      icon: <FaUser />,
    },
    {
      path: "/stud-fees",
      name: "Fees-Details",
      icon: <FaUser />,
    },{
      path: "/libraryDetails",
      name: "Library-Details",
      icon: <FaUser/>
    },{
      path: "/leaveApplication",
      name: "Leave Details",
      icon: <FaUser/>
    },
    {
      path: "/facultyInfo",
      name: "Faculty Details",
      icon: <FaUser/>
    },

  ];
  return (
    <>
     <div className="top-nav">
        <FaBars style={{ color: "white",cursor:"pointer", fontSize:"20px", margin:"8px"}} onClick={toggle} />
        <h4 className="top-text">Student Dashboard</h4>
      </div>
      <div>
        <div style={{ width: isOpen ? "200px" : "45px" }} className="sidebar" >
          <div className="top_section">
            
          </div>
          {menuItem.map((item, index) => (
            <NavLink to={item.path} key={index} className="link">
              <div className="icon">{item.icon}</div>
              <div className="link_text">{item.name}</div>
            </NavLink>
          ))}
        </div>
        <main>{children}</main>
      </div>
    </>
  );
};

export const isOpen = () => {
  return isOpen;
};
export default StudSidebar;
