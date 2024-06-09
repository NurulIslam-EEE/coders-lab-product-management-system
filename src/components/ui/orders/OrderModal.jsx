import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { openOrderModal } from "../../../redux/features/orderSlice";
import OrderSelectTable from "./OrderSelectTable";
import VariantsTable from "./VariantsTable";
import OrderConfirmation from "./OrderConfirmation";
import ViewOrEditOrder from "./ViewOrEditOrder";

function OrderModal() {
  const orderModal = useSelector((state) => state?.order?.orderModal);
  const stepNo = useSelector((state) => state?.order?.stepNo);
  const viewOrder = useSelector((state) => state?.order?.viewOrder);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(openOrderModal(false));
  };
  console.log("vvvv", stepNo, viewOrder);
  return (
    <div className="order-modal">
      <Modal
        centered
        open={orderModal}
        onOk={() => dispatch(openOrderModal(true))}
        onCancel={handleClose}
        width="fit-content"
        footer={null}
      >
        {viewOrder && <ViewOrEditOrder />}
        {!viewOrder && stepNo === 1 && <OrderSelectTable />}
        {!viewOrder && stepNo === 2 && <VariantsTable />}
        {!viewOrder && stepNo === 3 && <OrderConfirmation />}
      </Modal>
    </div>
  );
}

export default OrderModal;
