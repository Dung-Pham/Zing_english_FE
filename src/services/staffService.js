import axios from '../axios';
let getAllStaff=()=>{
    return axios.get("/api/get-all-staff");
}
let createNewStaff=(data)=>{
    axios.post('/api/create-new-students',data);
}
let deleteStaff= (id)=>{
    axios.delete(`/api/delete-staff?id=${id}`)
}
let editStaff=(data)=>{
    axios.put('/api/edit-staff', data);
}
let getUserFromStaff=(id)=>{
    axios.get(`/api/get-user-from-staff?id=${id}`)
}
export{
    getAllStaff,createNewStaff,deleteStaff,editStaff,getUserFromStaff
}