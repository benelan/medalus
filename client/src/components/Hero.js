import React from 'react';
//import './Hero.css'
import LazyHero from 'react-lazy-hero';

const Hero = () => {
    return (
        <div>
            <LazyHero imageSrc={process.env.PUBLIC_URL + './desert-unsplash.jpg'}>
                <h3>ESAI = (SQI x CQI x VQI x MQI)<sup>1/4</sup></h3>
            </LazyHero>
            <p className="float-right"><i>photo by Anthony Tuil from unsplash.com</i></p>
        </div>
    );
}

export default Hero;