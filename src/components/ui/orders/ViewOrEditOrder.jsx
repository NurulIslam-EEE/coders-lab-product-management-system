import { CheckOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function ViewOrEditOrder() {
  const [orderData, setOrderData] = useState({});

  const viewOrder = useSelector((state) => state?.order?.viewOrder);
  const handleChange = (e) => {};

  const handleAddSpecification = (data) => {};
  const handleRemoveSpecification = (id) => {};

  useEffect(() => {
    setOrderData(viewOrder);
  }, [viewOrder]);
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

      {/* variants */}
      {orderData?.details?.map((spec, ind) => {
        const exist = true;
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
                onClick={() => handleAddSpecification(spec)}
              >
                +
              </button>
            )}
            <button
              className="plus_minus"
              onClick={() => handleRemoveSpecification(spec.variant_id)}
            >
              -
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default ViewOrEditOrder;
