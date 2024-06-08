import { useDispatch, useSelector } from "react-redux";

import {
  addSelectProduct,
  incDecStep,
} from "../../../redux/features/orderSlice";
import { useGetProductsQuery } from "../../../redux/api/apiSlice";
import CustomSearchBar from "../CustomSearchBar";
import CustomButton from "../CustomButton";
import { CheckOutlined } from "@ant-design/icons";
import { valueExists } from "../../../utils/utils";
import { useState } from "react";

function OrderSelectTable() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const selectedProduct = useSelector((state) => state.order.selectedProducts);

  const { data, isLoading, error } = useGetProductsQuery(
    { search: query, pageNumber: "" },
    {
      refetchOnMountOrArgChange: true,
      pollingInterval: 60000,
    }
  );

  const handleSelect = (product) => {
    dispatch(addSelectProduct(product));
  };

  const handleStepNo = (inc) => {
    dispatch(incDecStep(inc));
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  // console.log("select", selectedProduct);
  return (
    <div>
      {" "}
      <h3 className="text-center">Order</h3>
      <h3 className="text-center">1-Select Product</h3>
      <div className="flex-end">
        <CustomSearchBar onChange={handleChange} />
      </div>
      <table style={{ width: "900px", marginTop: "5px" }}>
        <thead className="table-head">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Type</th>

            <th>Select</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {data?.data?.data?.map((item) => {
            const exist = valueExists(selectedProduct, item.id);

            return (
              <tr
                key={item.id}
                onClick={() => handleSelect(item)}
                style={{ cursor: "pointer" }}
              >
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.brand}</td>
                <td>{item.type}</td>
                <td>
                  {exist ? (
                    <CheckOutlined style={{ fontSize: "20px" }} />
                  ) : (
                    "..."
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex-end">
        <CustomButton
          title="Cancel"
          style={{ padding: "5px 22px", marginTop: "30px" }}
        />
        <CustomButton
          title="Next"
          style={{ padding: "5px 26px", marginLeft: "9px", marginTop: "30px" }}
          onClick={() => handleStepNo(true)}
        />
      </div>
    </div>
  );
}

export default OrderSelectTable;
