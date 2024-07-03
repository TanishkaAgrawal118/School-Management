import React, { useEffect, useState } from 'react';
import FacultySidebar from './FacultySidebar';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Paper } from '@mui/material';
import { getStudents } from '../ApiSerives';

const ResultList = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchClass, setSearchClass] = useState('');
  const [searchSubject, setSearchSubject] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getStudents();
        const students = response.data;
        setStudents(students);
        setFilteredStudents(students);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);

  const handleSearch = () => {
    let filtered = students;
    if (searchClass) {
      filtered = filtered.filter(student => student.className === searchClass);
    }
    if (searchSubject) {
      filtered = filtered.filter(student => 
        student.examResult.some(result => result.subName.toLowerCase() === searchSubject.toLowerCase())
      );
    }
    setFilteredStudents(filtered);
  };

  const uniqueClassNames = [...new Set(filteredStudents.map(student => student.className))];

  return (
    <>
      <FacultySidebar/>
      <Container className='content-container'>
        <Paper className='content-paper'>
          <Row>
            <Col>
              <label className="label">Class</label>
              <input
                type="number"
                placeholder="Enter class"
                className="lib-input"
                value={searchClass}
                onChange={(e) => setSearchClass(e.target.value)}
              />
            </Col>
            <Col>
              <label className="label">Subject</label>
              <input
                type="text"
                placeholder="Enter Subject"
                className="lib-input"
                value={searchSubject}
                onChange={(e) => setSearchSubject(e.target.value)}
              />
            </Col>
          </Row>
          <Button variant="primary" size="sm" onClick={handleSearch}>Search</Button>

          {uniqueClassNames.map(className => (
            <div key={className}>
              <h5>Class {className}</h5>
              <table className="table facultyLibrary">
                <thead>
                  <tr>
                    <th scope="col">S.no.</th>
                    <th scope="col">Name</th>
                    <th scope="col">Marks</th>
                    <th scope='col'>Contact</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.filter(student => student.className === className).map((student, index) => (
                    <tr key={student._id}>
                      <td>{index + 1}</td>
                      <td>{student.name}</td>
                      <td>
                        {student.examResult.map((result, resultIndex) => (
                          result.subName.toLowerCase() === searchSubject.toLowerCase() ? (
                            <div key={resultIndex}>{result.marksObtained}</div>
                          ) : null
                        ))}
                      </td>
                      <td>{student.parentsContact}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </Paper>
      </Container>
    </>
  );
}

export default ResultList;
