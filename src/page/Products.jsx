import CustomSearchBar from "../components/ui/CustomSearchBar";
import CustomTable from "../components/ui/CustomTable";
import "../styles/product.css";
import CreateProductModal from "../components/ui/CreateProductModal";
import CustomButton from "../components/ui/CustomButton";
import { useDispatch } from "react-redux";
import { setModalOpen } from "../redux/features/productsSlice";
import { useGetProductsQuery } from "../redux/api/apiSlice";

function Products() {
  const { data, isLoading, error } = useGetProductsQuery();
  const dispatch = useDispatch();

  const handleClick = () => {
    // console.log("clicked");
    dispatch(setModalOpen(true));
  };

  const handleChange = (e) => {
    console.log("clicked", e.target.value);
  };

  // console.log("rtk", data, data?.data?.total);

  return (
    <div className="container">
      <div className="flex-between">
        <CustomButton
          title="Create"
          style={{ padding: "3px 22px" }}
          onClick={handleClick}
        />

        <CustomSearchBar onChange={handleChange} />
      </div>
      <CustomTable data={data?.data?.data || []} total={data?.data?.total} />

      <CreateProductModal />
    </div>
  );
}

export default Products;
