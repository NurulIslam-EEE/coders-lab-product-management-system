import { Pagination } from "antd";
import {
  useDeleteOrderMutation,
  useGetOrdersQuery,
  usePostOrderMutation,
} from "../../../redux/api/apiSlice";

function OrdersTable() {
  const { data, error, isLoading } = useGetOrdersQuery();

  const [deleteOrder, result] = useDeleteOrderMutation();

  const handleDelete = async (id) => {
    console.log(id);
    try {
      await deleteOrder(id);
    } catch (err) {
      console.log(err);
    }
  };

  console.log("orderrr", result);

  return (
    <div>
      {" "}
      <table style={{ width: "100%", marginTop: "5px" }}>
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
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.address}</td>
                <td>{item.total_quantity}</td>
                <td>{item.created_at.slice(0, 10)}</td>
                <td
                  style={{
                    color: "#c31600",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <p style={{ margin: "0 5px 0 0" }}>view</p> |{" "}
                  <p style={{ margin: "0 5px" }}>Edit</p> |{" "}
                  <p
                    style={{ margin: "0 0 0 5px" }}
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination-table">
        <Pagination
          defaultCurrent={1}
          total={data?.data?.total}
          defaultPageSize={10}
        />
      </div>
    </div>
  );
}

export default OrdersTable;
