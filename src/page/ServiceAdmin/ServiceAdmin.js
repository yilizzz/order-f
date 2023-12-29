import React, { useState } from "react";
import Service from "../../components/Service/index";
import ServiceForm from "../../components/ServiceForm/index";
import Banner from "../../components/Banner";
import Footer from "../../components/Footer";
const ServiceAdmin = () => {
  const [serviceId, setServiceId] = useState(null);
  return (
    <div className="flex flex-column justify-content-start align-items-center">
      <Banner />
      <ServiceForm serviceId={serviceId} setServiceId={setServiceId} />
      <Service option="boss" setServiceId={setServiceId} />
      <Footer />
    </div>
  );
};
export default ServiceAdmin;
