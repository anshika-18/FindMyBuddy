import "./404.module.scss";
import { Button } from "react-bootstrap";

export default function notFound() {

  const handleBackHome = () => {
    window.location.replace("/dashboard");
  }
  return (
    <div className="notfound">
      {/* <h1 className="h11">404</h1>
      <div class="cloak__wrapper">
        <div class="cloak__container">
          <div class="cloak"></div>
        </div>
      </div>
      <div class="info">
        <h2 className="h2">We can't find that page</h2>
        <p className="p1">
          We're fairly sure that page used to be here, but seems to have gone
          missing. We do apologise on it's behalf.
        </p>
        <button className="addBtn">Home</button>
      </div> */}
      <div class="section">
        <h1 class="error">404</h1>
        <div class="page">
          Ooops!!! The page you are looking for is not found
        </div>
        <a class="back-home" onClick={handleBackHome}>
          Back to home
        </a>
      </div>
    </div>
  );
}
