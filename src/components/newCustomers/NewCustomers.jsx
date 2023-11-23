import React, { useEffect, useState } from "react";
import axios from "axios";
import "./NewCustomers.scss";

import { NewCustomerItem } from "../newCustomerItem/NewCustomerItem";

export const NewCustomers = () => {
  const [customers, setCustomers] = useState(null);
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const { data } = await axios.get(`${SERVER_URL}/customers`);
        setCustomers(data);
      } catch (error) {
        <p>Unable to fetch data, please refresh page</p>;
      }
    };

    fetchCustomers();
  }, []);

  if (!customers) return <p>Loading...</p>;

  return (
    <div className="customer">
      {customers.map((customer) => (
        <NewCustomerItem key={customer.id} customer={customer} />
      ))}
    </div>
  );
};
