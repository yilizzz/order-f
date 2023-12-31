import "./index.css";
import { Image } from "primereact/image";
import icon from "../../assets/favicon.ico";

const Banner = () => {
  return (
    <div className="banner">
      <a href="/">
        <Image
          width="125"
          height="125"
          src={icon}
          alt="Z Service"
          className="icon"
        />
      </a>
    </div>
  );
};

export default Banner;
