import { useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  useEffect(() => {
    document.title = "Welcome!";
  }, []);

  return (
    <>
      <h3 className="display-4 mb-3 text-emerald-600">Welcome to Plants Store</h3>
      <div
        className="container-sm"
        style={{ display: "flex", justifyContent: "space-evenly" }}
      >
        <Link to="/login" style={{ textDecoration: "none" }}>
          <button className="btn btn-outline-success">Login</button>
        </Link>
        <Link to="/register" style={{ textDecoration: "none" }}>
          <button className="btn btn-outline-primary">Register</button>
        </Link>
      </div>
    </>
  );
}

export default Home;
