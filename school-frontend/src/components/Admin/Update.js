import React, { useEffect, useState } from 'react'
import AdminSidebar from './AdminSidebar'
import { Container } from 'react-bootstrap'
import { Paper } from '@mui/material'
import { getStudents } from '../ApiSerives'

const Update = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchStudent = async () =>{
            try {
                const response = await getStudents();
                setStudents(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchStudent();
    },[])
  return (
    <>
        <AdminSidebar/>
        <Container className='content-container'>
            <Paper className='content-paper'>
            <table className='table facultyLibrary'>
            <thead>
                <tr>
                    <th>S.no</th>
                    <th>Name</th>
                    <th>Class</th>
                    <th>Roll No.</th>
                </tr>
            </thead>
            <tbody>
                {students.map((student, index) => (
                    <tr key={student._id}>
                        <td>{index+1}</td>
                        <td>{student.name}</td>
                        <td>{student.className}</td>
                        <td>{student.rollNum}</td>
                    </tr>
                ))}
                
            </tbody>
        </table>
            </Paper>
        </Container>
       
    </>
  )
}

export default Update
