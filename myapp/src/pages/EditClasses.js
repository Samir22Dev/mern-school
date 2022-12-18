import { Fragment, useState, useEffect } from "react"
import Navbar from "../Component/Navbar"
import { useParams, useNavigate } from "react-router-dom"
import axios from 'axios';
import { Formik } from 'formik';


const EditClasses = () => {
    const id = useParams();
    const navigate = useNavigate();
    const [classes, setclasses] = useState({
        _id: '',
        classname: '',
        ispresent: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:5000/classes/edit/${id.id}`)
            .then(function (response) {
                console.log(response.data[0]);
                setclasses(response.data[0])
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])

    return (
        <Fragment>
            <Navbar />
            <div className="container">
                <h4>Edit Class: {id.id} </h4>

                <Formik
                    enableReinitialize
                    initialValues={{ classname: classes.classname }}
                    validate={values => {
                        const errors = {};
                        if (!values.classname) {
                            errors.classname = 'Invalid class';
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {

                            axios.put(`http://localhost:5000/classes/${id.id}`, {
                                classname: values.classname
                            })
                                .then(function (response) {
                                    console.log(response.data);
                                    navigate("/classes");
                                })
                                .catch(function (error) {
                                    console.log(error);
                                })
                            setSubmitting(false);
                        }, 400);
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,

                    }) => (
                        <form onSubmit={handleSubmit}>
                            <legend className="text-center">Add New Classes</legend>
                            <label htmlFor="disabledTextInput" className="form-label">Class Name</label>
                            <input
                                type="text"
                                name="classname"
                                className="form-control"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.classname}
                                placeholder="Class name"
                            />
                            <span style={{ color: 'red' }}>{errors.classname && touched.classname && errors.classname}</span><br />

                            <div className="d-grid gap-1">
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                    Insert class
                                </button>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </Fragment>
    )
}
export default EditClasses;