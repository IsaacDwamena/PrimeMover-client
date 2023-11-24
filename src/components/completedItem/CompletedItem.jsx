import "./CompletedItem.scss";
import Revert from "../../assets/icons/Revert.svg";
import Delete from "../../assets/icons/Delete.svg";
import { useState } from "react";
import { DelCompletedModal } from "../delModal/DelCompletedModal";
import axios from "axios";

export const CompletedItem = ({ complete, fetchCompleted }) => {
  const [modal, setModal] = useState(false);
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  const onToggleModal = () => {
    setModal(!modal);
  };

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const onRemoveCompleted = () => {
    const removeCompletedItem = async () => {
      try {
        const Response = await axios.patch(
          `${SERVER_URL}/customers/${complete.id}`,
          { completed: false }
        );
        fetchCompleted();
      } catch (error) {
        <p>Unable to fetch data, please refresh page</p>;
      }
    };

    removeCompletedItem();
  };

  return (
    <>
      {modal && (
        <DelCompletedModal
          onToggleModal={onToggleModal}
          fetchCompleted={fetchCompleted}
          complete={complete}
        />
      )}
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
            onClick={onRemoveCompleted}
          />
          <img
            src={Delete}
            alt="delete icon"
            className="completed-item__del-icon"
            onClick={onToggleModal}
          />
        </div>
      </div>
    </>
  );
};
