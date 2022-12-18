import Navbar from "../Component/Navbar"
import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Formik } from 'formik';
import dateFormat, { masks } from "dateformat";

const UpdateStudent = () => {
    const [student, setStudent] = useState({ sname: '', fname: '', email: '', phone: '', address: '', dob: '' });

    let { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/student/edit/${id}`)
            .then(function (response) {
                console.log(response.data[0]);
                setStudent(response.data[0])
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])

    return (
        <div>
            <Navbar />
            <div className='container'>
                <h4>Update Student {id}</h4>

                <Formik
                    enableReinitialize
                    initialValues={{ sname: student.sname, fname: student.fname, email: student.email, address: student.address, phone: student.phone, dob: dateFormat(student.dob, 'yyyy-mm-dd'), fee: student.fee }}
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
                        if (!values.fee) {
                            errors.fee = 'Student fee is required';
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            axios.put(`http://localhost:5000/student/${id}`, {
                                sname: values.sname,
                                fname: values.fname,
                                email: values.email,
                                address: values.address,
                                phone: values.phone,
                                dob: values.dob,
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
                                    type="text"
                                    name="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
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

                            <button className="btn btn-primary btn-sm" type="submit" disabled={isSubmitting}>
                                Submit
                            </button>

                        </form>
                    )}
                </Formik>
            </div>
        </div>
    )
}
export default UpdateStudent