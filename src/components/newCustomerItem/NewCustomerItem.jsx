import "./NewCustomerItem.scss";
import Email from "../../assets/icons/Email.svg";
import Delete from "../../assets/icons/Delete.svg";
import Check from "../../assets/icons/Check.svg";
import { DelModal } from "../delModal/DelModal";
import { useState } from "react";
import axios from "axios";

export const NewCustomerItem = ({ customer, fetchCustomers }) => {
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

  const onAddCompleted = () => {
    const addCompletedItem = async () => {
      try {
        const Response = await axios.patch(
          `${SERVER_URL}/customers/${customer.id}`,
          { completed: true }
        );
        fetchCustomers();
      } catch (error) {
        <p>Unable to fetch data, please refresh page</p>;
      }
    };

    addCompletedItem();
  };

  return (
    <>
      {modal && (
        <DelModal
          onToggleModal={onToggleModal}
          customer={customer}
          fetchCustomers={fetchCustomers}
        />
      )}
      <div className="customer-item">
        <div className="customer-item__container">
          <div className="customer-item__group">
            <p className="customer-item__name">
              {customer.first_name.concat(" ", customer.last_name)}
            </p>
            <p className="customer-item__date">
              {new Date(customer.move_date).toLocaleDateString()}
            </p>
          </div>
          <div className="customer-item__group customer-item__group--mod">
            <p className="customer-item__email">{customer.email}</p>
            <div className="customer-item__estimate-container">
              <p className="customer-item__estimate">$100</p>
            </div>
          </div>
        </div>
        <div className="customer-item__icons">
          <img
            src={Email}
            alt="email icon"
            className="customer-item__send-email"
          />
          <img
            src={Delete}
            alt="delete icon"
            className="customer-item__del"
            onClick={onToggleModal}
          />
          <img
            src={Check}
            alt="check mark icon"
            className="customer-item__check"
            onClick={onAddCompleted}
          />
        </div>
      </div>
    </>
  );
};
