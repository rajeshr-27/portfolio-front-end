import React  from "react";
import '../common/css/style.css'
import { Link } from "react-router-dom";
import profile from "../common/img/profile-2.png"
//import profile from '../common/img/register.webp'

function Home() {
    return(
        <>
             <header class="py-5">
                <div class="container px-5 pb-5">
                    <div class="row gx-5 align-items-center">
                        <div class="col-xxl-5">
                            {/* <!-- Header text content--> */}
                            <div class="text-center text-xxl-start">
                                <div class="badge bg-gradient-primary-to-secondary text-white mb-4"><div class="text-uppercase">A &middot; Networking &middot; Platform</div></div>
                                <div class="fs-3 fw-light text-muted">BIGCONNECTS</div>
                                <h1 class="display-3 fw-bolder mb-5"><span class="text-gradient d-inline">Share your Bigconnects from your Instagram, Facebook, LinkedIn, and other bios.</span></h1>
                                <div class="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xxl-start mb-3">
                                    <Link class="btn btn-primary btn-lg px-5 py-3 me-sm-3 fs-6 fw-bolder" to="/register">Register</Link>
                                    <Link class="btn btn-outline-dark btn-lg px-5 py-3 fs-6 fw-bolder" to="/login">Login</Link>
                                </div>
                            </div>
                        </div>
                        <div class="col-xxl-7">
                            {/* <!-- Header profile picture--> */}
                            <div class="d-flex justify-content-center mt-5 mt-xxl-0">
                                <div class="profile bg-gradient-primary-to-secondary">
                                    {/* <!-- TIP: For best results, use a photo with a transparent background like the demo example below-->
                                    <!-- Watch a tutorial on how to do this on YouTube (link)--> */}
                                    <img class="profile-img" src={profile} alt="..." />
                                    <div class="dots-1">
                                        {/* <!-- SVG Dots--> */}
                                         
                                        {/* <!-- END of SVG dots--> */}
                                    </div>
                                    <div class="dots-2">
                                        {/* <!-- SVG Dots--> */}
                                         
                                        {/* <!-- END of SVG dots--> */}
                                    </div>
                                    <div class="dots-3">
                                        {/* <!-- SVG Dots--> */}
                                         
                                        {/* <!-- END of SVG dots--> */}
                                    </div>
                                    <div class="dots-4">
                                        {/* <!-- SVG Dots--> */}
                                        
                                        {/* <!-- END of SVG dots--> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {/* <!-- About Section--> */}
            <section class="bg-light py-5">
                <div class="container px-5">
                    <div class="row gx-5 justify-content-center">
                        <div class="col-xxl-8">
                            <div class="text-center my-5">
                                <h2 class="display-5 fw-bolder"><span class="text-gradient d-inline">About Us</span></h2> 
                                <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit dolorum itaque qui unde quisquam consequatur autem. Eveniet quasi nobis aliquid cumque officiis sed rem iure ipsa! Praesentium ratione atque doloremEveniet quasi nobis aliquid cumque officiis sed rem iure ipsa! Praesentium ratione atque dolorem</p>
                                <div class="d-flex justify-content-center fs-2 gap-4">
                                    <a class="text-gradient" href="#!"><i class="bi bi-twitter"></i></a>
                                    <a class="text-gradient" href="#!"><i class="bi bi-linkedin"></i></a>
                                    <a class="text-gradient" href="#!"><i class="bi bi-github"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home;