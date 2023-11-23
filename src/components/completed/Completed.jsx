import "./Completed.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";

import { CompletedItem } from "../completedItem/CompletedItem";

export const Completed = () => {
  const [completes, setCompletes] = useState(null);
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    const fetchCompleted = async () => {
      try {
        const { data } = await axios.get(`${SERVER_URL}/completed`);
        setCompletes(data);
      } catch (error) {
        <p>Unable to fetch data, please refresh page</p>;
      }
    };

    fetchCompleted();
  }, []);

  if (!completes) return <p>Loading...</p>;
  return (
    <div className="completed">
      {completes.map((complete) => (
        <CompletedItem key={complete.id} complete={complete} />
      ))}
    </div>
  );
};
