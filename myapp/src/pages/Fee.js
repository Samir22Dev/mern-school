import React, { Fragment, useEffect, useState } from "react"
import Navbar from "../Component/Navbar"
import axios from "axios";
import dateFormat, { masks } from "dateformat";
import { BsPencilFill } from 'react-icons/bs';
import { useNavigate, Link, useParams } from "react-router-dom";


const Fee = () => {
    const [sfees, setFees] = useState([]);
    const navigate = useNavigate();
    const sid = useParams();
    console.log('sid: ', sid.sid);

    useEffect(() => {
        axios.get(`http://localhost:5000/fee/${sid.sid}`)
            .then((response) => {
                console.log(response.data);
                setFees(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])



    return (
        <Fragment>
            <Navbar />

            <div className="container">
                <h2>Student Fee</h2>
                <h4>Student ID: {sid.sid}</h4>

                <table className="table" id="my-table">
                    <thead>
                        <tr className="table-dark">
                            <th scope="col">S#</th>
                            <th scope="col">Fee Month</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Student Name</th>
                            <th scope="col">Fee status</th>
                            <th scope="col">Pay Date</th>
                            <th scope="col">Edit</th>
                        </tr>
                    </thead>
                    <tbody>

                        {sfees.map((fe, ind) => {
                            return (
                                <tr key={ind}>
                                    <th scope="row">{ind + 1}</th>
                                    <td>{fe.fee_month}</td>
                                    <td>{fe.amount}</td>
                                    <td>{fe.studentId.sname}</td> 
                                    <td>{fe.fee_status}</td>                                    
                                    <td>{dateFormat(fe.pay_date, "dd-mm-yyyy")}</td>
                                    <td><Link to={`/editfee/${fe._id}/${fe.amount}`}><BsPencilFill color="green" /></Link></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </Fragment>
    )
}

export default Fee;