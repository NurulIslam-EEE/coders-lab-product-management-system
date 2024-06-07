import { Modal } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openOrderModal } from "../../../redux/features/orderSlice";
import OrderSelectTable from "./OrderSelectTable";

function OrderModal() {
  const orderModal = useSelector((state) => state?.order?.orderModal);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(openOrderModal(false));
  };
  return (
    <div>
      <Modal
        centered
        open={orderModal}
        onOk={() => dispatch(openOrderModal(true))}
        onCancel={handleClose}
        width="90%"
        footer={null}
      >
        <OrderSelectTable />
      </Modal>
    </div>
  );
}

export default OrderModal;
