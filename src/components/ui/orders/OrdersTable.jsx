import { Pagination } from "antd";
import {
  useDeleteOrderMutation,
  useGetOrdersQuery,
  usePostOrderMutation,
} from "../../../redux/api/apiSlice";
import dateFormat, { masks } from "dateformat";
import { useState } from "react";
import { setConfirmModal } from "../../../redux/features/productsSlice";
import { useDispatch } from "react-redux";
import ConfirmModal from "../shared/ConfirmModal";
import {
  addEditOrder,
  addViewOrder,
  openOrderConfirmModal,
  openOrderModal,
} from "../../../redux/features/orderSlice";

function OrdersTable({ data, setPageNumber }) {
  // const { data, error, isLoading } = useGetOrdersQuery();
  const dispatch = useDispatch();
  const [deleteOrder, result] = useDeleteOrderMutation();
  const [id, setId] = useState(null);

  // delete order
  const handleOpenConfirm = (id1) => {
    setId(id1);
    dispatch(openOrderConfirmModal(true));
  };
  const handleDeleteOrder = async () => {
    // console.log(id);

    try {
      const res = await deleteOrder(id);
      dispatch(openOrderConfirmModal(false));
      console.log("delete order", res);
    } catch (err) {
      console.log(err);
    }
  };

  const onChange = (pageNumber) => {
    setPageNumber(pageNumber);
    // console.log("Page: ", pageNumber);
  };
  const handleViewOrder = (item) => {
    dispatch(addViewOrder(item));
    dispatch(openOrderModal(true));
  };

  const handleEditOrder = (item) => {
    dispatch(addEditOrder(item));
    dispatch(openOrderModal(true));
  };

  console.log("orderrr", id);

  return (
    <div>
      {" "}
      <div className="table-container">
        <table style={{ marginTop: "5px" }} className="products-table">
          <thead className="table-head">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Total Quantity</th>
              <th>Create At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {data?.data?.data?.map((item) => {
              const now = new Date(item.created_at);
              const finalDate = dateFormat(now, "dS mmmm, yyyy");
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.address}</td>
                  <td>{item.total_quantity}</td>
                  <td>{finalDate}</td>
                  <td
                    style={{
                      color: "#c31600",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <p
                      style={{ margin: "0 5px 0 0" }}
                      onClick={() => handleViewOrder(item)}
                    >
                      view
                    </p>{" "}
                    |{" "}
                    <p
                      style={{ margin: "0 5px" }}
                      onClick={() => handleEditOrder(item)}
                    >
                      Edit
                    </p>{" "}
                    |{" "}
                    <p
                      style={{ margin: "0 0 0 5px" }}
                      onClick={() => handleOpenConfirm(item.id)}
                    >
                      Delete
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pagination-table">
        <Pagination
          defaultCurrent={1}
          total={data?.data?.total}
          defaultPageSize={10}
          onChange={onChange}
        />
      </div>
      <ConfirmModal handleDelete={handleDeleteOrder} />
    </div>
  );
}

export default OrdersTable;
