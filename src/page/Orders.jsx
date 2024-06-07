import { useDispatch } from "react-redux";
import CustomButton from "../components/ui/CustomButton";
import CustomSearchBar from "../components/ui/CustomSearchBar";
import { openOrderModal } from "../redux/features/orderSlice";
import OrderModal from "../components/ui/orders/OrderModal";

function Orders() {
  const dispatch = useDispatch();

  const handleCreate = () => {
    // console.log("clicked");
    dispatch(openOrderModal(true));
  };

  const handleChange = (e) => {
    console.log("clicked", e.target.value);
  };
  return (
    <div className="container">
      <div className="flex-between">
        <CustomButton title="Create" onClick={handleCreate} />

        <CustomSearchBar onChange={handleChange} />
      </div>
      <OrderModal />
    </div>
  );
}

export default Orders;
