import Navbar from "../Component/Navbar";
import { Fragment } from "react";
import { Formik } from 'formik';
import axios from "axios";
import { useState, useEffect } from "react";
import { BsPencilFill } from 'react-icons/bs';
import { Link } from "react-router-dom";
import { motion } from 'framer-motion';

const Classes = () => {
    const [classState, setClassState] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/classes')
            .then(function (response) {
                console.log(response.data);
                setClassState(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })

    }, [])

    return (
        <Fragment>
            <Navbar />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} exit={{ opacity: 0 }} className="container">


                <h1>Classes page</h1>
                <Formik
                    initialValues={{ classes: '' }}
                    validate={values => {
                        const errors = {};
                        if (!values.classes) {
                            errors.classes = 'Class name is required';
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            axios.post('http://localhost:5000/classes', {
                                classname: values.classes,


                            })
                                .then((response) => {
                                    console.log(response.data);
                                    setClassState([...classState, { _id: response.data._id, classname: values.classes, ispresent: 'Yes' }]);
                                    values.classes = '';
                                })
                                .catch((error) => {
                                    console.log(error);
                                });
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
                            <label className="form-label">Class Name</label>
                            <input
                                type="text"
                                name="classes"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.classes}
                                className='form-control'
                            />
                            <span style={{ color: "red" }}>{errors.classes && touched.classes && errors.classes}</span>
                            <br />

                            <button type="submit" className="btn btn-primary btn-sm" disabled={isSubmitting}>
                                Submit
                            </button>
                        </form>
                    )}
                </Formik>
                <br /><br />
                <h4>All available classes</h4>

                <table className="table">
                    <thead>
                        <tr className="table-dark">
                            <th scope="col">S#</th>
                            <th scope="col">Class ID</th>
                            <th scope="col">Class Name</th>
                            <th scope="col">Ispresent</th>
                            <th scope="col">Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {classState.map((classes, ind) => {
                            return (
                                <tr key={ind}>
                                    <th scope="row">{ind + 1}</th>
                                    <td>{classes._id}</td>
                                    <td>{classes.classname}</td>
                                    <td>{classes.ispresent}</td>
                                    <td><Link to={`/classes/${classes._id}`}><BsPencilFill color="green" /></Link></td>
                                </tr>

                            )
                        })}


                    </tbody>
                </table>
            </motion.div>

        </Fragment>
    )
}

export default Classes;