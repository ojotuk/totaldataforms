import { Link } from "react-router-dom";
import React, { useRef } from "react";
import logo from "./../../components/style/total data logo.webp";

// import { useRouter } from "next/router";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";

import "./sidebar.css";

export default function SideBar({ navToggle, setNavToggle }) {
  return (
    <ProSidebar
      className="mobile-nav"
      collapsed={false}
      toggled={navToggle}
      breakPoint="lg"
      onToggle={() => setNavToggle(false)}
    >
      <SidebarHeader className='pb-4'>
        <br></br>
        <a
          href="https://totaldatalimited.com"
          className='p-4'
        >
          <img src={logo} alt="logo" width="200px" />
        </a>
        <br></br>
      </SidebarHeader>
      <SidebarContent>
        <Menu iconShape="round">
          <MenuItem icon={<i className="fa fa-arrow-right"></i>}>
            <Link to="/">Tax Card</Link>
          </MenuItem>
        </Menu>
        <Menu iconShape="round">
          <MenuItem icon={<i className="fa fa-arrow-right"></i>}>
            <Link to="/nhf">NHF Update</Link>
          </MenuItem>
        </Menu>
        <Menu iconShape="round">
          <MenuItem icon={<i className="fa fa-arrow-right"></i>}>
            <Link to="/pension">Pension</Link>
          </MenuItem>
        </Menu>
        <Menu iconShape="round">
          <MenuItem icon={<i className="fa fa-arrow-right"></i>}>
            <Link to="/commitment">Commitment</Link>
          </MenuItem>
        </Menu>
      </SidebarContent>
      <SidebarFooter>
        <div>
        <div className="mb-2 mt-2 ml-2">&copy; 2021</div>
        </div>
      </SidebarFooter>
    </ProSidebar>
  );
}
