import CustomButton from "../CustomButton";
import { useDispatch, useSelector } from "react-redux";
import {
  incDecStep,
  openOrderModal,
  resetStepNo,
  updateBillingInformation,
} from "../../../redux/features/orderSlice";
import { usePostOrderMutation } from "../../../redux/api/apiSlice";
import { toast, ToastContainer } from "react-toastify";

function OrderConfirmation() {
  const dispatch = useDispatch();

  const notify = () => {
    toast.success("Successfully order created", {
      position: "top-right",
    });
  };

  const [postOrder, result] = usePostOrderMutation();

  const billingInformation = useSelector(
    (state) => state.order.billingInformation
  );
  const handleStepNo = (inc) => {
    dispatch(incDecStep(inc));
  };

  const handleChange = (e) => {
    dispatch(
      updateBillingInformation({ name: e.target.name, value: e.target.value })
    );
  };
  const handleSubmitOrder = async () => {
    try {
      // const res = await axios.post(
      //   "https://reactjr.coderslab.online/api/orders",
      //   billingInformation
      // );
      const res = await postOrder({ data: billingInformation });
      if (res?.data?.message) {
        notify();
        dispatch(
          updateBillingInformation({
            name: "",
            email: "",
            address: "",
            total_quantity: 0,
            details: [],
          })
        );
        dispatch(resetStepNo());
        dispatch(openOrderModal(false));
      }
      console.log("order confirm", res);
    } catch (err) {
      console.log(err);
    }
  };

  // console.log("billing", billingInformation);
  return (
    <div className="h-100">
      <h3 className="text-center">Order Create</h3>
      <h3 className="text-center"> 3 - Information</h3>
      <div className="flex-center h">
        <div className="h-100">
          <div>
            <input
              className="custom-input input-medium"
              name="name"
              type="text"
              placeholder="Name"
              onChange={handleChange}
            />
            <input
              className="custom-input input-medium"
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
            />{" "}
          </div>

          <div>
            <input
              className="custom-input input-medium"
              name="address"
              type="text"
              placeholder="Address"
              onChange={handleChange}
            />
            <input
              className="custom-input input-medium"
              name="total"
              type="number"
              placeholder="Total Quantity"
              disabled
              value={billingInformation?.total_quantity}
            />
          </div>
        </div>
      </div>
      <div className="flex-end">
        <CustomButton
          title="Back"
          style={{ padding: "5px 22px", marginTop: "30px" }}
          onClick={() => handleStepNo(false)}
        />
        <CustomButton
          title="Submit"
          style={{
            padding: "5px 26px",
            marginLeft: "9px",
            marginTop: "30px",
          }}
          onClick={handleSubmitOrder}
        />
      </div>
    </div>
  );
}

export default OrderConfirmation;
