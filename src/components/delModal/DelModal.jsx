import "./DelModal.scss";
import Close from "../../assets/icons/Close.svg";
import axios from "axios";

export const DelModal = ({ onToggleModal, customer, fetchCustomers }) => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const onDelete = async () => {
    try {
      await axios.delete(`${SERVER_URL}/customers/${customer.id}`);
      fetchCustomers();
    } catch (error) {
      console.log(error);
    }

    onToggleModal();
  };
  return (
    <div className="modal">
      <div className="modal__overlay" onClick={onToggleModal}></div>
      <div className="modal__content">
        <img
          src={Close}
          alt="close button"
          className="modal__btn-close"
          onClick={onToggleModal}
        />
        <p className="modal__text">
          Please confirm that you'd like to delete{" "}
          {customer.first_name.concat(" ", customer.last_name)}. You won't be
          able to undo this action.
        </p>

        <button className="modal__btn-delete" onClick={onDelete}>
          Confirm
        </button>
      </div>
    </div>
  );
};
