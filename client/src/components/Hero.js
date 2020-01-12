import React from 'react';
//import './Hero.css'
import LazyHero from 'react-lazy-hero';

const Hero = () => {
    return (
        <div>
            <LazyHero imageSrc={process.env.PUBLIC_URL + './desert-unsplash.jpg'}>
                <h3>DSI = (VQI x SQI x CQI x MQI)<sup>1/4</sup></h3>
            </LazyHero>
            <p>photo by Anthony Tuil from unsplash.com</p>
        </div>
    );
}

export default Hero;