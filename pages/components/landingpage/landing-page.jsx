import Header from "../header/header";
import Container from "react-bootstrap/Container";
import Style from "./landing-page.module.scss";
import { Button } from "react-bootstrap";

const LandingPage = () => {
  const handleButtonClick = () => {
    window.location.replace("/dashboard");
  };

  return (
    <div className={Style.container}>
      <Header />
      <div className={Style.wrapper}>
        <div className={Style.cols + " " + Style.cols0}>
          <span className={Style.topline}>Hello</span>
          <h1>Find my Buddy</h1>
          <p>
            {" "}
            Connect with like-minded individuals, discover new music, and build
            lasting relationships through a common love of music. Personalize
            your profile, create playlists, and share your favorite tracks with
            your new friends. Join our community today and start exploring the
            world of music together!
          </p>
          <Button className={Style.btn} onClick={handleButtonClick}>
            Get your music buddy
          </Button>
        </div>
        <img
          src="/images/landing-page/musicBuddy3.png"
          className={Style.splash}></img>
      </div>
    </div>
  );
};

export default LandingPage;
