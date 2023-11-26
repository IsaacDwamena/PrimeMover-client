import "./TopNav.scss";
import Menu from "../../assets/icons/Menu.svg";
import Search from "../../assets/icons/Search.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const TopNav = ({ onSideMenuToggler }) => {
  const [searchedCustomerInput, setSearchedCustomerInput] = useState([]);
  const navigate = useNavigate();

  const onSearchCustomer = async (event) => {
    event.preventDefault();
    navigate(`/manager/search/${searchedCustomerInput}`);
  };

  return (
    <div className="top-nav">
      <img
        src={Menu}
        alt="hamburger menu"
        className="top-nav__menu-icon"
        onClick={onSideMenuToggler}
      />
      <form className="top-nav__form" onSubmit={onSearchCustomer}>
        <img src={Search} alt="" className="top-nav__search-icon" />
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search by last name or conatact"
          className="top-nav__search-input"
          onChange={(event) => setSearchedCustomerInput(event.target.value)}
        />
      </form>
      <div className="top-nav__profile"></div>
    </div>
  );
};
