import { Pagination } from "antd";

function OrdersTable() {
  const data = [];
  return (
    <div>
      {" "}
      <table style={{ width: "100%", marginTop: "5px" }}>
        <thead className="table-head">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Type</th>
            <th>Create At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {data?.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.brand}</td>
                <td>{item.type}</td>
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
                  <p style={{ margin: "0 0 0 5px" }}>Delete</p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination-table">
        <Pagination defaultCurrent={3} total={50} defaultPageSize={10} />
      </div>
    </div>
  );
}

export default OrdersTable;
