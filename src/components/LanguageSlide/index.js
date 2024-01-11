import { LanguageContext } from "../../context/language";
import { useContext } from "react";
import "./index.css";
const LanguageSlide = () => {
  const { setLanguage, language } = useContext(LanguageContext);
  const handleSliderChange = (event) => {
    setLanguage(event.target.value === "0" ? "fr" : "en");
  };
  return (
    <div className="slide">
      Français
      <input
        type="range"
        value={language === "fr" ? "0" : "1"}
        min="0"
        max="1"
        step="1"
        onChange={handleSliderChange}
      />
      English
    </div>
  );
};

export default LanguageSlide;
