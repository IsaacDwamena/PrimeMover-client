import Delete from "../../assets/icons/Delete.svg";
import Edit from "../../assets/icons/Edit.svg";
import Estimate from "../../assets/icons/Estimate.svg";
import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../addCustomer/AddCustomer.scss";
import "./Customer.scss";

export const Customer = () => {
  const [customerInfo, setCustomerInfo] = useState(null);
  const { id } = useParams();
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const navigate = useNavigate();

  const fetchCustomer = async () => {
    try {
      const { data } = await axios.get(`${SERVER_URL}/customers/${id}`);
      setCustomerInfo(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCustomer();
  }, []);

  const onDelete = async () => {
    try {
      await axios.delete(`${SERVER_URL}/customers/${id}`);
      navigate("/manager");
    } catch (error) {
      console.log(error);
    }
  };

  if (!customerInfo) return <p>Loading...</p>;

  return (
    <div className="add-customer">
      <form className="add-customer__form">
        <div className="add-customer__sub-container">
          <div className="add-customer__sub1">
            <div className="add-customer__input-container">
              <label className="add-customer__label">First Name</label>
              <input
                type="text"
                name="firstname"
                className="add-customer__firstname-input input"
                value={customerInfo.first_name}
                readOnly={true}
              />
            </div>
            <div className="add-customer__input-container">
              <label className="add-customer__label">Last Name</label>
              <input
                type="text"
                name="lastname"
                className="add-customer__lastname-input input"
                value={customerInfo.last_name}
                readOnly={true}
              />
            </div>
            <div className="add-customer__input-container">
              <label className="add-customer__label">Email</label>
              <input
                type="email"
                name="email"
                className="add-customer__email-input input"
                value={customerInfo.email}
                readOnly={true}
              />
            </div>
          </div>
          <div className="add-customer__sub2">
            <div className="add-customer__input-container">
              <label className="add-customer__label">Contact</label>
              <input
                type="number"
                name="contact"
                className="add-customer__contact-input input"
                value={customerInfo.contact}
                readOnly={true}
              />
            </div>
            <div className="add-customer__input-container">
              <label className="add-customer__label">Origin Address</label>
              <input
                type="text"
                name="address"
                className="add-customer__address-input input"
                value={customerInfo.current_address}
                readOnly={true}
              />
            </div>
            <div className="add-customer__input-container">
              <label className="add-customer__label">Destination Address</label>
              <input
                type="text"
                name="destination-address"
                className="add-customer__destination-address-input input"
                value={customerInfo.destination_address}
                readOnly={true}
              />
            </div>
          </div>
        </div>
        <div className="add-customer__sub-container">
          <div className="add-customer__sub3">
            <div className="add-customer__input-box">
              <input
                type="text"
                name="room-count"
                value={customerInfo.rooms_number}
                readOnly={true}
                className="add-customer__room-count input"
              />
              <label className="add-customer__sub-label add-customer__sub-label--right">
                Rooms
              </label>
            </div>
            <div className="add-customer__input-box">
              <input
                type="text"
                name="box-count"
                value={customerInfo.boxes_number}
                readOnly={true}
                className="add-customer__box-count input"
              />
              <label className="add-customer__sub-label add-customer__sub-label--right">
                Box(es)
              </label>
            </div>
          </div>
          <div className="add-customer__sub4">
            <div className="add-customer__input-box">
              <label className="add-customer__sub-label">
                Type of residence
              </label>
              <input
                type="text"
                name="residence"
                className="add-customer__residence-input input"
                value={customerInfo.residence_type}
                readOnly={true}
              ></input>
            </div>
            <div className="add-customer__input-box">
              <label className="add-customer__sub-label">Move Date</label>
              <input
                type="text"
                name="date"
                className="add-customer__date-box input"
                value={new Date(customerInfo.move_date).toLocaleDateString()}
                readOnly={true}
              />
            </div>
            <div className="add-customer__input-box">
              <input
                type="checkbox"
                name="insurance"
                className="add-customer__insurance-box input"
                checked={customerInfo.insurance}
                readOnly={true}
                disabled={true}
              />
              <label className="add-customer__sub-label">Insurance</label>
            </div>
            <div className="add-customer__buttons">
              <Link
                to={`/manager/estimate/${id}`}
                className="add-customer__nav-links"
              >
                <img
                  src={Estimate}
                  alt="estimate icon"
                  className="add-customer__icon"
                />
                Estimate
              </Link>
              <div className="add-customer__nav-links" onClick={onDelete}>
                <img
                  src={Delete}
                  alt="delete icon"
                  className="add-customer__icon"
                />
                Delete
              </div>
              <Link
                to={`/manager/editCustomer/${id}`}
                className="add-customer__nav-links"
              >
                <img
                  src={Edit}
                  alt="edit icon"
                  className="add-customer__icon"
                />
                Edit
              </Link>
              <Link to="/manager" className="add-customer__nav-links">
                Back
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
