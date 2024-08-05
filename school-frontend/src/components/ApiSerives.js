import axios from 'axios';

export function adminLogin(data){
    return axios.post("http://localhost:3600/adminLogin", data);

}

export function studentLogin(data){
    return axios.post('http://localhost:3600/studentLogin', data);
}

export function facultyLogin(data){
    return axios.post('http://localhost:3600/facultyLogin', data);
}

export function getStudents(data){
    return axios.get('http://localhost:3600/studentDetail', data);
}
export function saveAttendance(data){
    return axios.post('http://localhost:3600/saveAttendance', data);
}
export function studentRegister(data){
    return axios.post('http://localhost:3600/studentRegister', data);
}

export function facultyRegister(data){
    return axios.post('http://localhost:3600/facultyRegister', data);
}

export function saveResult(data){
    return axios.post('http://localhost:3600/saveResult', data);
}

export function getStudentById(studentId) {
    return axios.get(`http://localhost:3600/studentDetail/${studentId}`);
}

export function FeePayment(data){
    return axios.post('http://localhost:3600/payment', data);
}

export function saveLibrary(bookIssueData) {
    return axios.post(`http://localhost:3600/saveLibrary`, bookIssueData);
}


// export function saveLeave(data){
//     return axios.post('http://localhost:3700/leaveApplication', data);
// }

export function saveLeave(studentId, formDataToSend) {
    return axios.post(`http://localhost:3600/leaveApplication/${studentId}`, formDataToSend);
}

export const updateLeaveStatus = (leaveId, studentId, status) => {
    return axios.put(`http://localhost:3600/leaveApplication/${leaveId}/${studentId}`, { status });
};


export function getFaculty(data) {
    return axios.get(`http://localhost:3600/facultyDetails`,data);
}

export function getFacultyById(facultyId){
    return axios.get(`http://localhost:3600/facultyDetails/${facultyId}`)
}

export function saveNotice(schlId, formDataToSend){
    return axios.post(`http://localhost:3600/notice/66af38347cdcdae0bf6dc7bd`, formDataToSend);
}

export function getSchoolData(data){
    return axios.get('http://localhost:3600/schoolData', data);
}

export const deleteBook = (bookId, studentId) => {
    return axios.delete(`http://localhost:3600/deletebook/${bookId}/${studentId}`);
}