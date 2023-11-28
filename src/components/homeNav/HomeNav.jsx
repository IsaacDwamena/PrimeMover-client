import "./HomeNav.scss";

export const HomeNav = () => {
  return (
    <div className="home-nav">
      <h1 className="home-nav__logo">PrimeMovers</h1>
      <div className="home-nav__links-conatiner">
        <p className="home-nav__link">Services</p>
        <p className="home-nav__login">Managerial login</p>
      </div>
    </div>
  );
};
