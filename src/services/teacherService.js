import axios from '../axios'


let getUserFromTeacher= (id)=>{
    return axios.get(`api/get-user-from-teacher?id=${id}`)
}

let getTopTeacher = (inputId) => {
    return axios.get(`api/get-top-teachers?id=${inputId}`)
}
let getAllTeachers=()=>{
    return axios.get("/api/get-all-teachers");
}
let getTeacherByUserId=(userId)=>{
    return axios.get(`/api/get-teacher-by-user-id?userId=${userId}`);
}
let createNewTeacher=(data)=>{
    return axios.post('/api/create-new-teacher', data);
}
let editTeacher=(data)=>{
    return axios.put('/api/edit-teacher',data);
}
export
{
    getTopTeacher,getAllTeachers,getTeacherByUserId,getUserFromTeacher,
    createNewTeacher,editTeacher
}
