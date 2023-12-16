import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPlatList } from "../../store/modules/platStore";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { FileUpload } from "primereact/fileupload";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import axios from "axios";
const MakeMenu = () => {
  // Define the states for the form fields
  const [name, setName] = useState();
  const [category, setCategory] = useState();
  const [price, setPrice] = useState();
  const fileUploadRef = useRef(null);

  const { categories } = useSelector((state) => state.plat);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPlatList());
  }, [dispatch]);
  const categoryOptions = categories.map((item) => ({
    name: item,
    code: item,
  }));
  // Define the handler functions for the form fields
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.value);
  };

  const handlePriceChange = (event) => {
    setPrice(event.value);
  };

  let formData = new FormData();
  const handleSubmit = async () => {
    const list = fileUploadRef.current.getFiles();
    formData.append("file", list[0]);

    // Append other data to the formData object
    formData.append("category", category.name);
    formData.append("name", name);
    formData.append("price", price);

    try {
      const res = await axios({
        method: "post",
        url: "http://localhost:3001/plats",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);
    } catch (error) {
      console.error(error);
      console.error(error.response);
    }
  };
  const handleDelete = () => {
    axios({
      method: "delete",
      url: "http://localhost:3001/plats/23",

      headers: { "Content-Type": "application/json" },
      responseType: "json",
    });
  };
  // Render the form component
  return (
    <div className="flex flex-column justify-content-start align-items-center">
      <Card title="Edit Dish Information">
        <form>
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon w-10rem">
              <span>Name</span>
            </span>
            <InputText
              value={name}
              onChange={handleNameChange}
              placeholder="Name"
            />
          </div>
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon w-10rem">
              <span>Category</span>
            </span>
            <Dropdown
              value={category}
              onChange={handleCategoryChange}
              options={categoryOptions}
              optionLabel="name"
              editable
              placeholder="Select a Category"
              className="w-full md:w-14rem"
            />
          </div>
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon w-10rem">
              <span>Price</span>
            </span>
            <InputNumber
              value={price}
              onValueChange={handlePriceChange}
              mode="currency"
              currency="EUR"
              locale="fr-FR"
            />
          </div>
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon w-10rem">
              <span>Picture</span>
            </span>
            <FileUpload
              ref={fileUploadRef}
              name="picture"
              accept="image/*"
              maxFileSize={1000000}
              mode="basic"
            />
          </div>
        </form>
        <Button label="Submit" onClick={handleSubmit}></Button>
      </Card>
      <Button label="delete" onClick={handleDelete}></Button>
    </div>
  );
};
export default MakeMenu;
