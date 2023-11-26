import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const Customer = () => {
  const [customerInfo, setCustomerInfo] = useState(null);
  const { id } = useParams();
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

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

  if (!customerInfo) return <p>Loading...</p>;

  return (
    <div>
      <p>{customerInfo.first_name}</p>
    </div>
  );
};
