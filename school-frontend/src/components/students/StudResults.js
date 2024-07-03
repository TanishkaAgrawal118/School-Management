import React, { useEffect, useState } from "react";
import StudSidebar from "./studSidebar";
import { Container } from "react-bootstrap";
import { Paper } from "@mui/material";
import { getStudentById } from "../ApiSerives";
import { useUser } from "../UserContext"; 
const StudResults = () => {
  const [student, setStudent] = useState({ examResult: [] });
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

  const calculateTotalMarks = () => {
    let totalMarks = 0;
    if (student.examResult && student.examResult.length > 0) {
      student.examResult.forEach(result => {
        totalMarks += result.marksObtained;
      });
    }
    return totalMarks;
  };

  
  const calculatePercentage = () => {
    const totalMarks = calculateTotalMarks();
    const totalPossibleMarks = student.examResult.length * 100;
    const percentage = (totalMarks / totalPossibleMarks) * 100;
    return percentage.toFixed(2); 
  };


  return (
    <>
      <StudSidebar />
      <Container className="content-container">
        <Paper elevation={2} className="content-paper">
          <table className="table-bordered resultBox">
            <thead>
              <tr>
                <th>S.no</th>
                <th>Subject</th>
                <th>Marks Obtained</th>
                <th>Total Marks</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
            {student.examResult && student.examResult.length > 0 ? (
                student.examResult.map((result, index) => (
                  <tr key={result._id}>
                    <td>{index + 1}</td>
                    <td>{result.subName}</td>
                    <td>{result.marksObtained}</td>
                    <td>100</td>
                    <td>{result.grade}</td>
                    
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No exam results found
                  </td>
                </tr>
              )}
               <tr>
                <td colSpan="4" className="text-right"><strong>Total Percentage:</strong></td>
                <td>{calculatePercentage()}%</td>
              </tr>
            </tbody>
          </table>
        </Paper>
      </Container>
    </>
  );
};

export default StudResults;



