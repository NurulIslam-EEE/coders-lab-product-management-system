import { useDispatch } from "react-redux";
import CustomButton from "../components/ui/CustomButton";
import CustomSearchBar from "../components/ui/CustomSearchBar";
import { openOrderModal } from "../redux/features/orderSlice";
import OrderModal from "../components/ui/orders/OrderModal";
import OrdersTable from "../components/ui/orders/OrdersTable";
import { useEffect, useState } from "react";
import { useGetOrdersQuery } from "../redux/api/apiSlice";

function Orders() {
  const [query, setQuery] = useState("");
  const [queryValue, setQuryValue] = useState("");
  const dispatch = useDispatch();

  const { data } = useGetOrdersQuery(query, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 60000,
  });

  // name, { pollingInterval: 3000, skipPollingIfUnfocused: true,}

  const handleCreate = () => {
    // console.log("clicked");
    dispatch(openOrderModal(true));
  };

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  // useEffect(() => {
  //   const timeOutId = setTimeout(() => setQuryValue( query), 800);
  //   return () => clearTimeout(timeOutId);
  // }, [query]);
  return (
    <div className="container" style={{ paddingBottom: "20px" }}>
      <div className="flex-between">
        <CustomButton
          title="Create"
          style={{ padding: "3px 22px" }}
          onClick={handleCreate}
        />

        <CustomSearchBar onChange={handleChange} />
      </div>
      <OrdersTable data={data} />
      <OrderModal />
    </div>
  );
}

export default Orders;
