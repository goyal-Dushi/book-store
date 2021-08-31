import { useEffect } from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Home() {
  useEffect(() => {
    document.title = "Welcome!";
  }, []);

  return (
    <>
      <h3 className={"display-4 mb-3"}>{"Welcome user to online BookStore"}</h3>
      <Container
        style={{ display: "flex", justifyContent: "space-evenly" }}
        fluid={"sm"}>
        <Link to={"/login"} style={{ textDecoration: "none" }}>
          <Button variant={"outline-success"}> {"Login"} </Button>
        </Link>
        <Link to={"/register"} style={{ textDecoration: "none" }}>
          <Button variant={"outline-primary"}> {"Register"} </Button>
        </Link>
      </Container>
    </>
  );
}

export default Home;
