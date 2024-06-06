import Button from "./components/ui/Button";
import Navigation from "./components/ui/Navigation";

function App() {
  const handleClick = () => {
    console.log("clicked");
  };
  return (
    <div className="container">
      <Navigation />
      <Button title="Create" onClick={handleClick} />
      <table>
        <thead>
          <tr className="table-head">
            <th>ID</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Type</th>
            <th>Create At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="table-body">
          <tr>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>Germany</td>
            <td>Germany</td>
            <td>Germany</td>
            <td>Germany</td>
          </tr>
          <tr>
            <td>Centro comercial Moctezuma</td>
            <td>Francisco Chang</td>
            <td>Mexico</td>
            <td>Mexico</td>
            <td>Mexico</td>
            <td>Mexico</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
