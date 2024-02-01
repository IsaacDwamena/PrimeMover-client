import "./UserForm.scss";
import { useState } from "react";
import axios from "axios";
import validator from "validator";
import Error from "../../assets/icons/Error.svg";

export const UserForm = () => {
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

  const [formStep, setFormStep] = useState(0);

  validator.isAddress = function (value) {
    const addressPattern = /^\d+\s[A-Za-z\s]+,\s[A-Za-z\s]+$/i;
    return addressPattern.test(value);
  };

  const completeFormStep0 = (event) => {
    event.preventDefault();
    const validEmail = validator.isEmail(emailInput);

    setFirstNameError(false);
    setLastNameError(false);
    setContactError(false);
    setEmailError(false);

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
    if (!contactInput) {
      setContactError(true);
      return;
    }
    setFormStep((curr) => curr + 1);
  };

  const completeFormStep1 = (event) => {
    event.preventDefault();
    const validOriginAdd =
      originAddressInput && validator.isAddress(originAddressInput);
    const validDestinationAdd =
      destinationAddressInput && validator.isAddress(destinationAddressInput);

    setOriginAddError(false);
    setDestinationAddError(false);

    if (!validOriginAdd) {
      setOriginAddError(true);
      return;
    }

    if (!validDestinationAdd) {
      setDestinationAddError(true);
      return;
    }

    setFormStep((curr) => curr + 1);
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

    setMoveDateError(false);
    setResidenceError(false);
    setRoomError(false);
    setBoxError(false);

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
    } else {
      const createCustomer = async () => {
        try {
          const send = await axios.post(`${SERVER_URL}/customers`, postObj);
        } catch (error) {
          console.log(error);
        }
      };
      createCustomer();
    }
    setFormStep((curr) => curr + 1);
  };

  const completeFormStep = (event) => {
    event.preventDefault();

    setFormStep((curr) => curr + 1);
  };

  const prevFormStep = (e) => {
    e.preventDefault();
    setFormStep((curr) => (curr > 0 ? curr - 1 : curr));
  };

  return (
    <div className="user-form" id="form">
      <form className="user-form__form">
        {formStep >= 0 && (
          <section
            className={
              formStep === 0 ? "user-form__block" : "user-form__hidden"
            }
          >
            <h2 className="user-form__header">Personal Information</h2>
            <div className="user-form__sub1">
              <div className="user-form__input-container">
                <label className="user-form__label">First Name</label>
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  className="user-form__firstname-input input"
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
              <div className="user-form__input-container">
                <label className="user-form__label">Last Name</label>
                <input
                  type="text"
                  name="lastname"
                  className="user-form__lastname-input input"
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
              <div className="user-form__input-container">
                <label className="user-form__label">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="something@example.com"
                  className="user-form__email-input input"
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
              <div className="user-form__input-container">
                <label className="user-form__label">Contact</label>
                <input
                  type="tel"
                  name="contact"
                  maxLength={10}
                  placeholder="123 456 7899"
                  className="user-form__contact-input input"
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
            </div>
          </section>
        )}
        {formStep >= 1 && (
          <section
            className={
              formStep === 1 ? "user-form__block" : "user-form__hidden"
            }
          >
            <h2 className="user-form__header">Location Information</h2>
            <div className="user-form__sub2">
              <div className="user-form__input-container">
                <label className="user-form__label">Origin Address</label>
                <input
                  type="text"
                  name="origin-address"
                  placeholder="123 Street Name, City"
                  className="user-form__address-input input"
                  onChange={(event) =>
                    setOriginAddressInput(event.target.value)
                  }
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
              <div className="user-form__input-container">
                <label className="user-form__label">Destination Address</label>
                <input
                  type="text"
                  name="destination-address"
                  placeholder="123 Street Name, City"
                  className="user-form__destination-address-input input"
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
          </section>
        )}
        {formStep === 2 && (
          <section
            className={
              formStep === 2 ? "user-form__block" : "user-form__hidden"
            }
          >
            <h2 className="user-form__header">Moving Information</h2>
            <div className="user-form__sub3-sub4">
              <div className="user-form__sub3">
                <div className="user-form__input-box">
                  <input
                    type="number"
                    name="room-count"
                    defaultValue={roomInput}
                    className="user-form__room-count input"
                    onChange={(event) => setRoomInput(event.target.value)}
                  />

                  <label className="user-form__sub-label user-form__sub-label--right">
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
                <div className="user-form__input-box">
                  <input
                    type="number"
                    name="box-count"
                    defaultValue={boxInput}
                    className="user-form__box-count input"
                    onChange={(event) => setBoxInput(event.target.value)}
                  />
                  <label className="user-form__sub-label user-form__sub-label--right">
                    Box(es)
                  </label>
                </div>
              </div>
              <div className="user-form__sub4">
                <div className="user-form__input-box">
                  <label className="user-form__sub-label">
                    Type of residence
                  </label>
                  <select
                    name="residence"
                    className="user-form__residence-input input"
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
                <div className="user-form__input-box">
                  <label className="user-form__sub-label">Move Date</label>
                  <input
                    type="date"
                    name="date"
                    min={getCurrentDate()}
                    className="user-form__date-box input"
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
                <div className="user-form__input-box">
                  <label className="user-form__sub-label">Insurance</label>
                  <input
                    type="checkbox"
                    name="insurance"
                    className="user-form__insurance-box input"
                    onChange={(event) => {
                      setInsuranceInput(event.target.checked);
                    }}
                  />
                </div>
              </div>
            </div>
          </section>
        )}
        <div className="user-form__btn-container">
          {formStep < 2 && (
            <button
              onClick={prevFormStep}
              type="type"
              className={
                formStep === 0 ? "user-form__cta--disable" : "user-form__cta"
              }
            >
              Previous Step
            </button>
          )}
          {formStep === 0 && (
            <button
              onClick={completeFormStep0}
              type="button"
              className="user-form__cta"
            >
              Next Step
            </button>
          )}
          {formStep === 1 && (
            <button
              onClick={completeFormStep1}
              type="button"
              className="user-form__cta"
            >
              Next Step
            </button>
          )}
        </div>
        {formStep === 3 && (
          <h2 className="user-form__completed">
            All done. You will recieve your estimate shortly.
          </h2>
        )}
        {formStep === 2 && (
          <div className="user-form__btn-container">
            <>
              <button onClick={prevFormStep} className="user-form__cta">
                Previous Step
              </button>
              <button onClick={onSubmitForm} className="user-form__cta">
                Get Free Estimate
              </button>
            </>
          </div>
        )}
      </form>
    </div>
  );
};
