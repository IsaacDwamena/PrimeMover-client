import "./Manager.scss";

import { SideBar } from "../../components/sideBar/SideBar";
import { TopNav } from "../../components/topNav/TopNav";
import { NewCustomers } from "../../components/newCustomers/NewCustomers";
import { AddCustomer } from "../../components/addCustomer/AddCustomer";
import { Completed } from "../../components/completed/Completed";

import { useState } from "react";
import { Outlet } from "react-router-dom";

export const Manager = () => {
  const [menuActive, setMenuActive] = useState(false);

  const onSideMenuToggler = () => {
    setMenuActive((prevMenuActive) => !prevMenuActive);
  };

  return (
    <div className="manager">
      <SideBar menuActive={menuActive} onSideMenuToggler={onSideMenuToggler} />
      <main className="manager__main">
        <TopNav
          setMenuActive={setMenuActive}
          onSideMenuToggler={onSideMenuToggler}
        />
        <Outlet />
      </main>
    </div>
  );
};
