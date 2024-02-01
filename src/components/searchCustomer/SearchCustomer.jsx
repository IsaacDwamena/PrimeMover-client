import "./SearchCustomer.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export const SearchCustomer = () => {
  const SERVER_URL = process.env.REACT_APP_SERVER_URL;
  const [searchCustomer, setSearchCustomer] = useState(null);
  const { query } = useParams();

  useEffect(() => {
    const fetchSearched = async () => {
      try {
        const { data } = await axios.get(`${SERVER_URL}/search?q=${query}`);
        if (data.length === 0) {
          setSearchCustomer([]);
        } else {
          setSearchCustomer(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSearched();
  }, [query, SERVER_URL]);

  if (!searchCustomer) return <p>Make a search query</p>;

  return (
    <div className="searched-item">
      {searchCustomer.length === 0 ? "No record found" : ""}
      {searchCustomer.map((searchedCustomer) => (
        <Link
          to={`/manager/customer/${searchedCustomer.id}`}
          className="searched-item__container"
          key={searchedCustomer.id}
        >
          <p className="searched-item__name">
            {searchedCustomer.first_name.concat(
              " ",
              searchedCustomer.last_name
            )}
          </p>
          <p className="searched-item__email">{searchedCustomer.email}</p>
          <p className="searched-item__estimate">$100</p>
        </Link>
      ))}
    </div>
  );
};
