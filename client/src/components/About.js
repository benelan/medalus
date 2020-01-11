import React, { Component } from "react";
import { Col, Row, Button } from "reactstrap";

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
                <h4 className="text-center">Getting Started</h4>
                <p>Instructions to get started</p>
              </Col>

              <Col md={{ size: 5, offset: 2 }}>
                <h4 className="text-center">Desertification</h4>

                <p>Talk about what Desertification is and how we calculated it</p>
              </Col>
            </Row>

            <Row style={homeStyle}>
              <Col md={5}>
                <h4 className="text-center">Setting up the Data</h4>
                <p>Instructions to set up the data</p>
              </Col>

              <Col md={{ size: 5, offset: 2 }}>

              </Col>
            </Row>
          </Col>
        </Row>
      );
    }
  }

export default About;