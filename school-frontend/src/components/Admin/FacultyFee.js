import React, { useEffect, useState } from 'react';
import AdminSidebar from './AdminSidebar';
import { Button, Container } from 'react-bootstrap';
import { Paper } from '@mui/material';
import { FeePayment, getFaculty } from '../ApiSerives';

const FacultyFee = () => {
    const [faculty, setFaculty] = useState([]);

    useEffect(() => {
        const fetchFaculty = async () => {
            try {
                const response = await getFaculty();
                setFaculty(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchFaculty();
    }, []);

    const paymentHandler = async (teacher) => {
        try {
            const salary = teacher.salary;
            const minimumAmount = 100;
            const amount = Math.max(salary * 100, minimumAmount);
            const currency = "INR";
            const receiptId = `receipt_${Math.floor(Math.random() * 1000000)}`;

            const paymentData = {
                amount,
                currency,
                receipt: receiptId,
                notes: {
                    teacherId: teacher._id,
                    teacherName: teacher.name,
                },
            };

            const order = await FeePayment(paymentData);
            console.log("Order created:", order);

            const options = {
                key: "rzp_test_Z6aHxffpBMQEJF",
                amount,
                currency,
                name: "School Name",
                description: "Salary Payment",
                image: "https://example.com/your_logo",
                order_id: order.id,
                handler: async function (response) {
                    const body = {
                        ...response,
                    };
                },
                prefill: {
                    name: teacher.name,
                    email: teacher.email,
                    contact: teacher.phone,
                },
                notes: {
                    address: "School Address",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const rzp1 = new window.Razorpay(options);
            rzp1.on("payment.failed", function (response) {
                alert(response.error.code);
                alert(response.error.description);
                alert(response.error.source);
                alert(response.error.step);
                alert(response.error.reason);
                alert(response.error.metadata.order_id);
                alert(response.error.metadata.payment_id);
            });
            rzp1.open();
        } catch (error) {
            console.error("Error creating order:", error.message);
        }
    };

    return (
        <>
            <AdminSidebar />
            <Container className='content-container'>
                <Paper className='content-paper'>
                    <table className='table facultyLibrary'>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Name</th>
                                <th>Contact</th>
                                <th>Salary</th>
                                <th>Subjects</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {faculty.map((teacher, index) => (
                                <tr key={teacher._id}>
                                    <td>{index + 1}</td>
                                    <td>{teacher.name}</td>
                                    <td>{teacher.phone}</td>
                                    <td>{teacher.salary}</td>
                                    <td>{teacher.subject?.join(', ') || 'N/A'}</td>
                                 
                                    <td>
                                        <Button variant='success' size='sm' onClick={() => paymentHandler(teacher)}>Pay Salary</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Paper>
            </Container>
        </>
    );
}

export default FacultyFee;