import { useState } from "react";
import "./AddCustomer.scss";
import validator from "validator";
import axios from "axios";

export const AddCustomer = () => {
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [contactInput, setContactInput] = useState("");
  const [originAddressInput, setOriginAddressInput] = useState("");
  const [destinationAddressInput, setDestinationAddressInput] = useState("");
  const [roomInput, setRoomInput] = useState(0);
  const [boxInput, setBoxInput] = useState(0);
  const [reisdenceInput, setResidenceInput] = useState("");
  const [moveDateInput, setMoveDateInput] = useState("");
  const [insuranceInput, setInsuranceInput] = useState(false);

  const onSubmitForm = (event) => {
    event.preventDefault();
    const SERVER_URL = process.env.REACT_APP_SERVER_URL;
    const postObj = {
      first_name: firstNameInput,
      last_name: lastNameInput,
      email: emailInput,
      contact: contactInput,
      current_address: originAddressInput,
      destination_address: destinationAddressInput,
      move_date: moveDateInput,
      residence_type: reisdenceInput,
      rooms_number: roomInput,
      boxes_number: boxInput,
      insurance: insuranceInput,
      completed: insuranceInput,
    };
    if (
      !firstNameInput ||
      !lastNameInput ||
      !emailInput ||
      !contactInput ||
      !originAddressInput ||
      !destinationAddressInput ||
      !roomInput ||
      !boxInput ||
      !reisdenceInput ||
      !moveDateInput
    ) {
      console.log("empty field");
    } else {
      const createCustomer = async () => {
        try {
          const send = await axios.post(`${SERVER_URL}/customers`, postObj);
          console.log("sent");
        } catch (error) {
          console.log(error);
        }
      };
      createCustomer();
    }
  };

  return (
    <div className="add-customer">
      <form className="add-customer__form" onSubmit={onSubmitForm}>
        <div className="add-customer__sub-container">
          <div className="add-customer__sub1">
            <div className="add-customer__input-container">
              <label className="add-customer__label">First Name</label>
              <input
                type="text"
                name="firstname"
                className="add-customer__firstname-input input"
                onChange={(event) => setFirstNameInput(event.target.value)}
              />
            </div>
            <div className="add-customer__input-container">
              <label className="add-customer__label">Last Name</label>
              <input
                type="text"
                name="lastname"
                className="add-customer__lastname-input input"
                onChange={(event) => setLastNameInput(event.target.value)}
              />
            </div>
            <div className="add-customer__input-container">
              <label className="add-customer__label">Email</label>
              <input
                type="email"
                name="email"
                className="add-customer__email-input"
                onChange={(event) => setEmailInput(event.target.value)}
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
                onChange={(event) => setContactInput(event.target.value)}
              />
            </div>
            <div className="add-customer__input-container">
              <label className="add-customer__label">Origin Address</label>
              <input
                type="text"
                name="address"
                className="add-customer__address-input input"
                onChange={(event) => setOriginAddressInput(event.target.value)}
              />
            </div>
            <div className="add-customer__input-container">
              <label className="add-customer__label">Destination Address</label>
              <input
                type="text"
                name="destination-address"
                className="add-customer__destination-address-input input"
                onChange={(event) =>
                  setDestinationAddressInput(event.target.value)
                }
              />
            </div>
          </div>
        </div>
        <div className="add-customer__sub-container">
          <div className="add-customer__sub3">
            <div className="add-customer__input-box">
              <input
                type="number"
                name="room-count"
                className="add-customer__room-count input"
                onChange={(event) => setRoomInput(event.target.value)}
              />
              <label className="add-customer__sub-label add-customer__sub-label--right">
                Rooms
              </label>
            </div>
            <div className="add-customer__input-box">
              <input
                type="number"
                name="box-count"
                maxLength={2}
                className="add-customer__box-count input"
                onChange={(event) => setBoxInput(event.target.value)}
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
              <select
                name="residence"
                className="add-customer__residence-input"
                onChange={(event) => setResidenceInput(event.target.value)}
              >
                <option value="Apartment">Apartment</option>
                <option value="Condo">Condo</option>
                <option value="House">House</option>
                <option value="TownHouse">TownHouse</option>
                <option value="Cottage">Cottage</option>
                <option value="Bungalow">Bungalow</option>
              </select>
            </div>
            <div className="add-customer__input-box">
              <label className="add-customer__sub-label">Move Date</label>
              <input
                type="date"
                name="date"
                className="add-customer__date-box"
                onChange={(event) => setMoveDateInput(event.target.value)}
              />
            </div>
            <div className="add-customer__input-box">
              <input
                type="checkbox"
                name="insurance"
                className="add-customer__insurance-box input"
                value={false}
                onClick={(event) => {
                  setInsuranceInput(event.target.value);
                  console.log("insurance value", event.target.value);
                }}
              />
              <label className="add-customer__sub-label">Insurance</label>
            </div>
          </div>
        </div>
        <button type="submit" className="add-customer__cta">
          Submit
        </button>
      </form>
    </div>
  );
};
