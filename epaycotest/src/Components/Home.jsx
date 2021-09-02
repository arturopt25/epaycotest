import React from 'react'
import './Home.css'
import SignInOutContainer from '../Containers';
import logoepayco from '../assets/logoepayco.png'
const Home = () => {
    return (
        <div>
            
            <section className="white">
                <div className="centro">
                <div className="formulario">
                    <SignInOutContainer />
                </div>
                <div className="content">
                    <h3>Los pagos son procesados de
                    forma segura por ePayco</h3>
                    <p>Powered by <img src={logoepayco} alt="Logo" /> </p>
                </div>
                </div>
                <div class="custom-shape-divider-bottom-1630373554">
    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
    </svg>
</div>
            </section>
        </div>
    )
}

export default Home
