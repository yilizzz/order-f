import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LanguageSlide from "../../components/LanguageSlide";

import { logOut } from "../../store/modules/accountStore";
import Service from "../../components/Service/index";
import ServiceForm from "../../components/ServiceForm/index";
import Banner from "../../components/Banner";
import Footer from "../../components/Footer";
import { Button } from "primereact/button";
const ServiceAdmin = () => {
  const [serviceId, setServiceId] = useState(null);
  const nav = useNavigate();
  const dispatch = useDispatch();
  // Get the account state from the store
  const { role } = useSelector((state) => state.account);

  return (
    <div className="fullPage">
      <div className="lang-option">
        <LanguageSlide />
      </div>
      <div className="main">
        <Banner />
        {role === "boss" ? (
          <>
            <Button
              label="Logout"
              className="bg-teal-800"
              onClick={() => {
                dispatch(logOut());
              }}
            />
            <ServiceForm serviceId={serviceId} setServiceId={setServiceId} />
            <Service option="boss" setServiceId={setServiceId} />
          </>
        ) : (
          <Button
            label="Login"
            className="bg-orange-800"
            onClick={() => {
              nav("/bosslogin");
            }}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};
export default ServiceAdmin;
