import React, { useState, useEffect } from "react";
import Navbar from "../Component/Navbar";
import { Formik } from 'formik';
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Student = () => {
    const navigate = useNavigate();

    const [fieldValue, setFieldValue] = useState('');
    const [email, setEmail] = useState('');
    const [allClass, setAllClass] = useState([]);


    useEffect(() => {
        axios.get(`http://localhost:5000/classes`)
            .then(function (response) {
                setAllClass(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])




    const validCheck = (name) => {
        if (name.trim().length === 0) {
            return
        }
        axios.get(`http://localhost:5000/student/email/${name}`)
            .then(function (response) {
                setEmail(response.data[0].email)

                if (response.data[0].email) {
                    alert('This email is already exist. Please enter another email');
                } else {
                    console.log('You can enter this email')
                    setEmail('');
                    setEmail(null);
                    console.log('status:', email);
                }
            })
            .catch(function (error) {
                console.log(error);
            })
        console.log(name);
    }

    return (
        <React.Fragment>
            <Navbar />
            <div className="container">
                <h1>Student Page</h1>

                <Formik
                    initialValues={{ sname: '', fname: '', email: '', address: '', phone: '', dob: '', classes: '', fee: '' }}

                    validate={values => {
                        const errors = {};
                        if (!values.email) {
                            errors.email = 'Email is Required';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid email address';
                        }
                        if (!values.sname) {
                            errors.sname = 'Student Name is required';
                        }
                        if (!values.fname) {
                            errors.fname = 'Father Name is required';
                        }
                        if (!values.address) {
                            errors.address = 'Address is required';
                        }
                        if (!values.phone) {
                            errors.phone = 'phone is required';
                        }
                        if (!values.dob) {
                            errors.dob = 'Date of birth is required';
                        }
                        if (!values.classes) {
                            errors.classes = 'Please select a class';
                        }
                        if (!values.fee) {
                            errors.fee = 'Please insert student fee ';
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            if (email) {
                                alert('This email is already exist');
                                return;
                            }
                            axios.post('http://localhost:5000/student', {
                                sname: values.sname,
                                fname: values.fname,
                                email: values.email,
                                address: values.address,
                                phone: values.phone,
                                dob: values.dob,
                                classId: values.classes,
                                fee: values.fee
                            })
                                .then((response) => {
                                    console.log(response.data);
                                    navigate("/")
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

                        <form onSubmit={handleSubmit} className="row">
                            <div className="col-md-6">
                                <label htmlFor="formFile" className="form-label">Student Name</label>
                                <input
                                    type="text"
                                    name="sname"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.sname} className='form-control'
                                />
                                <span style={{ color: 'red' }}>{errors.sname && touched.sname && errors.sname}</span>
                                <br /> <br />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="formFile" className="form-label">Father Name</label>
                                <input
                                    type="text"
                                    name="fname"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.fname} className='form-control'
                                />
                                <span style={{ color: 'red' }}>{errors.fname && touched.fname && errors.fname}</span>
                                <br /> <br />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="formFile" className="form-label">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    onBlur={() => { validCheck(values.email) }}
                                    value={values.email} className='form-control'
                                />
                                <span style={{ color: 'red' }}>{errors.email && touched.email && errors.email}</span>
                                <br />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="formFile" className="form-label">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.address} className='form-control'
                                />
                                <span style={{ color: 'red' }}>{errors.address && touched.address && errors.address}</span>
                                <br /> <br />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="formFile" className="form-label">phone</label>
                                <input
                                    type="text"
                                    name="phone"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.phone} className='form-control'
                                />
                                <span style={{ color: 'red' }}>{errors.phone && touched.phone && errors.phone}</span>
                                <br /> <br />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="formFile" className="form-label">Date of Birth</label>
                                <input
                                    type="date"
                                    name="dob"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.dob} className='form-control'
                                />
                                <span style={{ color: 'red' }}>{errors.dob && touched.dob && errors.dob}</span>
                                <br /> <br />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="formFile" className="form-label">Student Fee</label>
                                <input
                                    type="number"
                                    name="fee"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.fee} className='form-control'
                                />
                                <span style={{ color: 'red' }}>{errors.fee && touched.fee && errors.fee}</span>
                                <br /> <br />
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="formFile" className="form-label">Select a class</label>
                                <select className="form-select" name="classes"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.classes}
                                    aria-label="Default select example">

                                    <option>Please select a valid class</option>
                                    {allClass.map((classes, index) => {
                                        return (
                                            <option key={index} value={classes._id}>{classes.classname}</option>
                                        )
                                    }
                                    )}
                                </select>

                                <span style={{ color: 'red' }}>{errors.classes && touched.classes && errors.classes}</span>
                                <br /> <br />
                            </div>

                            <button className="btn btn-primary btn-sm" type="submit">
                                Submit
                            </button>

                        </form>
                    )}
                </Formik>
            </div>

        </React.Fragment >

    )

}

export default Student;
