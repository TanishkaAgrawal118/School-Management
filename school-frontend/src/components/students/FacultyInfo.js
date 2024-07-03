import React, { useEffect, useState } from 'react';
import StudSidebar from './studSidebar';
import { Container } from 'react-bootstrap';
import { Paper } from '@mui/material';
import axios from 'axios';
import { getFaculty } from '../ApiSerives';

const FacultyInfo = () => {
  const [faculty, setFaculty] = useState([]);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const response = await getFaculty();
        setFaculty(response.data);
      } catch (error) {
        console.error('Error fetching faculty data:', error);
      }
    };

    fetchFaculty();
  }, []);

  return (
    <>
      <StudSidebar />
      <Container className="content-container">
        <Paper elevation={0} className="content-paper">
          <h5>Contact of Mentors</h5>
          <table className="table facultyLibrary">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Subjects</th>
                <th>Contact</th>
                <th>Email</th>
             
              </tr>
            </thead>
            <tbody>
              {faculty.map((member, index) => (
                <tr key={member._id}>
                  <td>{index + 1}</td>
                  <td>{member.name}</td>
                  <td>{member.subject?.join(', ') || 'NA'}</td>
                  <td>{member.phone}</td>
                  <td>{member.email}</td>
                
                </tr>
              ))}
            </tbody>
          </table>
        </Paper>
      </Container>
    </>
  );
};

export default FacultyInfo;
