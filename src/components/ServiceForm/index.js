import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchServiceList } from "../../store/modules/serviceStore";
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
  const [name, setName] = useState();
  const [category, setCategory] = useState();
  const [price, setPrice] = useState();
  const [desc, setDesc] = useState();
  // const [selectChanged, setSelectChanged] = useState(false);
  const { categories } = useSelector((state) => state.service);
  const { token, logOut } = useSelector((state) => state.account);
  const dispatch = useDispatch();
  // const formRef = useRef(null);

  const categoryOptions = categories.map((item) => ({
    name: item,
    code: item,
  }));

  const fileUploadRef = useRef(null);

  useEffect(() => {
    async function getItem() {
      const res = await axios({
        method: "get",
        url: `http://localhost:3001/boss/services/${serviceId}`,
      });

      if (res) {
        setName(res.data.name);
        setCategory(res.data.category);
        setPrice(res.data.price["$numberDecimal"].toString());
        setDesc(res.data.description);
      }
    }
    if (serviceId) getItem();
  }, [serviceId]);

  const clear = () => {
    setName("");
    setCategory("");
    setPrice("");
    setDesc("");
    fileUploadRef.current.clear();
    setServiceId(null);
  };
  const navigate = useNavigate();
  const handleClear = () => {
    clear();
  };
  const handleCategory = (e) => {
    const selected = categoryOptions.find((cate) => cate.code === e.value);
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
    };
    // if any key is missing, return error
    for (const key in info) {
      if (!info[key]) {
        alert("Please fill in all fields.");
        return;
      }
    }
    const list = fileUploadRef.current.getFiles();
    formData.append("image", list[0]);
    formData.append("info", JSON.stringify(info));

    try {
      if (serviceId) {
        await axios({
          method: "PUT",
          url: `http://localhost:3001/boss/services/${serviceId}`,
          data: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        await axios({
          method: "POST",
          url: "http://localhost:3001/boss/services",
          data: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
      alert("Update service successfully.");

      dispatch(fetchServiceList());
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
              className="h-2rem"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </div>
          <div className="p-inputgroup flex-1 m-1">
            <span className="p-inputgroup-addon w-10rem">
              <span>Category</span>
            </span>
            <Dropdown
              value={category}
              onChange={handleCategory}
              options={categoryOptions}
              optionLabel="name"
              editable
              placeholder="Select a Category"
              className="w-full md:w-14rem h-2rem"
            />
          </div>
          <div className="p-inputgroup flex-1 m-1">
            <span className="p-inputgroup-addon w-10rem">
              <span>Description</span>
            </span>
            <InputTextarea
              autoResize
              value={desc}
              onChange={(event) => {
                setDesc(event.target.value);
              }}
              rows={8}
              cols={30}
            />
          </div>
          <div className="p-inputgroup flex-1 m-1">
            <span className="p-inputgroup-addon w-10rem">
              <span>Price</span>
            </span>
            <InputNumber
              className="h-2rem"
              value={price}
              onValueChange={(event) => {
                setPrice(event.target.value);
              }}
              mode="currency"
              currency="EUR"
              locale="fr-FR"
            />
          </div>
          <div className="p-inputgroup flex-1 m-1">
            <span className="p-inputgroup-addon w-10rem">
              <span>Picture</span>
            </span>
            <FileUpload
              className="h-4rem"
              ref={fileUploadRef}
              name="picture"
              accept="image/*"
              maxFileSize={1000000}
              mode="basic"
              chooseOptions={{
                label: "Choose",
                className: "custom-choose-btn",
                style: {
                  margin: "20px",
                  fontSize: "20px",
                  padding: "10px",
                  backgroundColor: "var(--main-blue)",
                },
              }}
            />
          </div>
        </form>
        <div className="flex justify-content-between m-3">
          <Button
            label="Submit"
            onClick={handleSubmit}
            className="w-6rem h-3rem"
            style={{ backgroundColor: "var(--blue-23)" }}
          ></Button>
          <Button
            label="Clear"
            onClick={handleClear}
            className="w-6rem h-3rem"
            style={{ backgroundColor: "var(--blue-23)" }}
          ></Button>
        </div>
      </Card>
    </div>
  );
};
export default ServiceForm;
