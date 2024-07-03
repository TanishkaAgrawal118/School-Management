import React, { useEffect, useState } from 'react'
import StudSidebar from './studSidebar'
import { Button, Container } from 'react-bootstrap'
import { Paper } from '@mui/material'
import { FeePayment, getStudentById } from '../ApiSerives'
import { useUser } from '../UserContext'

const StudFees = () => {
  const [student, setStudent] = useState({ fees:[]});
  const { user } = useUser();
  const studentId = user?.id; 
  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await getStudentById(studentId);
        console.log(studentId);
        setStudent(response.data); 
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching student:", error);
      }
    };

    if (studentId) {
      fetchStudent();
    }
  }, [studentId]);
  const calculateTotalFees = (fees) => {
    if (!fees || fees.length === 0) return 0;
    return fees.reduce((total, fee) => {
      return (total +fee.tuition +fee.library +fee.transport +fee.lab +fee.sports +fee.examination +fee.technology);
    }, 0);
  };


  const paymentHandler = async (e) => {
    try {
      const totalFees = calculateTotalFees(student.fees);
      const minimumAmount = 100;
      const amount = Math.max(totalFees * 100, minimumAmount);
      const currency = "INR";
      const receiptId = `receipt_${Math.floor(Math.random() * 1000000)}`;

      const paymentData = {
        amount,
        currency,
        receipt: receiptId,
        notes: {
          studentId,
          studentName: student.name,
        },
      };

      const order = await FeePayment(paymentData);
      console.log("Order created:", order);

      const options = {
        key: "rzp_test_Z6aHxffpBMQEJF",
        amount,
        currency,
        name: "Acme Corp",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: order.id,
        handler: async function (response) {
          const body = {
            ...response,
          };
        },
        prefill: {
          name: "Web Dev Matrix",
          email: "webdevmatrix@example.com",
          contact: "9000000000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      var rzp1 = new window.Razorpay(options);
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

      e.preventDefault();
    } catch (error) {
      console.error("Error creating order:", error.message);
    }
  };

  const totalFees = calculateTotalFees(student.fees);
  console.log(totalFees);

  const fees = student.fees[0] || {};
  return (
    <>
        <StudSidebar/>
        <Container className='content-container'>
        <Paper elevation={0} className='content-paper'>
        <table className='table-borderd feesTable'>
          <thead>
            <tr>
              <th>S.no</th>
              <th>Fee Structure</th>
              <th>Amount(Rs.)</th>
            </tr>
          </thead>
          <tbody>

            <tr>
              <td>1</td>
              <td>Tuition Fees</td>
              <td>{fees.tuition }</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Library Fees</td>
              <td>{fees.library}</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Transport Fees</td>
              <td>{fees.transport}</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Lab Fees</td>
              <td>{fees.lab}</td>
            </tr>
            <tr>
              <td>5</td>
              <td>Sports Fees</td>
              <td>{fees.sports}</td>
            </tr>
            <tr>
              <td>6</td>
              <td>Examition Fees</td>
              <td>{fees.examination}</td>
            </tr>
            <tr>
              <td>7</td>
              <td>Technology</td>
              <td>{fees.technology}</td>
            </tr>
            <tr>
              <td colSpan={2}>Total</td>
              <td><b>Rs.{totalFees}</b></td>
            </tr>
          </tbody>
        </table>
        <Button variant='primary' onClick={paymentHandler} className="pay">Pay Fees</Button>
        </Paper>
        </Container>
    </>
  )
}

export default StudFees