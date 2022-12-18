import React from "react";
import Navbar from "../Component/Navbar";
import axios from "axios";
import { useNavigate, Link, useParams } from "react-router-dom";


const EditFee = () => {
    const navigate = useNavigate();
    const { feeid, amount } = useParams();
    console.log('fee and id: ', feeid, amount);
    const getFee = () => {
        console.log("ok")

        axios.put(`http://localhost:5000/fee/${feeid}/${amount}`, {
            feeid: feeid,
            amount: amount
        })
            .then((response) => {
                console.log(response.data);
                navigate("/")
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <React.Fragment>
            <Navbar />
            <div className="container">

                <h5>Edit Fee</h5>
                <h5>Fee Id: {feeid}</h5>
                <h5>Student Fee: {amount}</h5>

                <button type="button" onClick={getFee} className="btn btn-primary">Fee Received</button>

            </div>

        </React.Fragment>
    )

}



export default EditFee;