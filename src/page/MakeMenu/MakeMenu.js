import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPlatList } from "../../store/modules/platStore";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { FileUpload } from "primereact/fileupload";
import { Dropdown } from "primereact/dropdown";
const MakeMenu = () => {
  // Define the states for the form fields
  const [name, setName] = useState();
  const [category, setCategory] = useState();
  const [price, setPrice] = useState();
  const [picture, setPicture] = useState();

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

  const handlePictureUpload = (event) => {
    setPicture(URL.createObjectURL(event.files[0]));
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
              name="picture"
              onUpload={handlePictureUpload}
              accept="image/*"
              maxFileSize={1000000}
            />
          </div>
        </form>
      </Card>
    </div>
  );
};
export default MakeMenu;
