import { Pagination } from "antd";
import { useDispatch } from "react-redux";
import {
  addEditData,
  addViewData,
  setModalOpen,
} from "../../redux/features/productsSlice";

function CustomTable({ data, total }) {
  // console.log("all", data);
  const dispatch = useDispatch();
  const handleEdit = (data) => {
    // console.log("ttt", data);
    dispatch(addEditData(data));
    dispatch(setModalOpen(true));
  };

  const handleView = (data) => {
    // console.log("ttt", data);
    dispatch(addViewData(data));
    dispatch(setModalOpen(true));
  };
  return (
    <div>
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
                  <p
                    onClick={() => handleView(item)}
                    style={{ margin: "0 5px 0 0" }}
                  >
                    view
                  </p>{" "}
                  |{" "}
                  <p
                    onClick={() => handleEdit(item)}
                    style={{ margin: "0 5px" }}
                  >
                    Edit
                  </p>{" "}
                  | <p style={{ margin: "0 0 0 5px" }}>Delete</p>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination-table">
        <Pagination defaultCurrent={3} total={total} defaultPageSize={20} />
      </div>
    </div>
  );
}

export default CustomTable;
