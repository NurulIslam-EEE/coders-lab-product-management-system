import CustomSearchBar from "../components/ui/CustomSearchBar";
import CustomTable from "../components/ui/CustomTable";
import "../styles/product.css";
import CreateProductModal from "../components/ui/CreateProductModal";
import CustomButton from "../components/ui/CustomButton";
import { useDispatch } from "react-redux";
import { setModalOpen } from "../redux/features/productsSlice";
import { useGetProductsQuery } from "../redux/api/apiSlice";
import { useState } from "react";

function Products() {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const { data, isLoading, error } = useGetProductsQuery(
    { search: query, pageNumber: pageNumber },
    {
      refetchOnMountOrArgChange: true,
      pollingInterval: 60000,
    }
  );

  const dispatch = useDispatch();

  const handleClick = () => {
    // console.log("clicked");
    dispatch(setModalOpen(true));
  };

  const handleChange = (e) => {
    if (query) {
      setPageNumber("");
    }
    setQuery(e.target.value);
  };

  // console.log("rtk", data, data?.data?.total);

  return (
    <div className="container" style={{ paddingBottom: "20px" }}>
      <div className="flex-between">
        <CustomButton
          title="Create"
          style={{ padding: "3px 22px" }}
          onClick={handleClick}
        />

        <CustomSearchBar onChange={handleChange} />
      </div>

      <CustomTable
        data={data?.data?.data || []}
        total={data?.data?.total}
        setPageNumber={setPageNumber}
      />

      <CreateProductModal />
    </div>
  );
}

export default Products;
