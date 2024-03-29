import "./Home.scss";
import { HomeNav } from "../../components/homeNav/HomeNav";
import { HomeShowcase } from "../../components/homeShowcase/HomeShowcase";
import { HomeServices } from "../../components/homeServices/HomeServices";
import { MovingProcess } from "../../components/movingProcess/MovingProcess";
import { HomeFooter } from "../../components/homeFooter/HomeFooter";
import { UserForm } from "../../components/userForm/UserForm";
export const Home = () => {
  return (
    <>
      <div className="main">
        <HomeNav />
        <HomeShowcase />
        <HomeServices />
        <MovingProcess />
        <UserForm />
      </div>
      <HomeFooter />
    </>
  );
};
