import React, { useState } from "react";
import { FaBars, FaTh, FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { FaBookOpenReader } from "react-icons/fa6";

const FacultySidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const menuItem = [
    {
      path: "/facultyDashboard",
      name: "Dashboard",
      icon: <FaTh />,
    },
    {
      path: "/result",
      name: "Result",
      icon: <FaUser />,
    },
    {
        path:"/attendance",
        name: "Attendance",
        icon: <FaBookOpenReader/>
    },
    {
      path:"/facultyLibrary",
      name: "Library Details",
      icon: <FaBookOpenReader/>
    },
    {
      path:"/facultyLeave",
      name: "Leave Details",
      icon: <FaBookOpenReader/>
    }, 
    {
      path:"/resultList",
      name: "Result List",
      icon: <FaBookOpenReader/>
    }
  ];
  return (
    <>
      <div className="top-nav">
        <FaBars style={{ color: "white",cursor:"pointer", fontSize:"20px", margin:"8px"}} onClick={toggle} />
        <h4 className="top-text">Faculty Dashboard</h4>
      </div>
      <div>
        <div style={{ width: isOpen ? "200px" : "45px" }} className="sidebar">
          <div className="top_section"></div>
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
export default FacultySidebar;
