import Header from '../header/header'
import Container from 'react-bootstrap/Container';
import Style from "./landing-page.module.scss"
import { Button } from 'react-bootstrap';

const LandingPage = () => {
    return (
        <div className={Style.container}>
            <Header />
            <div className={Style.wrapper}>
                <div className={Style.cols + " " + Style.cols0}>
                    <span className={Style
                        .topline}>Hello</span>
                    <h1>Find my Buddy</h1>
                    <p>random sentence bvuvsbuqfhancmag haoudacmdgfuksvmnzhf haifyakbvvs fufha hfuii fwehfuiw griuwhfkafi gsy fhehuif kfhi huieufabcsoifj sh yfsh fke sdkj gsbvjhsyfe egfhewhf se huses fsguf hewe gfeuhfks fusghfuihyu</p>
                    <Button className={Style.btn}>Get your music buddy</Button>
                </div>
                <img src='/images/landing-page/musicBuddy3.png' className={Style.splash}></img>
                {/* <div className={Style.cols + " " + Style.cols1}>
                    <div className={Style.imgbox}>
                        <img src='/images/landing-page/music-buddy.png' className={Style.splash}></img>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default LandingPage;