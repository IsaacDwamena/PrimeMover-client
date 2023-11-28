import { useState, useEffect } from "react";
import "../addCustomer/AddCustomer.scss";
import axios from "axios";
import { useParams } from "react-router-dom";

export const EditCustomer = () => {
  const { id } = useParams();
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const [customerInfo, setCustomerInfo] = useState(null);

  const fetchCustomer = async () => {
    try {
      const { data } = await axios.get(`${SERVER_URL}/customers/${id}`);
      setCustomerInfo(data);
      setFirstNameInput(data.first_name);
      setLastNameInput(data.last_name);
      setEmailInput(data.first_name);
      setContactInput(data.contact);
      setOriginAddressInput(data.current_address);
      setDestinationAddressInput(data.destination_address);
      setRoomInput(data.rooms_number);
      setBoxInput(data.boxes_number);
      setResidenceInput(data.residence_type);
      setMoveDateInput(data.move_date);
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
  const [reisdenceInput, setResidenceInput] = useState("House");
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
      completed: false,
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
      const updateCustomer = async () => {
        try {
          const send = await axios.put(
            `${SERVER_URL}/customers/${id}`,
            postObj
          );
          console.log("sent");
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
            <div className="add-customer__input-container">
              <label className="add-customer__label">Email</label>
              <input
                type="email"
                name="email"
                value={emailInput}
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
                value={contactInput}
                className="add-customer__contact-input input"
                onChange={(event) => setContactInput(event.target.value)}
              />
            </div>
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
          </div>
          <div className="add-customer__sub4">
            <div className="add-customer__input-box">
              <label className="add-customer__sub-label">
                Type of residence
              </label>
              <select
                name="residence"
                className="add-customer__residence-input"
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
            <div className="add-customer__input-box">
              <label className="add-customer__sub-label">Move Date</label>
              <input
                type="date"
                name="date"
                value={moveDateInput}
                className="add-customer__date-box"
                onChange={(event) => setMoveDateInput(event.target.value)}
              />
            </div>
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
          Save Changes
        </button>
      </form>
    </div>
  );
};
