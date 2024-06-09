import { Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  addEditOrder,
  addViewOrder,
  openOrderModal,
} from "../../../redux/features/orderSlice";
import OrderSelectTable from "./OrderSelectTable";
import VariantsTable from "./VariantsTable";
import OrderConfirmation from "./OrderConfirmation";
import ViewOrEditOrder from "./ViewOrEditOrder";

function OrderModal() {
  const orderModal = useSelector((state) => state?.order?.orderModal);
  const stepNo = useSelector((state) => state?.order?.stepNo);
  const viewOrder = useSelector((state) => state?.order?.viewOrder);
  const editOrder = useSelector((state) => state?.order?.editOrder);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(openOrderModal(false));
    dispatch(addViewOrder(null));
    dispatch(addEditOrder(null));
  };
  // console.log("vvvv", stepNo, viewOrder);
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
        {(viewOrder || editOrder) && <ViewOrEditOrder />}
        {!editOrder && !viewOrder && stepNo === 1 && <OrderSelectTable />}
        {!editOrder && !viewOrder && stepNo === 2 && <VariantsTable />}
        {!editOrder && !viewOrder && stepNo === 3 && <OrderConfirmation />}
      </Modal>
    </div>
  );
}

export default OrderModal;
