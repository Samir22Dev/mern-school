import React, { Fragment, useEffect, useState } from "react"
import Navbar from "../Component/Navbar"
import axios from "axios";
import dateFormat, { masks } from "dateformat";




const AllFee = () => {
    const [sfees, setFees] = useState([]);
    const [unPaidFee, setUnpaidFee] = useState('');
    const [paidFee, setPaidFee] = useState('');

    useEffect(() => {
        axios.get("http://localhost:5000/fee")
            .then((response) => {
                setFees(response.data);
                getUnpaid();
            })
            .catch((error) => {
                console.log(error);
            })
    }, [])

    const getUnpaid = () => {
        axios.get("http://localhost:5000/unpaidfee")
            .then((response) => {
                setUnpaidFee(response.data.unpaid)
                setPaidFee(response.data.paid)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <Fragment>
            <Navbar />

            <div className="container">
                <h2>Students All Fee</h2>
                <h5>Unpaid Fee:<span style={{ color: "red" }}>{unPaidFee}</span>  Paid Fee: <span style={{ color: "green" }}>{paidFee}</span></h5>

                <table className="table" id="my-table">
                    <thead>
                        <tr className="table-dark">
                            <th scope="col">S#</th>
                            <th scope="col">Fee Month</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Class</th>
                            <th scope="col">Student Name</th>
                            <th scope="col">Fee Status</th>
                            <th scope="col">Pay Date</th>

                        </tr>
                    </thead>
                    <tbody>
                        {sfees.map((fe, ind) => {

                            return (
                                <tr key={ind}>
                                    <th scope="row">{ind + 1} </th>
                                    <td>{fe.fee_month}</td>
                                    <td>{fe.amount}</td>
                                    <td>{fe.class_name}</td>
                                    <td>{fe.studentId.sname}</td>
                                    <td className={fe.fee_status == 'PAID' ? 'text-success' : 'text-danger'} >{fe.fee_status}</td>
                                    <td>{fe.pay_date ? dateFormat(fe.pay_date, "dd-mm-yyyy") : 'No'}</td>

                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </Fragment>
    )
}

export default AllFee;