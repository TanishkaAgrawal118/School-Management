import React, { useEffect, useState } from 'react';
import FacultySidebar from './FacultySidebar';
import { Button, Container } from 'react-bootstrap';
import { Paper } from '@mui/material';
import { getStudents, updateLeaveStatus } from '../ApiSerives';

const LeaveDetails = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getStudents();
        setStudents(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchStudents();
  }, []);

  const handleStatusChange = async (leaveId, studentId, status) => {
    try {
      const response = await updateLeaveStatus(leaveId, studentId, status);
      setStudents((prevStudents) => 
        prevStudents.map((student) => 
          student._id === studentId
            ? {
                ...student,
                leaves: student.leaves.map((leave) =>
                  leave._id === leaveId ? { ...leave, status: response.data.status } : leave
                )
              }
            : student
        )
      );
      alert("Status updated successfully!")
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <FacultySidebar />
      <Container className='content-container'>
        <Paper elevation={0} className='content-paper'>
          <h4>Leave Application of students</h4>
          <table className='table facultyLibrary'>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Class</th>
                <th>Leave Date</th>
                <th>Application</th>
                <th>Status</th>
                <th>Current Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) =>
                student.leaves.map((leave, leaveIndex) => (
                  <tr key={`${student._id},${leave._id}`}>
                      <td >{student.name}</td>
                      <td >{student.className}</td>
                    <td>
                      Leave start date: {new Date(leave.startDate).toLocaleDateString()}<br />
                      Leave End Date: {new Date(leave.endDate).toLocaleDateString()}
                    </td>
                    <td>{leave.file ? <a href={leave.file} target="_blank">View File</a> : 'No file'}</td>
                    <td>
                      <Button variant="success" size="sm" onClick={() => handleStatusChange(leave._id, student._id, 'Approved')}>
                        Approve
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => handleStatusChange(leave._id, student._id, 'Rejected')}>
                        Reject
                      </Button>
                    </td>
                    <td>{leave.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </Paper>
      </Container>
    </>
  );
};

export default LeaveDetails;