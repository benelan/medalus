import React from 'react';
import './Hero.css'

const Hero = () => {
    return (
        <div className="hero-image">
            <div className="hero-text">
                <h1 style={{fontSize: "50px"}}>Medalus</h1>
                <p>DSI = (VQI x SQI x CQI x MQI)<sup>1/4</sup></p>
            </div>
        </div>
    );
}

export default Hero;