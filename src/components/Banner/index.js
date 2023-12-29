import "./index.css";
import { Image } from "primereact/image";
import icon from "../../assets/favicon.ico";

const Banner = () => {
  return (
    <div className="banner">
      <Image src={icon} alt="Z Service" className="absolute top-4 left-4 " />
    </div>
  );
};

export default Banner;
