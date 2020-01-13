import React, { Component } from "react";
import { Col, Row } from "reactstrap";

class Videos extends Component {

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
            <React.Fragment>
                <Row style={homeStyle} id="data">
                    <Col md={6}>
                        <h3>Reclassification of Individual Data</h3>
                        <p>This video shows how to reclassify data. We use precipitation data as a demonstration.</p>
                    </Col>
                    <Col md={6}>
                        <div className="embed-responsive embed-responsive-16by9">
                            <iframe className="embeddedObject shadow resizable embed-responsive-item" style={{ overflow: "hidden" }} title="video1" src="https://www.screencast.com/users/Biraja/folders/Snagit/media/72c9bb14-2977-4699-a3b8-22836f5c94cf/embed" width="600px" height="400px" allowFullScreen></iframe>
                        </div>
                    </Col>
                </Row>
                <img src={process.env.PUBLIC_URL + './div.PNG'} style={center} alt="__________"></img>
                <Row style={homeStyle}>
                    <Col md={6}>
                        <div className="embed-responsive embed-responsive-16by9">
                            <iframe className="embeddedObject shadow resizable embed-responsive-item" title="video2" style={{ overflow: "hidden" }} src="https://www.screencast.com/users/Biraja/folders/Snagit/media/62505fad-7af8-436d-a6e4-17e4d2d39157/embed" width="600px" height="400px" allowFullScreen></iframe>
                        </div>
                    </Col>
                    <Col md={6}>
                        <h3>Steps to Create Sub Indexes</h3>
                        <p>This video shows the steps to create the sub indexes: SOI, VQI, MQI and CQI. We use SQI data as a demonstration.</p>
                    </Col>
                </Row>
                <img src={process.env.PUBLIC_URL + './div.PNG'} style={center} alt="__________"></img>
                <Row style={homeStyle}>
                    <Col md={6}>
                        <h3>Steps to Create Environmentally Sensitive Area Index</h3>
                        <p>This video shows the steps to create Environmentally Sensitive Area Index using sub indexes to determine areas prone to desetification</p>
                    </Col>
                    <Col md={6}>
                        <div className="embed-responsive embed-responsive-16by9">
                            <iframe className="embeddedObject shadow resizable embed-responsive-item" style={{ overflow: "hidden" }} title="video3" src="https://www.screencast.com/users/Biraja/folders/Snagit/media/71c88146-686f-4170-9fb9-ac7e6b134284/embed" width="600px" height="400px" allowFullScreen></iframe>
                        </div>
                    </Col>
                </Row></React.Fragment>

        );
    }
}

export default Videos;