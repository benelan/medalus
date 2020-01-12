import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './UserInputForm.css';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react'
import { Col, Row } from "reactstrap";

const UserInputForm = inject("DataStore")(observer(
    class UserInputForm extends React.Component {

        componentDidMount() {
            /*TODO: dynamically load the dropdown for counties */
        }



        queryLayer = (dataObj) => {
            let url = "https://jbanuelos.esri.com/hackathon/almeda_2011.geojson?f=json";

            var query = Object.keys(dataObj)
                .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(dataObj[k]))
                .join('&');

            url = url + query;

            fetch(url)
                .then(response => response.json())
                .then((result) => {
                    console.log(result)
                })
                .catch(err => console.log('failed to fetch: ', err));
        }

        render() {
            return (
                <Row id="form" style={{ backgroundColor: '#D0CFD4', paddingLeft: '40px' }}>
                    {/* <img src={process.env.PUBLIC_URL + './science_of_where.png'} alt="science-of-where" style={{paddingLeft: '20px'}} /> */}
                    <Col md={{ size: 7, offset: 5 }} className="my-form">
                        <Formik
                            initialValues={{
                                county: this.props.DataStore.county,
                                where: this.props.DataStore.where,
                                extent: this.props.DataStore.inputGeometry     
                            }}
                            validationSchema={Yup.object({
                                county: Yup.string()
                                    .required('Please select a county')
                            })}
                            onSubmit={(values, { setSubmitting }) => {
                                setTimeout(() => {
                                    console.log(values);
                                    this.props.DataStore.setWhere(values.where);
                                    this.props.DataStore.setCounty(values.county);
                                    this.props.DataStore.setInputGeometry(values.extent)
                                    console.log(JSON.stringify(values, null, 2));
                                    setSubmitting(false);
                                }, 400);
                            }}
                        >
                            <Form>
                                <label htmlFor="county">County</label>
                                <Field name="county" as="select">
                                    <option value="">Select a county</option>
                                    <option value="San Bernardino">San Bernardino</option>
                                    <option value="Los Angeles">Los Angeles</option>
                                    <option value="San Francisco">San Francisco</option>
                                    <option value="Santa Clara">Santa Clara</option>
                                </Field>
                                <ErrorMessage name="county" component={redErrorMessage} />
                                <label htmlFor="where">Where</label>
                                <Field name="where" type="text" />
                                <label htmlFor="extent">Input Geometry</label>
                                <Field name="extent" as="textarea" className="form-input"></Field>
                                <br />
                                <button type="submit">Submit</button>
                            </Form>
                        </Formik>
                    </Col>
                </Row>
            );
        }
    }))

const redErrorMessage = styled.p`
    color: #D12B27
`;

export default UserInputForm;