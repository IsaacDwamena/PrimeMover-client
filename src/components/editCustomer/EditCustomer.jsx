import { useState, useEffect } from "react";
import "../addCustomer/AddCustomer.scss";
import Error from "../../assets/icons/Error.svg";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";
import validator from "validator";

export const EditCustomer = () => {
  const { id } = useParams();
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const [customerInfo, setCustomerInfo] = useState(null);
  const navigate = useNavigate();

  const getCurrentDate = () => {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const year = today.getFullYear();
    return `${year}-${month}-${day}`;
  };

  const fetchCustomer = async () => {
    try {
      const { data } = await axios.get(`${SERVER_URL}/customers/${id}`);
      setCustomerInfo(data);
      setFirstNameInput(data.first_name);
      setLastNameInput(data.last_name);
      setEmailInput(data.email);
      setContactInput(data.contact);
      setOriginAddressInput(data.current_address);
      setDestinationAddressInput(data.destination_address);
      setRoomInput(data.rooms_number);
      setBoxInput(data.boxes_number);
      setResidenceInput(data.residence_type);
      setMoveDateInput(new Date(data.move_date).toISOString().split("T")[0]);
      setInsuranceInput(data.insurance);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCustomer();
  }, []);

  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [contactInput, setContactInput] = useState("");
  const [originAddressInput, setOriginAddressInput] = useState("");
  const [destinationAddressInput, setDestinationAddressInput] = useState("");
  const [roomInput, setRoomInput] = useState(0);
  const [boxInput, setBoxInput] = useState(0);
  const [residenceInput, setResidenceInput] = useState("House");
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

  validator.isAddress = function (value) {
    console.log("Input value:", value);
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
      residence_type: residenceInput,
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
    if (!contactInput) {
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
    if (!residenceInput) {
      setResidenceError(true);
      return;
    }
    if (!roomInput) {
      setRoomError(true);
      return;
    }

    if (!boxInput) {
      setBoxError(true);
      return;
    }

    if (
      !firstNameInput ||
      !lastNameInput ||
      !emailInput ||
      !contactInput ||
      !originAddressInput ||
      !destinationAddressInput ||
      !roomInput ||
      !boxInput ||
      !residenceInput ||
      !moveDateInput
    ) {
      console.log("empty field");
    } else {
      const updateCustomer = async () => {
        try {
          const send = await axios.put(
            `${SERVER_URL}/customers/${id}`,
            postObj
          );
          console.log("sent");
          navigate(`/manager`);
        } catch (error) {
          console.log(error);
        }
      };
      updateCustomer();
    }
  };

  if (!customerInfo) return <p>Loading...</p>;

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
                value={firstNameInput}
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
                value={lastNameInput}
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
                value={emailInput}
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
                value={contactInput}
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
                name="address"
                value={originAddressInput}
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
                name="destination-address"
                value={destinationAddressInput}
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
                value={residenceInput}
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
                value={moveDateInput}
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
        <div className="add-customer__cta-container">
          <button type="submit" className="add-customer__cta">
            Save Changes
          </button>
          <Link className="add-customer__cta" to={`/manager/customer/${id}`}>
            Back
          </Link>
        </div>
      </form>
    </div>
  );
};
