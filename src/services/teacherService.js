import axios from '../axios'


let getUserFromTeacher= (id)=>{
    return axios.get(`api/get-user-from-teacher?id=${id}`)
}

let getTopTeacher = () => {
    return axios.get(`api/get-top-teachers`)
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

//hw
let getAllHW=()=>{
    return axios.get("/api/get-all-hw");
}
let createNewHW=(data)=>{
    return axios.post('/api/create-new-hw', data);
}
let editHW=(data)=>{
    return axios.put('/api/edit-hw',data);
}
export
{
    getTopTeacher,getAllTeachers,getTeacherByUserId,getUserFromTeacher,
    createNewTeacher,editTeacher,
    editHW, createNewHW,getAllHW
}
