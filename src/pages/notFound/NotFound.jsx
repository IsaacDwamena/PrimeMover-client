import "./NotFound.scss";
import NotFoundIcon from "../../assets/icons/NotFound.svg";

export const NotFound = () => {
  return (
    <div className="not-found">
      <img src={NotFoundIcon} alt="404 message" className="not-found__image" />
    </div>
  );
};
