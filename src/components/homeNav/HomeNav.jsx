import "./HomeNav.scss";
import { Link } from "react-router-dom";

export const HomeNav = () => {
  return (
    <div className="home-nav">
      <Link to="/" className="home-nav__logo">
        Prime<span className="high">Movers</span>
      </Link>
      <div className="home-nav__links-conatiner">
        <p className="home-nav__link">Services</p>
        <Link to="/login" className="home-nav__login">
          Managerial login
        </Link>
      </div>
    </div>
  );
};
