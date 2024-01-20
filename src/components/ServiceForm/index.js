import { useState, useRef, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchServiceList } from "../../store/modules/serviceStore";
import { LanguageContext } from "../../context/language";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { FileUpload } from "primereact/fileupload";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";

import axios from "axios";
import { useEffect } from "react";

const ServiceForm = ({ serviceId, setServiceId }) => {
  const { language } = useContext(LanguageContext);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [link, setLink] = useState("");

  const { categories } = useSelector((state) => state.service);
  const { token } = useSelector((state) => state.account);
  const dispatch = useDispatch();

  const categoryOptions = categories.map((item) => ({
    name: item,
    code: item,
  }));

  const fileUploadRef = useRef(null);

  useEffect(() => {
    async function getItem() {
      const res = await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}/boss/services/${serviceId}/${language}`,
      });

      if (res) {
        setName(res.data.name);
        setCategory(res.data.category);
        setPrice(res.data.price["$numberDecimal"].toString());
        setDesc(res.data.description);
        setLink(res.data.link);
      }
    }
    if (serviceId) getItem();
  }, [serviceId, language]);

  const clear = () => {
    setName("");
    setCategory("");
    setPrice("");
    setDesc("");
    setLink("");
    fileUploadRef.current.clear();
    setServiceId(null);
  };

  const handleClear = () => {
    clear();
  };
  const handleCategory = (e) => {
    // if user choose a category from dropdown, set category to the selected category name
    // otherwise, set category to the new edited category value
    const selected = categoryOptions.find((cate) => cate.code === e.value.code);
    if (selected) {
      setCategory(selected.name);
    } else {
      setCategory(e.value);
    }
  };
  let formData = new FormData();
  const handleSubmit = async () => {
    const info = {
      name: name,
      category: category,
      price: price,
      description: desc,
      link: link,
    };

    //name, category, price are 3 fields required
    const requiredFields = ["name", "category", "price"];

    let missingFields = requiredFields.filter(
      (field) => info[field] === null || info[field] === ""
    );

    if (missingFields.length > 0) {
      alert("Missing required fields: ", missingFields);
      return;
    }
    const list = fileUploadRef.current.getFiles();
    formData.append("image", list[0]);
    formData.append("info", JSON.stringify(info));

    try {
      if (serviceId) {
        await axios({
          method: "PUT",
          url: `${process.env.REACT_APP_API_URL}/boss/services/${serviceId}/${language}`,
          data: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios({
          method: "POST",
          url: `${process.env.REACT_APP_API_URL}/boss/services/${language}`,
          data: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      alert("Update service successfully.");

      dispatch(fetchServiceList(language));
    } catch (error) {
      alert("Update service failed.");
      console.error(error);
    }
    clear();
  };
  return (
    <div className="w-12 m-5 flex flex-column align-items-center justify-content-center">
      <span className="text-lg font-semibold mb-5">Add/Edit Service</span>
      <Card className="w-11 p-5">
        <form>
          <div className="p-inputgroup flex-1 m-1">
            <span className="p-inputgroup-addon w-10rem">
              <span>Name</span>
            </span>
            <InputText
              id="name"
              className="w-full md:w-14rem h-3rem"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
              required
            />
          </div>
          <div className="p-inputgroup flex-1 m-1">
            <span className="p-inputgroup-addon w-10rem">
              <span>Category</span>
            </span>
            <Dropdown
              id="cate"
              value={category}
              onChange={handleCategory}
              options={categoryOptions}
              optionLabel="name"
              editable
              placeholder="Select a Category or input a new one"
              className="w-full md:w-14rem h-3rem"
              required
            />
          </div>
          <div className="p-inputgroup flex-1 m-1">
            <span className="p-inputgroup-addon w-10rem">
              <span>Description</span>
            </span>
            <InputTextarea
              id="desc"
              autoResize
              value={desc}
              onChange={(event) => {
                setDesc(event.target.value);
              }}
              rows={8}
              cols={30}
              className="w-full md:w-14rem"
            />
          </div>
          <div className="p-inputgroup flex-1 m-1">
            <span className="p-inputgroup-addon w-10rem">
              <span>Link</span>
            </span>
            <InputText
              id="link"
              className="w-full md:w-14rem h-3rem"
              value={link}
              onChange={(event) => {
                setLink(event.target.value);
              }}
            />
          </div>
          <div className="p-inputgroup flex-1 m-1">
            <span className="p-inputgroup-addon w-10rem">
              <span>Price</span>
            </span>
            <InputNumber
              id="price"
              className="w-full md:w-14rem h-3rem"
              value={price}
              onValueChange={(event) => {
                setPrice(event.target.value);
              }}
              mode="currency"
              currency="EUR"
              locale="fr-FR"
              required
            />
          </div>
          <div className="p-inputgroup flex-1 m-1">
            <span className="p-inputgroup-addon w-10rem">
              <span>Picture</span>
            </span>
            <FileUpload
              id="file"
              className="w-full md:w-14rem h-4rem"
              ref={fileUploadRef}
              name="picture"
              accept="image/*"
              maxFileSize={1000000}
              mode="basic"
              chooseOptions={{
                label: "Choose",
                className: "custom-choose-btn",
                style: {
                  margin: "10px",
                  fontSize: "16px",
                  padding: "10px",
                  backgroundColor: "var(--main-blue)",
                },
              }}
            />
          </div>
        </form>
        <div className="flex justify-content-between m-5">
          <Button
            label="Submit"
            onClick={handleSubmit}
            className="w-6rem h-3rem"
            style={{
              backgroundColor: "var(--blue-23)",
              border: "solid 1px var(--blue-23)",
            }}
          ></Button>
          <Button
            label="Clear"
            onClick={handleClear}
            className="w-6rem h-3rem"
            style={{
              backgroundColor: "var(--blue-23)",
              border: "solid 1px var(--blue-23)",
            }}
          ></Button>
        </div>
      </Card>
    </div>
  );
};
export default ServiceForm;
