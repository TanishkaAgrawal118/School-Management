import axios from 'axios';

export function adminLogin(data){
    return axios.post("http://localhost:3700/adminLogin", data);

}

export function studentLogin(data){
    return axios.post('http://localhost:3700/studentLogin', data);
}

export function facultyLogin(data){
    return axios.post('http://localhost:3700/facultyLogin', data);
}

export function getStudents(data){
    return axios.get('http://localhost:3700/studentDetail', data);
}
export function saveAttendance(data){
    return axios.post('http://localhost:3700/saveAttendance', data);
}
export function studentRegister(data){
    return axios.post('http://localhost:3700/studentRegister', data);
}

export function facultyRegister(data){
    return axios.post('http://localhost:3700/facultyRegister', data);
}

export function saveResult(data){
    return axios.post('http://localhost:3700/saveResult', data);
}

export function getStudentById(studentId) {
    return axios.get(`http://localhost:3700/studentDetail/${studentId}`);
}

export function FeePayment(data){
    return axios.post('http://localhost:3700/payment', data);
}

export function saveLibrary(bookIssueData) {
    return axios.post(`http://localhost:3700/saveLibrary`, bookIssueData);
}


// export function saveLeave(data){
//     return axios.post('http://localhost:3700/leaveApplication', data);
// }

export function saveLeave(studentId, formDataToSend) {
    return axios.post(`http://localhost:3700/leaveApplication/${studentId}`, formDataToSend);
}

export const updateLeaveStatus = (leaveId, studentId, status) => {
    return axios.put(`http://localhost:3700/leaveApplication/${leaveId}/${studentId}`, { status });
};


export function getFaculty(data) {
    return axios.get(`http://localhost:3700/facultyDetails`,data);
}

export function getFacultyById(facultyId){
    return axios.get(`http://localhost:3700/facultyDetails/${facultyId}`)
}

export function saveNotice(schlId, formDataToSend){
    return axios.post(`http://localhost:3700/notice/${schlId}`, formDataToSend);
}

export function getSchoolData(data){
    return axios.get('http://localhost:3700/schoolData', data);
}

export const deleteBook = (bookId, studentId) => {
    return axios.delete(`http://localhost:3700/deletebook/${bookId}/${studentId}`);
}