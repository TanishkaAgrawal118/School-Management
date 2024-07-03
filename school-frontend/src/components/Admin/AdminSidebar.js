import React, { useState } from "react";
import { FaBars, FaTh, FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { FaBookOpenReader } from "react-icons/fa6";

const AdminSidebar = ({ children }) => {
    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => {
      setIsOpen(!isOpen);
    };
    const menuItem = [
      {
        path: "/adminDashboard",
        name: "Dashboard",
        icon: <FaTh />,
      },
      {
        path: "/add-student",
        name: "Add Student",
        icon: <FaUser />,
      },
      {
        path: "/add-faculty",
        name: "Add Faculty",
        icon: <FaUser />,
      },
      {
        path: "/createNotice",
        name: "Create Notice",
        icon: <FaUser />,
      },
      {
        path: "/updateData",
        name: "List Student",
        icon: <FaUser />,
      },
      {
        path: "/facultyFee",
        name: "List Faculty",
        icon: <FaUser />,
      },

    ];
    return (
      <>
        <div className="top-nav">
          <FaBars style={{ color: "white",cursor:"pointer", fontSize:"20px", margin:"8px"}} onClick={toggle} />
          <h4 className="top-text">Admin Dashboard</h4>
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
  export default AdminSidebar;