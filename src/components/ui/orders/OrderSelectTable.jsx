import { useDispatch, useSelector } from "react-redux";
import data from "../../../utils/data.json";
import { addSelectProduct } from "../../../redux/features/orderSlice";
function OrderSelectTable() {
  const dispatch = useDispatch();
  const selectedProduct = useSelector((state) => state.order.selectedProducts);

  const handleSelect = (product) => {
    dispatch(addSelectProduct(product));
  };

  console.log("ssss", selectedProduct);
  return (
    <div>
      {" "}
      <h5>Order</h5>
      <h5>1-Select Product</h5>
      <table style={{ width: "100%", marginTop: "5px" }}>
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
          {data?.map((item) => {
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
                <td>{item.type}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default OrderSelectTable;
