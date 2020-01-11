import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './UserInputForm.css';
import styled from 'styled-components';
import { observer, inject } from 'mobx-react'


const UserInputForm = inject("DataStore")(observer(
class UserInputForm extends React.Component {

    componentDidMount() {
        /*TODO: dynamically load the dropdown for counties */
        console.log(this.props.DataStore.county)
    }

    render() {
        return (
            <div className="ui three column grid" style={{backgroundColor: '#D0CFD4'}}>
                <div className="column">
                    <img src={process.env.PUBLIC_URL + './science_of_where.png'} alt="science-of-where" style={{paddingLeft: '20px'}} />
                </div>
                <div className="column">
                    <div className="my-form" style={{backgroundColor: '#D0CFD4', paddingLeft: '40px'}} id="form">
                    <Formik
                        initialValues = {{
                            where: this.props.DataStore.where,
                            extent: this.props.DataStore.inputGeometry,
                            returnGeometry: this.props.DataStore.returnGeometry,
                            outFields: this.props.DataStore.outFields
                        }}
                        validationSchema={Yup.object({
                            where: Yup.string()
                                .required('Required')
                        })}
                        onSubmit={(values, {setSubmitting }) => {
                            setTimeout(()=> {
                                //queryLayer(values); //geojson url hardcoded here
                                console.log(values);
                                this.props.DataStore.setWhere(values.where);
                                //setWhere("")
                                console.log(JSON.stringify(values, null, 2));
                                setSubmitting(false);
                            }, 400);
                        }}
                    >
                        <Form>
                            <label htmlFor="where">Where</label>
                            <Field name="where" type="text" />
                            <ErrorMessage name="where" component={redErrorMessage} />
                            <label htmlFor="extent">Input Geometry</label>
                            <Field name="extent" as="textarea" className="form-input" />
                            <label htmlFor="county">County</label>
                            <Field name="county" as="select">
                                <option value="">Select a county</option>
                                <option value="San Bernardino">San Bernardino</option>
                                <option value="Los Angeles">Los Angeles</option>
                                <option value="San Francisco">San Francisco</option>
                                <option value="Santa Clara">Santa Clara</option>
                            </Field>
                            <label htmlFor="outFields">Out Fields</label>
                            <Field name="outFields" type="text" />
                            <label htmlFor="returnGeometry">returnGeometry</label>
                            <Field name="returnGeometry" type="text" />
                            <br />
                            <button type="submit">Submit</button>
                        </Form>
                    </Formik>
                </div>
                </div>
            </div>
            
        );
    }
}))

const redErrorMessage = styled.p`
    color: #D12B27
`;

const queryLayer = (dataObj) => {
    let url = "https://jbanuelos.esri.com/hackathon/almeda_2011.geojson?f=json";

    var query = Object.keys(dataObj)
        .map(k=>encodeURIComponent(k) + '=' + encodeURIComponent(dataObj[k]))
        .join('&');

    url = url + query;

    fetch(url)
    .then(response => response.json())
    .then((result) => {
        console.log(result)
    })
    .catch(err => console.log('failed to fetch: ', err));
}

export default UserInputForm;