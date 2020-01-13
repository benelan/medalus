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
            <Row style={homeStyle} id="medalus">
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
                        <p><b>Soil Quality Index</b> - depends on the <b>(S)Slope, (Dp)Depth, (B)Brightness (Albedo), (T)Texture, and (Dr)Drainage.</b> Soil is an important parameter consisting of numerous
                        key factors. The topographical slope, soil depth, lithological formation (Albedo), soil texture, and drainage data were all provided by Esri's Living Atlas data. The data
                        was in the form of raster data via Image Services. </p>
                    </Col>
                </Row>
                <img src={process.env.PUBLIC_URL + './div.PNG'} style={center} alt="__________"></img>
                <Row>
                    <Col md={6}>
                        <h4 className="text-center">VQI</h4>
                        <h5 className="text-center"><i>VQI = (Ep x Dr x Pc)<sup>1/3</sup></i></h5>
                        <p><b>Vegetation Quality Index</b> - depends on the <b>(Ep)Erosion protection, (Dr)Drought resistance, (Pc)Plant cover.</b> Vegetation plants enrich organic soil, and help reduce the 
                        intensity of soil erosion. It helps prevent soil erosion because plants slow down water as it flows through the land, allowing the rain to soak into the ground. Plant roots also hold the
                        soil in position to prevent soil from being swept away by wind or washed away with water.
                        <i> - National Department of Agricluture Directorate Agricultural Land and Resources Management</i></p>
                    </Col>
                    <Col md={6}>
                        <img src={process.env.PUBLIC_URL + './VQI.PNG'} alt="VQI" className="float-right"></img>
                    </Col>
                </Row>
                <img src={process.env.PUBLIC_URL + './div.PNG'} style={center} alt="__________"></img>
                <Row>
                    <Col md={6}>
                        <img src={process.env.PUBLIC_URL + './CQI.PNG'} alt="CQI"></img>
                    </Col>
                    <Col md={6}>
                        <h4 className="text-center">CQI</h4>
                        <h5 className="text-center"><i>CQI = (R x AI)<sup>1/2</sup></i></h5>
                        <p><b>Climate Quality Index</b> - depends on the <b>(R)Rainfall and (AI)Aridity index.</b> Water availability depends on the average annual precipitation. Water availability
                        affects vegetation growth and soil moisture. Precipitation is realted to vegetation cover, which the section above for VQI explains how vegetation cover can determine the effect
                        of soil erosion. Dramatic changes in the rainfall amounts and intensities correlates with the soil erosion rates. "Where rainfall amounts increase, erosion and runoff will increase
                        at an even greater rate."
                        <i>- Journal of Soil and Water Conservation</i></p>
                        
                    </Col>
                </Row>
                <img src={process.env.PUBLIC_URL + './div.PNG'} style={center} alt="__________"></img>
                <Row>
                    <Col md={6}>
                        <h4 className="text-center">MQI</h4>
                        <h5 className="text-center"><i>MQI = (Human pressure x Grazing pressure)<sup>1/2</sup></i></h5>
                        <p><b>MQI </b>- was measured by <b>Human pressure and Grazing pressure. </b>Anthropogenic (human activity) pressure is also a contributing factor to soil erosion. Deforestation and land degradation are linked to overgrazing, logging,
                            and inadequate agricultural practices. As the populations increase in regions, more land is being cleared for agriculture, which degrade soil and increase soil erosion likelyhood.</p>
                        <p><b>Deforestation</b><br />Decreases vegetation cover, which by this section, we should already know that loss of vegetation cover leads to soil erosion. The crops that replace the trees cut down for agriculture
                            such as coffee, cotton, soybean and wheat can worsen soil erosion. As the soil erodes, farmers move on to other regions, clear forests for more agriculture, and the cycle continues.</p>
                        <p><b>Overgrazing</b><br />Reduces ground cover which can prevent soil from absorbing rainfall effectively. This in turn also aharms soil microbes, which help fertilize the soil. Topsoil is exposed and can dry out.
                        <i>- World Wildlife Federation</i></p>
                    </Col>
                    <Col md={6}>
                        <img src={process.env.PUBLIC_URL + './MQI.PNG'} alt="MQI" className="float-right"></img>
                    </Col>
                </Row>
                <img src={process.env.PUBLIC_URL + './div.PNG'} style={center} alt="__________"></img>
                <Row>
                    <Col md={6}>
                        <img src={process.env.PUBLIC_URL + './Desertificate2018.PNG'} alt="Desertificate2018"></img>
                    </Col>
                    <Col md={6}>
                        <h4 className="text-center">ESAI</h4>
                        <h5 className="text-center"><i>ESAI = (SQI x CQI x VQI x MQI)<sup>1/4</sup></i></h5>
                        <p><b>Environmental Sensitive Area Index</b> - Evaluates the vulnerability to soil erosion. Using the indices described above: SQI, VQI, CQI, and MQI. These indices were classified using ArcGIS Pro, and weighted into three classes.</p>
                        <p><b>California's result for 2018</b><br />The map on the left demonstrates the high risks of desertification in California in 2018. For those familiar with California, one can see the the map is somewhat accurate to demonstrate regions
                        that are currently know to be potential risks for desertification. What is suprisising is the region of the National Forests. The map shows that event these regions are at a risk. This could be caused by the years of drought in California 
                        prior to the last couple years. This shows the regions that had large fires in 2017 and 2018, which resulted in the most destructive years of wildfires in 2017 and 2018 as we explained above.</p>
                    </Col>
                </Row>
                <img src={process.env.PUBLIC_URL + './div.PNG'} style={center} alt="__________"></img>
            </Row>
        );
    }
}

export default About;