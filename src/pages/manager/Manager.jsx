import "./Manager.scss";

import { SideBar } from "../../components/sideBar/SideBar";
import { TopNav } from "../../components/topNav/TopNav";

import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Manager = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  });

  const [menuActive, setMenuActive] = useState(false);

  const onSideMenuToggler = () => {
    setMenuActive((prevMenuActive) => !prevMenuActive);
  };

  return (
    <div className="manager">
      <SideBar
        menuActive={menuActive}
        onSideMenuToggler={onSideMenuToggler}
        className="manager__sidebar"
      />
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
