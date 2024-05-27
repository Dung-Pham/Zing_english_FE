import axios from '../axios'


// let getAllCourse = (inputId) => {
//     return axios.get(`api/get-all-course?id=${inputId}`)
// }
let getAllCourse = () => {
    return axios.get("/api/get-all-courses");
}

let createRegisterCourse=(data)=>{
    return axios.post('/api/create-new-register', data);
}

let createNewCourse=(data)=>{
    return axios.post('/api/create-course', data);

}
let editCourse=(data)=>{
    return axios.put('/api/edit-course', data);
}
let deleteCourse=(id)=>{
    return axios.delete(`/api/delete-course?id=${id}`)
}
export
{
    createRegisterCourse,
    getAllCourse,createNewCourse,
    deleteCourse,editCourse
    
}