import axios from '../axios'

let handleLogin = (username, password) => {
    return axios.post('api/login', { username, password })
}

let getAllUsers = (inputId) => {
    return axios.get(`api/get-all-users?id=${inputId}`)
}

let creatNewUser = (data) => {
    return axios.post(`/api/create-new-students`, data)
}

let deleteUser = (userId) => {
    return axios.delete('/api/delete-user', { data: { id: userId } })
}

let editUser = (user) => {
    return axios.put('/api/edit-user', user)
}


let getTopTeacher=(limit)=>{
    return axios.get(`/api/get-top-teachers?limit=${limit}`);
}


let postBookAppointment = (data) => {
    return axios.post(`/api/patient-book-appointment`, data)
}



// get all event
let getAllEvents=()=>{
    return axios.get("/api/get-all-events");
}


let getDetailCourse=(id)=>{
    return axios.get(`/api/get-detail-course?id=${id}`);
}


let getDetailEventById=(id)=>{
    return axios.get(`/api/get-detail-event?id=${id}`);
}


let getClassById=(id)=>{
    return axios.get(`/api/get-class-by-id?id=${id}`);
}
let getUserFromStudent=(id)=>{
    return axios.get(`/api/get-user-from-student?id=${id}`);
}

export {
    getClassById,
    handleLogin, getAllUsers, creatNewUser, deleteUser, editUser,
    postBookAppointment,  
    getDetailCourse,getTopTeacher
    ,getAllEvents,
    getDetailEventById, 
    getUserFromStudent
}