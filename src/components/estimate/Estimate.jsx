import { useEffect, useMemo } from "react";
import "./Estimate.scss";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useState } from "react";

export const Estimate = () => {
  const [customerInfo, setCustomerInfo] = useState(null);
  const [distance, setDistance] = useState(null);
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const navigate = useNavigate();

  const [misc, setMisc] = useState(0);
  const [hours, setHours] = useState(1);
  const [employeeCount, setEmployeeCount] = useState(1);

  const onAddEstimate = (event) => {
    event.preventDefault();
    const add = async () => {
      try {
        const Response = await axios.patch(
          `${SERVER_URL}/customers/${customerInfo.id}`,
          { estimate: estimated }
        );
        navigate(`/manager`);
      } catch (error) {
        <p>Unable to fetch data, please refresh page</p>;
      }
    };

    add();
  };

  const { id } = useParams();

  const fetchCustomer = async () => {
    try {
      const { data } = await axios.get(`${SERVER_URL}/customers/${id}`);
      setCustomerInfo(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getDistance = async () => {
    if (!customerInfo) {
    } else {
      const postObj = {
        origin: customerInfo.current_address,
        destination: customerInfo.destination_address,
      };
      try {
        const { data } = await axios.post(`${SERVER_URL}/estimate`, postObj);

        if (data.rows[0].elements[0].distance.text) {
          setDistance(data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    fetchCustomer();
  }, []);

  useMemo(() => {
    getDistance();
  }, [customerInfo]);

  if (!customerInfo) return <p>Loading</p>;

  const interval = distance?.rows[0]?.elements[0]?.distance?.text.split(" ")[0];

  const employeeCost = employeeCount * hours * 20;
  const roomCost = customerInfo.rooms_number * 100;
  const boxesCost = customerInfo.boxes_number * 2.99;
  const mileageCost = interval * 1.8;
  const rentalCost = 30;
  const miscCost = Number(misc);

  const parameters = [
    employeeCost,
    roomCost,
    boxesCost,
    rentalCost,
    miscCost,
    mileageCost,
  ];

  const sumCalc = (parameters) => {
    let sum = 0;

    parameters &&
      parameters.forEach((param) => {
        sum += param;
      });

    return sum * 1.13;
  };

  const estimate = sumCalc(parameters);
  const estimated = Number.parseFloat(estimate).toFixed(2);

  return (
    <div className="estimate">
      <form className="estimate__form">
        <div className="estimate__sub">
          <div className="estimate__input-container">
            <label className="estimate__label">First Name</label>
            <input
              type="text"
              name="firstname"
              className="estimate__firstname-input input"
              value={customerInfo.first_name}
              readOnly={true}
            />
          </div>
          <div className="estimate__input-container">
            <label className="estimate__label">Last Name</label>
            <input
              type="text"
              name="lastname"
              className="estimate__lastname-input input"
              value={customerInfo.last_name}
              readOnly={true}
            />
          </div>
          <div className="estimate__input-container">
            <label className="estimate__label">Origin Address</label>
            <input
              type="text"
              name="address"
              className="estimate__address-input input"
              value={customerInfo.current_address}
              readOnly={true}
            />
          </div>
          <div className="estimate__input-container">
            <label className="estimate__label">Destination Address</label>
            <input
              type="text"
              name="destination-address"
              className="estimate__destination-address-input input"
              value={customerInfo.destination_address}
              readOnly={true}
            />
          </div>
        </div>

        <div className="estimate__sub">
          <div className="estimate__sub-wrap-bottom">
            <div className="estimate__input-container">
              <label className="estimate__label">#Rooms</label>
              <input
                type="text"
                name="room-count"
                value={customerInfo.rooms_number}
                readOnly={true}
                className="estimate__box-count input"
              />
            </div>
            <div className="estimate__input-container">
              <label className="estimate__label">Total Distance</label>
              <input
                type="text"
                name="box-count"
                value={
                  distance ? distance.rows[0].elements[0].distance.text : "N/A"
                }
                readOnly={true}
                className="estimate__box-count input"
              />
            </div>
          </div>
          <div className="estimate__sub-wrap-bottom">
            <div className="estimate__input-container">
              <label className="estimate__label">#Box(es)</label>
              <input
                type="text"
                name="box-count"
                value={customerInfo.boxes_number}
                readOnly={true}
                className="estimate__box-count input"
              />
            </div>
            <div className="estimate__input-container">
              <label className="estimate__label">Employee Count</label>
              <input
                type="number"
                name="employes-count"
                value={employeeCount}
                className="estimate__box-count input"
                onChange={(event) => setEmployeeCount(event.target.value)}
              />
            </div>
          </div>
          <div className="estimate__sub-wrap-bottom">
            <div className="estimate__input-container">
              <label className="estimate__label">Miscellaneous</label>
              <input
                type="number"
                name="misc"
                value={misc}
                className="estimate__box-count input"
                onChange={(event) => setMisc(event.target.value)}
              />
            </div>
            <div className="estimate__input-container">
              <label className="estimate__label">Estimated Hours</label>
              <input
                type="number"
                name="hours"
                value={hours}
                className="estimate__box-count input"
                onChange={(event) => setHours(event.target.value)}
              />
            </div>
            <div className="estimate__check-container">
              <label className="estimate__sub-label">Insurance</label>
              <input
                type="checkbox"
                name="insurance"
                className="estimate__insurance-box input"
                checked={customerInfo.insurance}
                readOnly={true}
                disabled={true}
              />
            </div>
          </div>
        </div>
      </form>
      <div className="estimate__bottom-container">
        <div className="estimate__total-container">
          <h3 className="estimate__total-label">Estimate:</h3>
          <h1 className="estimate__total">${estimated}</h1>
        </div>
        <div className="estimate__btn-container">
          <button onClick={onAddEstimate} className="estimate__btn">
            Save
          </button>
          <Link className="estimate__btn" to={`/manager/customer/${id}`}>
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};
