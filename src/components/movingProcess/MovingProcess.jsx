import "./MovingProcess.scss";
import Logistics from "../../assets/icons/logistics.svg";

export const MovingProcess = () => {
  return (
    <div className="steps">
      <h1 className="steps__header">How It Works</h1>
      <div className="steps__wrapper">
        <img src={Logistics} alt="man pushing cart" className="steps__image" />
        <div className="steps__step-container">
          <div className="steps__block-container">
            <div className="steps__number">1</div>
            <p className="steps__text">Fill out an application.</p>
          </div>
          <div className="steps__block-container">
            <div className="steps__number">2</div>
            <p className="steps__text">Get free estimate via email.</p>
          </div>
          <div className="steps__block-container">
            <div className="steps__number">3</div>
            <p className="steps__text">
              Get a follow up call back to proceed or cease.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
