import { CheckOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../CustomButton";
import {
  addEditOrder,
  addViewOrder,
  openOrderModal,
} from "../../../redux/features/orderSlice";
import { valueExistsAnyField } from "../../../utils/utils";
import { useUpdateOrderMutation } from "../../../redux/api/apiSlice";
import { toast, ToastContainer } from "react-toastify";

function ViewOrEditOrder() {
  const [orderData, setOrderData] = useState({});
  const [upVariants, setUpVariants] = useState([]);

  const viewOrder = useSelector((state) => state?.order?.viewOrder);
  const editOrder = useSelector((state) => state?.order?.editOrder);

  const [updateOrder, result] = useUpdateOrderMutation();

  const notifySuccess = () => {
    toast.success("Successfully order updated", {
      position: "top-right",
    });
  };
  const notify = () => {
    toast.error("Please select all field", {
      position: "top-right",
    });
  };
  const dispatch = useDispatch();

  const handleAddVariants = (data) => {
    const exist = upVariants.filter(
      (vari) => vari.variant_id === data.variant_id
    );
    if (exist.length > 0) {
      return;
    }
    setUpVariants((prev) => [...prev, data]);
  };
  const handleRemoveVariants = (id) => {
    const filter = upVariants.filter((vari) => vari.variant_id !== id);
    setUpVariants(filter);
  };
  const handleClose = () => {
    dispatch(openOrderModal(false));
    dispatch(addViewOrder(null));
    dispatch(addEditOrder(null));
  };

  const handleChange = (e) => {
    const newData = { ...orderData, [e.target.name]: e.target.value };

    setOrderData(newData);
  };

  useEffect(() => {
    if (viewOrder) {
      setOrderData(viewOrder);
      const filtered = viewOrder?.details?.map((ord) => {
        return { variant_id: ord.variant_id, quantity: ord.quantity };
      });
      setUpVariants(filtered);
    }
    if (editOrder) {
      setOrderData(editOrder);
      const filtered = editOrder?.details?.map((ord) => {
        return { variant_id: ord.variant_id, quantity: ord.quantity };
      });
      setUpVariants(filtered);
    }
  }, [viewOrder, editOrder]);

  const handleSubmitOrder = async () => {
    if (
      !orderData.name ||
      !orderData.email ||
      !orderData.address ||
      orderData.total_quantity < 1 ||
      orderData.details.length < 1
    ) {
      notify();
      return;
    }
    const newData = { ...orderData, _method: "PUT", details: upVariants };
    try {
      const res = await updateOrder({ data: newData, id: orderData.id });

      if (res?.data?.message) {
        notifySuccess();
        dispatch(openOrderModal(false));
        dispatch(addViewOrder(null));
        dispatch(addEditOrder(null));
      }
      console.log("upppp", res);
    } catch (err) {
      console.log(err);
    }
  };

  console.log("edi", orderData, upVariants);
  return (
    <div className="h-100">
      <h3 className="text-center">View Order </h3>

      <div className="flex-center h">
        <div className="h-100">
          <div>
            <input
              className="custom-input input-medium"
              name="name"
              type="text"
              placeholder="Name"
              onChange={handleChange}
              value={orderData?.name}
            />
            <input
              className="custom-input input-medium"
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              value={orderData?.email}
            />{" "}
          </div>

          <div>
            <input
              className="custom-input input-medium"
              name="address"
              type="text"
              placeholder="Address"
              onChange={handleChange}
              value={orderData?.address}
            />
            <input
              className="custom-input input-medium"
              name="total"
              type="number"
              placeholder="Total Quantity"
              disabled
              value={orderData?.total_quantity}
            />
          </div>
        </div>
      </div>

      <h3 className="text-center">Variants </h3>
      {/* variants */}
      {orderData?.details?.map((spec, ind) => {
        const exist = valueExistsAnyField(
          upVariants,
          "variant_id",
          spec.variant_id
        );
        return (
          <div key={ind}>
            <input
              name="color"
              className="custom-input"
              type="text"
              placeholder="Color"
              value={spec?.variant?.color}
              // onChange={(e) => handleSpecification(e, ind)}
              disabled
            />
            <input
              name="specification"
              className="custom-input specification-input"
              type="text"
              placeholder="Specification"
              value={spec?.variant?.specification}
              // onChange={(e) => handleSpecification(e, ind)}
              disabled
            />
            <input
              name="size"
              className="custom-input size-input"
              type="text"
              placeholder="Size"
              value={spec?.variant?.size}
              // onChange={(e) => handleSpecification(e, ind)}
              disabled
            />
            {exist ? (
              <button className="plus_minus mr-5 ">
                <CheckOutlined style={{ fontSize: "8px", fontWeight: 800 }} />
              </button>
            ) : (
              <button
                className="plus_minus mr-5 "
                onClick={() => handleAddVariants(spec)}
              >
                +
              </button>
            )}
            <button
              className="plus_minus"
              onClick={() => handleRemoveVariants(spec.variant_id)}
            >
              -
            </button>
          </div>
        );
      })}
      {editOrder && (
        <div className="flex-end">
          <CustomButton
            title="Cancel"
            style={{ padding: "5px 22px", marginTop: "30px" }}
            onClick={handleClose}
          />
          <CustomButton
            title="Update"
            style={{
              padding: "5px 26px",
              marginLeft: "9px",
              marginTop: "30px",
            }}
            onClick={handleSubmitOrder}
          />
        </div>
      )}
    </div>
  );
}

export default ViewOrEditOrder;
