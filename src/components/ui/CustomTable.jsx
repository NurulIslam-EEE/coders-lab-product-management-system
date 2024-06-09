import { Modal, Pagination } from "antd";
import { useDispatch } from "react-redux";
import {
  addEditData,
  addViewData,
  setConfirmModal,
  setModalOpen,
} from "../../redux/features/productsSlice";
import dateFormat, { masks } from "dateformat";

import ConfirmModal from "./shared/ConfirmModal";
import { useState } from "react";
import { useDeleteProductMutation } from "../../redux/api/apiSlice";
import ConfirmModal2 from "./shared/ConfirmModal2";

function CustomTable({ data, total, setPageNumber }) {
  // console.log("all", data);
  const [id, setId] = useState(null);
  const dispatch = useDispatch();

  const [deleteProduct, result] = useDeleteProductMutation();

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
  const onChange = (pageNumber) => {
    setPageNumber(pageNumber);
    // console.log("Page: ", pageNumber);
  };

  // delete
  const handleDeleteProd = async () => {
    try {
      const res = await deleteProduct(id);
      dispatch(setConfirmModal(false));
      console.log("deleeeee", res.data, res.error, result);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOpenConfirm = (id) => {
    setId(id);
    dispatch(setConfirmModal(true));
  };
  return (
    <div>
      <div className="table-container">
        <table style={{ marginTop: "5px" }} className="products-table">
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
              const now = new Date(item.created_at);
              const finalDate = dateFormat(now, "dS mmmm, yyyy");
              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.brand}</td>
                  <td>{item.type}</td>
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
          total={total}
          defaultPageSize={20}
          showSizeChanger={false}
          onChange={onChange}
        />
      </div>
      <ConfirmModal2 handleDeleteProd={handleDeleteProd} />
    </div>
  );
}

export default CustomTable;
