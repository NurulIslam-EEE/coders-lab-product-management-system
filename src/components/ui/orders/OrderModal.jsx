import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { openOrderModal } from "../../../redux/features/orderSlice";
import OrderSelectTable from "./OrderSelectTable";
import VariantsTable from "./VariantsTable";
import OrderConfirmation from "./OrderConfirmation";

function OrderModal() {
  const orderModal = useSelector((state) => state?.order?.orderModal);
  const stepNo = useSelector((state) => state?.order?.stepNo);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(openOrderModal(false));
  };
  // console.log("", stepNo);
  return (
    <div>
      <Modal
        centered
        open={orderModal}
        onOk={() => dispatch(openOrderModal(true))}
        onCancel={handleClose}
        width="fit-content"
        footer={null}
      >
        {stepNo === 1 && <OrderSelectTable />}
        {stepNo === 2 && <VariantsTable />}
        {stepNo === 3 && <OrderConfirmation />}
      </Modal>
    </div>
  );
}

export default OrderModal;
