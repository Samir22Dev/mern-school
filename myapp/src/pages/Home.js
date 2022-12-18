import React, { useState, useEffect } from "react";
import Navbar from "../Component/Navbar";
import axios from "axios";
import dateFormat, { masks } from "dateformat";
import { BsPencilFill } from 'react-icons/bs';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { useNavigate, Link } from "react-router-dom";
import { CSVLink, CSVDownload } from "react-csv";
import { motion } from 'framer-motion';

const Home = () => {
    const [student, setStudent] = useState([]);
    const [filter, setFilter] = useState('')
    const navigate = useNavigate();
    const [month, setMonth] = useState(null);

    let filteredData = null;

    useEffect(() => {
        axios.get('http://localhost:5000/student')
            .then(function (response) {
                setStudent(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })

    }, [])

    //*************** SEARCHING CODE **************/

    const lowercasedFilter = filter.toLowerCase();
    filteredData = student.filter(item => {
        if (
            (item['sname'] && item['sname'].toLowerCase().includes(lowercasedFilter)) ||
            (item['fname'] && item['fname'].toLowerCase().includes(lowercasedFilter)) ||
            (item['phone'] && item['phone'].toLowerCase().includes(lowercasedFilter)) ||
            (item['email'] && item['email'].toLowerCase().includes(lowercasedFilter))
        ) {
            return true;
        } else { return false; }
    });
    //*************** SEARCHING CODE END **************/   

    // ------------ START DOWNLOAD PDF -----------------/

    const downloadPDF = () => {
        console.log('ok');
        const doc = new jsPDF({
            orientation: 'landscape'
        });
        var totalPagesExp = "{total_pages_count_string}";


        doc.autoTable({
            html: '#my-table', styles: { fontSize: 8 }, margin: { top: 22, left: 10, right: 10 },
            didDrawPage: function (data) {

                doc.setFontSize(20);
                doc.setTextColor(40);
                doc.text(10, 10, 'Sameer Programmer School');
                doc.text(10, 18, 'Current Student Report');

                doc.setFontSize(9);
                let dt = new Date();
                doc.text(260, 18, 'Print: ' + dt.getDate() + '-' + (dt.getMonth() + 1) + '-' + dt.getFullYear());


                var str = "Page " + doc.internal.getNumberOfPages()
                if (typeof doc.putTotalPages === 'function') {
                    str = str + " of " + totalPagesExp;
                }
                doc.setFontSize(10);
                var pageSize = doc.internal.pageSize;
                var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
                doc.text(str, data.settings.margin.left, pageHeight - 10);

            }
        });

        if (typeof doc.putTotalPages === 'function') {
            doc.putTotalPages(totalPagesExp);
        }
        doc.save('current_students.pdf');
    }
    // ----------------- END PDF -----------------------------

    const addstudent = () => {
        navigate("/student")
    }

    //------------------ START EXCEL OR CSV FILE ----------------------
    const headers = [
        { label: 'Student Name', key: 'sname' },
        { label: 'Father Name', key: 'fname' },
        { label: 'Email', key: 'email' },
        { label: 'Address', key: 'address' },
        { label: 'Phone', key: 'phone' },
        { label: 'Date of Birth', key: 'dob' },
        { label: 'Class Name', key: 'classId.classname' },
    ]

    const csvReport = {
        filename: 'Student_Reports.csv',
        headers: headers,
        data: student,
    }

    const generate_fee = () => {

        let path = `http://localhost:5000/unpaidfee/getfee`;

        axios.get(path)
            .then((response) => {
                console.log('months name is :', response.data);
                setMonth(response.data);
                if (response.data == null) {
                    let newDate = new Date();
                    alert('you can generate fee');
                    for (let i = 0; i < student.length; i++) {

                        axios.post('http://localhost:5000/fee', {
                            fee_month: dateFormat(newDate, "mmm-yyyy"),
                            amount: student[i].fee,
                            studentId: student[i]._id,
                            class_name: student[i].classId.classname
                        })
                            .then((response) => {
                                console.log(response.data);
                            })
                            .catch((error) => {
                                console.log(error);
                            });
                    }
                }
                if (response.data == 'Already exist') {
                    alert("Already exist");
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <React.Fragment>
            <Navbar />
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} exit={{ opacity: 0 }} style={{ marginLeft: '5px', marginRight: '5px' }}>
                <h1>All present student</h1>
                <h5>Total {filteredData.length} records</h5>

                <div className="d-flex flex-row-reverse">
                    <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                        <button type="button" onClick={downloadPDF} className="btn btn-danger">Download PDF</button>
                        <button type="button" onClick={generate_fee} className="btn btn-primary">Generate Fee</button>
                        <CSVLink className="btn btn-warning" {...csvReport}>Download CSV</CSVLink>
                        <button type="button" onClick={addstudent} className="btn btn-success">Add student</button>
                    </div>
                </div>
                <br />

                <input type="text" value={filter} className="form-control" onChange={(e) => setFilter(e.target.value)} placeholder="Search any student" />
                <br />

                <table className="table" id="my-table">
                    <thead>
                        <tr className="table-dark">
                            <th scope="col">S#</th>
                            <th scope="col">student Name</th>
                            <th scope="col">Father Name</th>
                            <th scope="col">Class Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Fees</th>
                            <th scope="col">phone</th>
                            <th scope="col">Date of Birth</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Fee</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((std, ind) => {
                            return (
                                <tr key={ind}>
                                    <th scope="row">{ind + 1}</th>
                                    <td>{std.sname}</td>
                                    <td>{std.fname}</td>
                                    <td>{std.classId.classname}</td>
                                    <td>{std.email}</td>
                                    <td>{std.fee}</td>
                                    <td>{std.phone}</td>
                                    <td>{dateFormat(std.dob, "dd-mm-yyyy")}</td>
                                    <td><Link to={`/student/${std._id}`}><BsPencilFill color="green" /></Link></td>
                                    <td><Link to={`/fee/${std._id}`}><BsPencilFill color="green" /></Link></td>
                                </tr>

                            )
                        })}

                    </tbody>
                </table>
            </motion.div>
        </React.Fragment>
    )
}

export default Home;