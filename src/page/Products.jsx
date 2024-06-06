import Button from "../components/ui/Button";
import CustomSearchBar from "../components/ui/CustomSearchBar";
import CustomTable from "../components/ui/CustomTable";
import allData from "../utils/data.json";

function Products() {
  const handleClick = () => {
    console.log("clicked");
  };

  const handleChange = (e) => {
    console.log("clicked", e.target.value);
  };

  return (
    <div className="container">
      <div className="flex-between">
        <Button title="Create" onClick={handleClick} />

        <CustomSearchBar onChange={handleChange} />
      </div>
      <CustomTable data={allData} />

      <div>
        <input type="text" placeholder="Name" />
        <input type="text" placeholder="Brand" />
      </div>
    </div>
  );
}

export default Products;
