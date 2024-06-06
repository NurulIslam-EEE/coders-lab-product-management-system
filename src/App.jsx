import Button from "./components/ui/Button";
import CustomSearchBar from "./components/ui/CustomSearchBar";
import Navigation from "./components/ui/Navigation";

function App() {
  const handleClick = () => {
    console.log("clicked");
  };

  const handleChange = (e) => {
    console.log("clicked", e.target.value);
  };
  return (
    <div className="container">
      <Navigation />
      <Button title="Create" onClick={handleClick} />

      <CustomSearchBar onChange={handleChange} />
    </div>
  );
}

export default App;
