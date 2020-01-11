import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './UserInputForm.css';
import styled from 'styled-components';

const UserInputForm = () => {
    return (
        <div className="my-form" style={{paddingLeft: '20px'}}>
            <Formik
                initialValues = {{
                    where: '',
                    extent: '',
                    returnGeometry: '',
                    outFields: ''
                }}
                validationSchema={Yup.object({
                    where: Yup.string()
                        .required('Required')
                })}
                onSubmit={(values, {setSubmitting }) => {
                    setTimeout(()=> {
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
                        <option value="">Select county</option>
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
    );
};

const redErrorMessage = styled.p`
    color: #D12B27
`;

export default UserInputForm;