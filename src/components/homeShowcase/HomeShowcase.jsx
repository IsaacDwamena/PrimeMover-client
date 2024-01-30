import "./HomeShowcase.scss";
import Moving from "../../assets/icons/Moving.svg";

export const HomeShowcase = () => {
  return (
    <div className="showcase">
      <div className="showcase__container">
        <div className="showcase__contain">
          <h1 className="showcase_title">
            Moving With Us Is{" "}
            <span className="showcase__title-highlight">Always</span> Fun And
            Easy
          </h1>
          <p className="showcase__info">
            We strive to make your moving experience as enjoyable and
            stress-free as possible.
          </p>

          <a href="#form">
            <button className="showcase__btn">Get Free Estimate</button>
          </a>
        </div>
        <div className="showcase__contain-image">
          <img src={Moving} alt="moving cargo" className="showcase__image" />
        </div>
      </div>
    </div>
  );
};
