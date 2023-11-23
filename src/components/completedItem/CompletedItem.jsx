import "./CompletedItem.scss";
import Revert from "../../assets/icons/Revert.svg";
import Delete from "../../assets/icons/Delete.svg";

export const CompletedItem = ({ complete }) => {
  return (
    <div className="completed-item">
      <p className="completed-item__name">
        {complete.first_name.concat(" ", complete.last_name)}
      </p>
      <p className="completed-item__email">{complete.email}</p>
      <div className="completed-item__icons">
        <img
          src={Revert}
          alt="revert icon"
          className="completed-item__revert-icon"
        />
        <img
          src={Delete}
          alt="delete icon"
          className="completed-item__del-icon"
        />
      </div>
    </div>
  );
};
