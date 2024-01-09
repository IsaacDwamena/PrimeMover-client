import "./SideBar.scss";
import Home from "../../assets/icons/Home.svg";
import Check from "../../assets/icons/Check.svg";
import Add from "../../assets/icons/Add.svg";
import Logout from "../../assets/icons/LogOut.svg";
import Close from "../../assets/icons/Close.svg";
import { useNavigate } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";

export const SideBar = ({ menuActive, onSideMenuToggler }) => {
  const navigate = useNavigate();

  const onLogOut = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className={menuActive ? "sidebar sidebar--active" : "sidebar"}>
      <div className="sidebar__wrapper">
        <div className="sidebar__menu-header">
          <Link className="sidebar__logo" to="/">
            Prime<span className="high">Movers</span>
          </Link>
          <img
            src={Close}
            alt="close menu"
            className="sidebar__close-icon"
            onClick={onSideMenuToggler}
          />
        </div>
        <div className="sidebar__nav-links">
          <NavLink
            to="/manager"
            end
            className="sidebar__link"
            onClick={onSideMenuToggler}
          >
            <img src={Home} alt="home icon" className="sidebar__home-icon" />
            <p className="sidebar__home">Home</p>
          </NavLink>
          <NavLink
            to="/manager/completed"
            end
            className="sidebar__link"
            onClick={onSideMenuToggler}
          >
            <img src={Check} alt="home icon" className="sidebar__check-icon" />
            <p className="sidebar__home">Completed</p>
          </NavLink>
          <NavLink
            to="/manager/addCustomer"
            end
            className="sidebar__link"
            onClick={onSideMenuToggler}
          >
            <img src={Add} alt="home icon" className="sidebar__add-icon" />
            <p className="sidebar__home">Add Customer</p>
          </NavLink>
        </div>
      </div>
      <div className="sidebar__footer sidebar__link" onClick={onLogOut}>
        <img src={Logout} alt="home icon" className="sidebar__add-icon" />
        <p className="sidebar__home">Log Out</p>
      </div>
    </div>
  );
};
