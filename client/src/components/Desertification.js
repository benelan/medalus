import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import LazyHero from 'react-lazy-hero';

class About extends Component {

    render() {
        const homeStyle = {
            margin: "20px"
        };
        return (
            <Row style={homeStyle} id="about">
                <Col md={12}>
                    <Row style={homeStyle}>
                        <Col md={5}>
                            <h4 className="text-center">Desertification</h4>

                            <p><i>"Desertification is about the loss of the land’s proper hydrologic function, biological productivity, and other ecosystem services
                                as a result of human activities and climate change."</i> - Daniel G. Neary (United States Department of Agriculture)
                            </p>

                            <p>Affects 75% of the earth's land surface!</p>
                        
                            <h5>Why is this important?</h5>
                            <p>An article published by the USDA (United States Department of Agriculture) in 2018 states that wildfires are a catalyst to desertification.</p>

                            <h5>Environmental Consequences of wildfires</h5>
                            <ul>
                                <li>Vegetation destruction</li>
                                <li>Plant species and type shifts</li>
                                <li>Wildlift habitat destruction</li>
                                <li>Soil erosion</li>
                                <li>Floods</li>
                                <li>Water supply disruption</li>
                                <li>Air pollution</li>
                            </ul>
                            
                        </Col>

                        <Col md={{ size: 5, offset: 2 }}>
                            <h4 className="text-center">Latest Wildfire Impact</h4>
                            <p>According to the California Department of Forestry and Fire Protection, California experienced the most destructive wildfires in its history in 2017 and 2018</p>
                            <ul>
                                <li>1,671,203 acres YTD in 2018</li>
                                <li>1,248,606 acres YTD in 2019</li>
                            </ul>
                            <p>Increasing moisture stress on vegetation, making forests more prone to sever wildfires. There has been an estimated 75 day increase in the length of the fires season</p>
                            <h4 className="text-center">Now Australia...</h4>
                            <h5>Stats</h5>
                            <ul>
                                <li>14.7 million acres burned</li>
                                <li>Over 480 million animals have died</li>
                                <li>Air quality rose 11 times the hazardouz level</li>
                            </ul>
                            <p><i>data provided by cnn.com</i></p>
                        </Col>

                       
                    </Row>
                    <LazyHero opacity="0" imageSrc={process.env.PUBLIC_URL + './wildfires.png'}></LazyHero>
                    <p><i>-data provided by the California Department of Forestry and Fire Protection</i></p>
                </Col>
                
            </Row>
            
        );
    }
}

export default About;