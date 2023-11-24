import "./SideBar.scss";
import Home from "../../assets/icons/Home.svg";
import Check from "../../assets/icons/Check.svg";
import Add from "../../assets/icons/Add.svg";
import Logout from "../../assets/icons/LogOut.svg";
import Close from "../../assets/icons/Close.svg";

import { NavLink, useNavigate } from "react-router-dom";

export const SideBar = ({ menuActive, onSideMenuToggler }) => {
  const navigate = useNavigate();

  return (
    <div className={menuActive ? "sidebar sidebar--active" : "sidebar"}>
      <div className="sidebar__wrapper">
        <div className="sidebar__menu-header">
          <h1 className="sidebar__logo">PrimeMover</h1>
          <img
            src={Close}
            alt="close menu"
            className="sidebar__close-icon"
            onClick={onSideMenuToggler}
          />
        </div>
        <div className="sidebar__nav-links">
          <NavLink to="/manager" className="sidebar__link active">
            <img src={Home} alt="home icon" className="sidebar__home-icon" />
            <p className="sidebar__home">Home</p>
          </NavLink>
          <NavLink to="/manager/completed" className="sidebar__link  active">
            <img src={Check} alt="home icon" className="sidebar__check-icon" />
            <p className="sidebar__home">Completed</p>
          </NavLink>
          <NavLink to="/manager/addCustomer" className="sidebar__link  active">
            <img src={Add} alt="home icon" className="sidebar__add-icon" />
            <p className="sidebar__home">Add Customer</p>
          </NavLink>
        </div>
      </div>
      <div className="sidebar__footer sidebar__link">
        <img src={Logout} alt="home icon" className="sidebar__add-icon" />
        <p className="sidebar__home">Log Out</p>
      </div>
    </div>
  );
};
