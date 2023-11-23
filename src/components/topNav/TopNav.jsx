import "./TopNav.scss";
import Menu from "../../assets/icons/Menu.svg";
import Search from "../../assets/icons/Search.svg";

export const TopNav = ({ onSideMenuToggler }) => {
  return (
    <div className="top-nav">
      <img
        src={Menu}
        alt="hamburger menu"
        className="top-nav__menu-icon"
        onClick={onSideMenuToggler}
      />
      <form className="top-nav__form">
        <img src={Search} alt="" className="top-nav__search-icon" />
        <input
          type="text"
          name="search"
          id="search"
          className="top-nav__search-input"
        />
      </form>
      <div className="top-nav__profile"></div>
    </div>
  );
};
