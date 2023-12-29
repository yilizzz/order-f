import Menu from "../Menu";
import { useSelector, useDispatch } from "react-redux";
import { fetchServiceList, addCart } from "../../store/modules/serviceStore";
import { useEffect } from "react";
import { Image } from "primereact/image";
import Count from "../Count";
import { Button } from "primereact/button";
import "./index.css";
import axios from "axios";

const Service = ({ option, setServiceId }) => {
  const { serviceList, activeCategory, cartList } = useSelector(
    (state) => state.service
  );
  // Get the account state from the store
  const { token } = useSelector((state) => state.account);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchServiceList());
  }, [dispatch]);
  const editService = (id) => {
    setServiceId(id);
  };
  const deleteServiceById = async (id) => {
    try {
      const res = await axios({
        method: "DELETE",
        url: `http://localhost:3001/boss/services/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        alert("Delete successfully.");
        dispatch(fetchServiceList());
      }
    } catch (error) {
      alert("Delete failed.");
    }
  };
  return (
    <div className="menuService">
      <Menu />

      <div className="services">
        {serviceList.map(
          (item) =>
            activeCategory === item.category && (
              <div key={item._id} className="item">
                <Image
                  src={item.image}
                  alt="Z Service"
                  width="200"
                  height="200"
                  preview
                />

                <div className="flex flex-column m-5 gap-2">
                  <span>{item.name}</span>
                  {item.description.split("{").map((part, index) => (
                    <p key={index}>{part}</p>
                  ))}
                  {item.price["$numberDecimal"] < 1 ? null : (
                    <span>
                      Reservation Deposit :{" "}
                      {item.price["$numberDecimal"].toString()} {` EUR`}
                    </span>
                  )}

                  {option === "client" ? (
                    <div className="flex justify-content-end align-items-center">
                      <i
                        className="pi pi-shopping-cart"
                        style={{ fontSize: "1.5rem" }}
                      ></i>
                      <Count
                        count={
                          cartList.find((list) => list.service._id === item._id)
                            ?.count || 0
                        }
                        onPlus={() =>
                          dispatch(
                            addCart({
                              _id: item._id,
                              service: item,
                              State: "Plus",
                            })
                          )
                        }
                        onMinus={() =>
                          dispatch(
                            addCart({
                              _id: item._id,
                              service: item,
                              State: "Minus",
                            })
                          )
                        }
                      />
                    </div>
                  ) : (
                    <div className="flex justify-content-between">
                      <Button
                        label="Edit"
                        icon="pi pi-pencil"
                        style={{ backgroundColor: "var(--blue-23)" }}
                        className="w-6rem h-3rem p-2"
                        onClick={() => editService(item._id)}
                      ></Button>
                      <Button
                        label="Delete"
                        icon="pi pi-trash"
                        style={{ backgroundColor: "var(--blue-23)" }}
                        className="w-6rem h-3rem p-2"
                        onClick={() => deleteServiceById(item._id)}
                      ></Button>
                    </div>
                  )}
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};
export default Service;
