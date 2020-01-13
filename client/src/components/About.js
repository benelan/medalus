import React, { Component } from "react";
import { Col, Row } from "reactstrap";

class About extends Component {

    render() {
        const homeStyle = {
            margin: "20px"
        };

        const center = {
            display: "block",
            marginLeft: "auto",
            marginRight: "auto"
        }

        return (
            <Row style={homeStyle} id="about">
                <Col md={12}>
                    <h4 className="text-center">Medalus</h4>
                    <h5 className="text-center"><i>Mediterranean Desertification and Land Use</i></h5>
                    <p>Desertification indicatiors can demonstrate that desertification has already reached to an irreversible point. However, the indicators also demonstrate a potential risk
                        of desertification in certain areas where there is still time to reverse the trend. The Medalus method can help guide organization to focus on the regions
                            </p>

                    <p>We searched for a method or model in the scientific community for a way to measure the desertification process, and that is when we found a few scholarly journals referencing
                        the Medalus method. The journals used the method to measure desertification in Morocco, Serbia, Mongolia, and Algeria. We decided to use this method and the journals to measure
                        desertification in the United States, in particular, California.
                            </p>
                    <br></br>
                </Col>
                <Row>
                    <Col md={6}>
                        <img src={process.env.PUBLIC_URL + './SQI.PNG'} alt="SQI"></img>
                    </Col>
                    <Col md={6}>
                        <h4 className="text-center">SQI</h4>
                        <h5 className="text-center"><i>SQI = (S x Dp x B x T x Dr)<sup>1/5</sup></i></h5>
                        <p>Commodo viverra maecenas accumsan lacus vel facilisis volutpat. Id cursus metus aliquam eleifend mi in nulla posuere sollicitudin. Venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non. Lorem ipsum dolor sit amet consectetur adipiscing. Aliquet sagittis id consectetur purus ut. Quam vulputate dignissim suspendisse in est ante. Elementum nisi quis eleifend quam. Tempor id eu nisl nunc. Integer enim neque volutpat ac tincidunt vitae. Arcu felis bibendum ut tristique et. Dictum sit amet justo donec enim diam vulputate.</p>
                    </Col>
                </Row>
                <img src={process.env.PUBLIC_URL + './div.PNG'} alt="divider" style={center} ></img>
                <Row>
                    <Col md={6}>
                        <h4 className="text-center">VQI</h4>
                        <h5 className="text-center"><i>VQI = (Ep x Dr x Pc)<sup>1/3</sup></i></h5>
                        <p>Commodo viverra maecenas accumsan lacus vel facilisis volutpat. Id cursus metus aliquam eleifend mi in nulla posuere sollicitudin. Venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non. Lorem ipsum dolor sit amet consectetur adipiscing. Aliquet sagittis id consectetur purus ut. Quam vulputate dignissim suspendisse in est ante. Elementum nisi quis eleifend quam. Tempor id eu nisl nunc. Integer enim neque volutpat ac tincidunt vitae. Arcu felis bibendum ut tristique et. Dictum sit amet justo donec enim diam vulputate.</p>

                    </Col>
                    <Col md={6}>
                        <img src={process.env.PUBLIC_URL + './VQI.PNG'} alt="VQI" className="float-right"></img>
                    </Col>
                </Row>
                <img src={process.env.PUBLIC_URL + './div.PNG'} alt="divider" style={center} ></img>
                <Row>
                    <Col md={6}>
                        <img src={process.env.PUBLIC_URL + './CQI.PNG'} alt="CQI"></img>
                    </Col>
                    <Col md={6}>
                        <h4 className="text-center">CQI</h4>
                        <h5 className="text-center"><i>CQI = (R x AI)<sup>1/2</sup></i></h5>
                        <p>Commodo viverra maecenas accumsan lacus vel facilisis volutpat. Id cursus metus aliquam eleifend mi in nulla posuere sollicitudin. Venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non. Lorem ipsum dolor sit amet consectetur adipiscing. Aliquet sagittis id consectetur purus ut. Quam vulputate dignissim suspendisse in est ante. Elementum nisi quis eleifend quam. Tempor id eu nisl nunc. Integer enim neque volutpat ac tincidunt vitae. Arcu felis bibendum ut tristique et. Dictum sit amet justo donec enim diam vulputate.</p>
                    </Col>
                </Row>
                <img src={process.env.PUBLIC_URL + './div.PNG'} alt="divider" style={center} ></img>
                <Row>
                    <Col md={6}>
                        <h4 className="text-center">MQI</h4>
                        <h5 className="text-center"><i>MQI = (Human pressure x Grazing pressure)<sup>1/2</sup></i></h5>
                        <p>Commodo viverra maecenas accumsan lacus vel facilisis volutpat. Id cursus metus aliquam eleifend mi in nulla posuere sollicitudin. Venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non. Lorem ipsum dolor sit amet consectetur adipiscing. Aliquet sagittis id consectetur purus ut. Quam vulputate dignissim suspendisse in est ante. Elementum nisi quis eleifend quam. Tempor id eu nisl nunc. Integer enim neque volutpat ac tincidunt vitae. Arcu felis bibendum ut tristique et. Dictum sit amet justo donec enim diam vulputate.</p>
                    </Col>
                    <Col md={6}>
                        <img src={process.env.PUBLIC_URL + './MQI.PNG'} alt="MQI" className="float-right"></img>
                    </Col>
                </Row>
                <img src={process.env.PUBLIC_URL + './div.PNG'} alt="divider" style={center} ></img>
                <Row>
                    <Col md={6}>
                        <img src={process.env.PUBLIC_URL + './Desertificate2018.PNG'} alt="Desertificate2018"></img>
                    </Col>
                    <Col md={6}>
                        <h4 className="text-center">ESAI</h4>
                        <h5 className="text-center"><i>ESAI = (SQI x CQI x VQI x MQI)<sup>1/4</sup></i></h5>
                        <p>Commodo viverra maecenas accumsan lacus vel facilisis volutpat. Id cursus metus aliquam eleifend mi in nulla posuere sollicitudin. Venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non. Lorem ipsum dolor sit amet consectetur adipiscing. Aliquet sagittis id consectetur purus ut. Quam vulputate dignissim suspendisse in est ante. Elementum nisi quis eleifend quam. Tempor id eu nisl nunc. Integer enim neque volutpat ac tincidunt vitae. Arcu felis bibendum ut tristique et. Dictum sit amet justo donec enim diam vulputate.</p>
                    </Col>
                </Row>
                <img src={process.env.PUBLIC_URL + './div.PNG'} style={center}></img>
            </Row>
        );
    }
}

export default About;