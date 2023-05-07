export default function Header() {
    return (
        <>
            {/* <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">WebSiteName</a>
                    </div>
                    <ul className="nav navbar-nav">
                        <li className="active"><a href="#">Home</a></li>
                        <li><a href="#">Page 1</a></li>
                        <li><a href="#">Page 2</a></li>
                        <li><a href="#">Page 3</a></li>
                    </ul>
                </div>
            </nav> */}
            <nav className="navbar navbar-inverse">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">WebSiteName</a>
                    </div>
                    <ul className="nav navbar-nav">
                        <li className="active"><a href="#">Home</a></li>
                        <li><a href="#">Page 1</a></li>
                        <li><a href="#">Page 2</a></li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li><a href="#"><span className="glyphicon glyphicon-user"></span> Sign Up</a></li>
                        <li><a href="#"><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

// import React from "react";

// const Header = () => {
//     return (
//         <>
//             <header>
//                 <section className="container main-hero-container">
//                     <div className="row">
//                         <div className="col-12 col-lg-6 header-left-side d-flex justify-content-center flex-column align-items-start ">
//                             <h1 className="display-2">
//                                 Online Payment Made <br /> Easy For You.
//                             </h1>
//                             <p className="main-hero-para">
//                                 Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et,
//                                 quia quis? Ipsa officia ad deserunt voluptate quam, nisi odio
//                                 officiis tempora recusandae voluptate quam, nisi odio officiis
//                                 tempora recusandae
//                             </p>
//                             <h3>Get early access for you</h3>
//                             <div className="input-group mt-3">
//                                 <input
//                                     type="text"
//                                     className="rounded-pill w-50  w-lg-75 me-3 p-2 form-control-text"
//                                     placeholder="Enter Your Email"
//                                 />
//                                 <div className="input-group-button">Get it now</div>
//                             </div>
//                         </div>
//                         {/*  --------------- main header right side--------------  */}
//                         <div className="col-12 col-lg-6 header-right-side d-flex justify-content-center align-items-center main-herosection-images">
//                             <img
//                                 src="./images/hero1.jpg"
//                                 alt="heroimg"
//                                 className="img-fluid"
//                             />
//                             <img
//                                 src="./images/hero4.jpg"
//                                 alt="heroimg4"
//                                 className="img-fluid main-hero-img2"
//                             />
//                         </div>
//                     </div>
//                 </section>
//             </header>
//         </>
//     );
// };

// export default Header;