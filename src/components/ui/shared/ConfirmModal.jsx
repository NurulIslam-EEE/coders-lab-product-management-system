import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { openOrderConfirmModal } from "../../../redux/features/orderSlice";
const ConfirmModal = ({ handleDelete }) => {
  const isModal = useSelector((state) => state.order.orderConfirmModal);
  const dispatch = useDispatch();

  const handleOk = async () => {
    handleDelete();
  };
  const handleCancel = () => {
    dispatch(openOrderConfirmModal(false));
  };
  return (
    <>
      <Modal
        title="Are you sure want to delete it"
        className="modalStyle"
        centered
        open={isModal}
        onOk={handleOk}
        onCancel={handleCancel}
      ></Modal>
    </>
  );
};
export default ConfirmModal;
