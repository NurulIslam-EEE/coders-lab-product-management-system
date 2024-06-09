import { Button, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setConfirmModal } from "../../../redux/features/productsSlice";
const ConfirmModal2 = ({ handleDeleteProd }) => {
  const isModal = useSelector((state) => state.product.confirmModal);
  const dispatch = useDispatch();

  const handleOk = async () => {
    handleDeleteProd();
  };
  const handleCancel = () => {
    dispatch(setConfirmModal(false));
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
export default ConfirmModal2;
