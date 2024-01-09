import { useState } from "react";
import "./AddCustomer.scss";
import axios from "axios";
import Error from "../../assets/icons/Error.svg";
import { useNavigate } from "react-router-dom";
import validator from "validator";

export const AddCustomer = () => {
  const getCurrentDate = () => {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [contactInput, setContactInput] = useState("");
  const [originAddressInput, setOriginAddressInput] = useState("");
  const [destinationAddressInput, setDestinationAddressInput] = useState("");
  const [roomInput, setRoomInput] = useState(0);
  const [boxInput, setBoxInput] = useState(0);
  const [reisdenceInput, setResidenceInput] = useState("House");
  const [moveDateInput, setMoveDateInput] = useState("");
  const [insuranceInput, setInsuranceInput] = useState(false);

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [contactError, setContactError] = useState(false);
  const [roomError, setRoomError] = useState(false);
  const [boxError, setBoxError] = useState(false);
  const [residenceError, setResidenceError] = useState(false);
  const [moveDateError, setMoveDateError] = useState(false);
  const [originAddError, setOriginAddError] = useState(false);
  const [destinationAddError, setDestinationAddError] = useState(false);

  const navigate = useNavigate();

  validator.isAddress = function (value) {
    const addressPattern = /^\d+\s[A-Za-z\s]+,\s[A-Za-z\s]+$/i;
    return addressPattern.test(value);
  };

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
      completed: false,
    };

    const validEmail = validator.isEmail(emailInput);
    const validOriginAdd =
      originAddressInput && validator.isAddress(originAddressInput);
    const validDestinationAdd =
      destinationAddressInput && validator.isAddress(destinationAddressInput);

    setFirstNameError(false);
    setLastNameError(false);
    setContactError(false);
    setEmailError(false);
    setOriginAddError(false);
    setDestinationAddError(false);
    setMoveDateError(false);
    setResidenceError(false);
    setRoomError(false);
    setBoxError(false);

    if (!firstNameInput) {
      setFirstNameError(true);
      return;
    }
    if (!lastNameInput) {
      setLastNameError(true);
      return;
    }

    if (!validEmail) {
      setEmailError(true);
      return;
    }
    if (contactInput.length !== 10 || !contactInput) {
      setContactError(true);
      return;
    }

    if (!validOriginAdd) {
      setOriginAddError(true);
      return;
    }

    if (!validDestinationAdd) {
      setDestinationAddError(true);
      return;
    }

    if (!moveDateInput) {
      setMoveDateError(true);
      return;
    }
    if (!reisdenceInput) {
      setResidenceError(true);
      return;
    }

    if (
      !firstNameInput ||
      !lastNameInput ||
      !emailInput ||
      !contactInput ||
      !originAddressInput ||
      !destinationAddressInput ||
      !reisdenceInput ||
      !moveDateInput
    ) {
      console.log("empty field");
    } else {
      const createCustomer = async () => {
        try {
          const send = await axios.post(`${SERVER_URL}/customers`, postObj);
          navigate("/manager");
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
            {firstNameError && (
              <p className="login__error-text">
                <img
                  className="login__error-icon"
                  src={Error}
                  alt="error icon"
                />
                Please provide a First Name.
              </p>
            )}
            <div className="add-customer__input-container">
              <label className="add-customer__label">Last Name</label>
              <input
                type="text"
                name="lastname"
                className="add-customer__lastname-input input"
                onChange={(event) => setLastNameInput(event.target.value)}
              />
            </div>
            {lastNameError && (
              <p className="login__error-text">
                <img
                  className="login__error-icon"
                  src={Error}
                  alt="error icon"
                />
                Please provide a Last Name.
              </p>
            )}
            <div className="add-customer__input-container">
              <label className="add-customer__label">Email</label>
              <input
                type="email"
                name="email"
                className="add-customer__email-input input"
                onChange={(event) => setEmailInput(event.target.value)}
              />
            </div>
            {emailError && (
              <p className="login__error-text">
                <img
                  className="login__error-icon"
                  src={Error}
                  alt="error icon"
                />
                Please provide a valid email.
              </p>
            )}
          </div>
          <div className="add-customer__sub2">
            <div className="add-customer__input-container">
              <label className="add-customer__label">Contact</label>
              <input
                type="tel"
                name="contact"
                maxLength={10}
                className="add-customer__contact-input input"
                onChange={(event) => setContactInput(event.target.value)}
              />
            </div>
            {contactError && (
              <p className="login__error-text">
                <img
                  className="login__error-icon"
                  src={Error}
                  alt="error icon"
                />
                Please provide a valid contact.
              </p>
            )}
            <div className="add-customer__input-container">
              <label className="add-customer__label">Origin Address</label>
              <input
                type="text"
                id="origin-address"
                name="origin-address"
                className="add-customer__address-input input"
                onChange={(event) => setOriginAddressInput(event.target.value)}
              />
            </div>
            {originAddError && (
              <p className="login__error-text">
                <img
                  className="login__error-icon"
                  src={Error}
                  alt="error icon"
                />
                Please adhere to format: 123 street name, City
              </p>
            )}
            <div className="add-customer__input-container">
              <label className="add-customer__label">Destination Address</label>
              <input
                type="text"
                id="destination-address"
                name="destination-address"
                className="add-customer__destination-address-input input"
                onChange={(event) =>
                  setDestinationAddressInput(event.target.value)
                }
              />
            </div>
            {destinationAddError && (
              <p className="login__error-text">
                <img
                  className="login__error-icon"
                  src={Error}
                  alt="error icon"
                />
                Please adhere to format: 123 street name, City
              </p>
            )}
          </div>
        </div>
        <div className="add-customer__sub-container">
          <div className="add-customer__sub3">
            <div className="add-customer__input-box">
              <input
                type="number"
                name="room-count"
                defaultValue={roomInput}
                className="add-customer__room-count input"
                onChange={(event) => setRoomInput(event.target.value)}
              />
              <label className="add-customer__sub-label add-customer__sub-label--right">
                Rooms
              </label>
            </div>
            {roomError && (
              <p className="login__error-text">
                <img
                  className="login__error-icon"
                  src={Error}
                  alt="error icon"
                />
                Please provide number of rooms.
              </p>
            )}
            <div className="add-customer__input-box">
              <input
                type="number"
                name="box-count"
                defaultValue={boxInput}
                className="add-customer__box-count input"
                onChange={(event) => setBoxInput(event.target.value)}
              />
              <label className="add-customer__sub-label add-customer__sub-label--right">
                Box(es)
              </label>
            </div>
            {boxError && (
              <p className="login__error-text">
                <img
                  className="login__error-icon"
                  src={Error}
                  alt="error icon"
                />
                Please provide number of boxes.
              </p>
            )}
          </div>
          <div className="add-customer__sub4">
            <div className="add-customer__input-box">
              <label className="add-customer__sub-label">
                Type of residence
              </label>
              <select
                name="residence"
                className="add-customer__residence-input input"
                value={reisdenceInput}
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
            {residenceError && (
              <p className="login__error-text">
                <img
                  className="login__error-icon"
                  src={Error}
                  alt="error icon"
                />
                Please provide number of rooms.
              </p>
            )}
            <div className="add-customer__input-box">
              <label className="add-customer__sub-label">Move Date</label>
              <input
                type="date"
                name="date"
                min={getCurrentDate()}
                className="add-customer__date-box input"
                onChange={(event) => setMoveDateInput(event.target.value)}
              />
            </div>
            {moveDateError && (
              <p className="login__error-text">
                <img
                  className="login__error-icon"
                  src={Error}
                  alt="error icon"
                />
                Please provide valid date.
              </p>
            )}
            <div className="add-customer__input-box">
              <input
                type="checkbox"
                name="insurance"
                className="add-customer__insurance-box input"
                checked={insuranceInput}
                onChange={(event) => {
                  setInsuranceInput(event.target.checked);
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
