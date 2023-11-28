import "./HomeServices.scss";
import Insurance from "../../assets/icons/Insurance.svg";
import Professional from "../../assets/icons/Professional.svg";
import Truck from "../../assets/icons/Truck.svg";
import Gear from "../../assets/icons/Gear.svg";
import Plus from "../../assets/icons/Plus.svg";
import PlusLight from "../../assets/icons/Plus-light.svg";

export const HomeServices = () => {
  return (
    <div className="services">
      <h2 className="services__header">Why You Should Hire us</h2>
      <p className="services__header-sub">
        Your move is not just a relocation, it's an experience crafted for your
        peace of mind.
      </p>
      <div className="services__card-container">
        <div className="services__card">
          <img
            src={Insurance}
            alt="shield icon"
            className="services__card-icon"
          />
          <h3 className="services__card-title">Safety</h3>
          <p className="services__card-text">
            We adhere to the highest standards to ensure the well-being of your
            belongings throughout the entire moving process.
          </p>
          <img
            src={Plus}
            alt="plus icon"
            className="services__card-plus-icon"
          />
        </div>
        <div className="services__card services__card--odd">
          <img src={Truck} alt="shield icon" className="services__card-icon" />
          <h3 className="services__card-title"> 20 Years Experience</h3>
          <p className="services__card-text">
            Our extensive knowledge and expertise guarantee a smooth and
            efficient moving experience tailored to your needs.
          </p>
          <img
            src={PlusLight}
            alt="plus icon"
            className="services__card-plus-icon"
          />
        </div>
        <div className="services__card">
          <img
            src={Professional}
            alt="shield icon"
            className="services__card-icon"
          />
          <h3 className="services__card-title">Professionality</h3>
          <p className="services__card-text">
            Our team is committed to delivering professional and reliable moving
            services, ensuring a seamless experience for every customer.
          </p>
          <img
            src={Plus}
            alt="plus icon"
            className="services__card-plus-icon"
          />
        </div>
        <div className="services__card services__card--odd">
          <img src={Gear} alt="shield icon" className="services__card-icon" />
          <h3 className="services__card-title">High Quality Material</h3>
          <p className="services__card-text">
            We use high-quality materials to safeguard your possessions during
            the entire moving process, providing peace of mind and reliability.
          </p>
          <img
            src={PlusLight}
            alt="plus icon"
            className="services__card-plus-icon"
          />
        </div>
      </div>
    </div>
  );
};
