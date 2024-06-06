function CustomTable({ data }) {
  console.log("all", data);
  return (
    <div>
      <table style={{ width: "100%", marginTop: "5px" }}>
        <thead className="table-head">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Type</th>
            <th>Create At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {data?.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.brand}</td>
                <td>{item.type}</td>
                <td>{item.created_at.slice(0, 10)}</td>
                <td style={{ color: "#c31600", cursor: "pointer" }}>
                  <a href="">view</a> | Edit | Delete
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default CustomTable;
