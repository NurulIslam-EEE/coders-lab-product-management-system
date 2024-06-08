import Navigation from "../components/ui/Navigation";

function NotFound() {
  return (
    <>
      <Navigation />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "30px",
          height: "100vh",
        }}
      >
        NotFound
      </div>
    </>
  );
}

export default NotFound;
