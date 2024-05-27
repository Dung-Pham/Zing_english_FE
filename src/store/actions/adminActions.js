import actionTypes from './actionTypes';
import { toast } from 'react-toastify'
import {creatNewUser} from '../../services/userService'
import{getAllStudents, deleteStudent, editStudent}  from '../../services/studentService'
import{ getTopTeacher, getAllTeachers,createNewTeacher, editTeacher}  from '../../services/teacherService';
import{ editCourse, getAllCourse, createNewCourse}  from '../../services/courseService';
import{ editStaff, getAllStaff, createNewStaff}  from '../../services/staffService';


export const createNewUserRedux = (data) => {
    return async (dispatch, getState) => {

        try {
            let res = await creatNewUser(data)
            if (res && res.errCode === 0) {
                toast.success('Creat a new user success!')
                dispatch(saveUserSuccess())
                dispatch(fetchAllStudentStart())
            } else {
                dispatch(saveUserFailed())
            }
        } catch (e) {
            dispatch(saveUserFailed())
            toast.error('Error!')
            console.log('check saveUserFailed err: ', e)
        }
    }
}

export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_STUDENT_SUCCESS
})

export const saveUserFailed = () => ({
    type: actionTypes.CREATE_STUDENT_FAILED
})

export const fetchAllStudentStart = () => {
    return async (dispatch, getState) => {

        try {
            let res = await getAllStudents('ALL');
            if (res && res.errCode === 0) {
                dispatch(fetchAllStudentSuccess(res.students.reverse()))
            } else {
                dispatch(fetchAllStudentFailed())
            }
        } catch (e) {
            dispatch(fetchAllStudentFailed())
            console.log('check fetchAllStudentStart err: ', e)
        }
    }
}

export const fetchAllStudentSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_STUDENT_SUCCESS,
    data: data,
})

export const fetchAllStudentFailed = () => ({
    type: actionTypes.FETCH_ALL_STUDENT_FAILED
})

export const fetchDeleteStudentStart = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteStudent(id)
            if (res && res.errCode === 0) {
                toast.success('Delete Student success!', {
                    theme: 'dark'
                })
                dispatch(fetchDeleteStudentSuccess())
                dispatch(fetchAllStudentStart())
            } else {
                toast.error('Delete Student failed!')
                dispatch(fetchDeleteStudentFailed())
            }
        } catch (e) {
            toast.error('Delete Student failed!')
            dispatch(fetchAllStudentFailed())
            console.log('check fetchDeleteStudentStart err: ', e)
        }
    }
}

export const fetchDeleteStudentSuccess = () => ({
    type: actionTypes.EDIT_STUDENT_SUCCESS,
})

export const fetchDeleteStudentFailed = () => ({
    type: actionTypes.EDIT_STUDENT_FAILED
})

export const fetchEditStudentStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editStudent(data);
            if (res && res.errCode === 0) {
                toast.success('Edit Student success!')
                dispatch(fetchEditStudentSuccess())
                dispatch(fetchAllStudentStart())
            } else {
                toast.error('Edit user failed!')
                dispatch(fetchEditStudentFailed())
            }
        } catch (e) {
            toast.error('Edit Student failed!')
            dispatch(fetchAllStudentFailed())
            console.log('check fetchEditStudentStart err: ', e)
        }
    }
}

export const fetchEditStudentSuccess = () => ({
    type: actionTypes.EDIT_STUDENT_SUCCESS,
})

export const fetchEditStudentFailed = () => ({
    type: actionTypes.EDIT_STUDENT_FAILED
})


export const loadTopTeacher = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopTeacher()
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.lOAD_TOP_TEACHER_SUCCESS,
                    data: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.lOAD_TOP_TEACHER_FAILED,
                })
            }
        } catch (e) {
            console.log('lOAD_TOP_TEACHER_FAILED: ', e)
            dispatch({
                type: actionTypes.lOAD_TOP_TEACHER_FAILED,
            })
        }
    }
}








//teacher 
export const getALLTeachers = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllTeachers()
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_TEACHER_SUCCESS,
                    data: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_TEACHER_FAILED,
                })
            }
        } catch (e) {
            console.log('FETCH_ALL_TEACHER_FAILED: ', e)
            dispatch({
                type: actionTypes.FETCH_ALL_TEACHER_FAILED,
            })
        }
    }
}


export const createNewTeacherRedux = (data) => {
    return async (dispatch, getState) => {

        try {
            let res = await createNewTeacher(data)
            if (res && res.errCode === 0) {
                toast.success('Creat a new teacher success!')
                dispatch(saveTeacherSuccess())
                dispatch(getALLTeachers())
            } else {
                dispatch(saveTeacherFailed())
                toast.error(res.errMessage)
            }
        } catch (e) {
            dispatch(saveTeacherFailed())
            toast.error('Error!')
            console.log('check saveTeacherFailed err: ', e)
        }
    }
}

export const saveTeacherSuccess = () => ({
    type: actionTypes.CREATE_TEACHER_SUCCESS
})

export const saveTeacherFailed = () => ({
    type: actionTypes.CREATE_TEACHER_FAILED
})


export const fetchEditTeacherStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editTeacher(data);
            if (res && res.errCode === 0) {
                toast.success('Edit Teacher success!')
                dispatch({
                    type: actionTypes.FETCH_EDIT_TEACHER_SUCCESS,
                })
                
                dispatch(getALLTeachers())
            } else {
                toast.error('Edit Teacher failed!')
                dispatch({
                    type: actionTypes.FETCH_EDIT_TEACHER_FAILED,
                })
            }
        } catch (e) {
            toast.error('Edit Teacher failed!')
            dispatch({
                type: actionTypes.FETCH_EDIT_TEACHER_FAILED,
            })
            console.log('check fetchEditTeacherStart err: ', e)
        }
    }
}


export const fetchEditCourseStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editCourse(data);
            if (res && res.errCode === 0) {
                toast.success('Edit Course success!')
                dispatch({
                    type: actionTypes.EDIT_COURSE_SUCCESS,
                })
                
                dispatch(getALLCourse())
            } else {
                toast.error('Edit course failed!')
                dispatch({
                    type: actionTypes.EDIT_COURSE_FAILED,
                })
            }
        } catch (e) {
            toast.error('Edit course failed!')
            dispatch({
                type: actionTypes.EDIT_COURSE_FAILED,
            })
            console.log('check fetchEditCourseStart err: ', e)
        }
    }
}
export const getALLCourse = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCourse();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_COURSE_SUCCESS,
                    data: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_COURSE_FAILED,
                })
            }
        } catch (e) {
            console.log('FETCH_ALL_COURSE_FAILED: ', e)
            dispatch({
                type: actionTypes.FETCH_ALL_COURSE_FAILED,
            })
        }
    }
}

export const createNewCourseRedux = (data) => {
    return async (dispatch, getState) => {

        try {
            let res = await createNewCourse(data)
            if (res && res.errCode === 0) {
                toast.success('Creat a new course success!');
                dispatch( {type: actionTypes.CREATE_COURSE_SUCCESS});
                dispatch(getALLCourse());
            } else {
                dispatch( {type: actionTypes.CREATE_COURSE_FAILED})
            }
        } catch (e) {
            dispatch( {type: actionTypes.CREATE_COURSE_FAILED})
            toast.error('Error!')
            console.log('check saveCourseFailed err: ', e)
        }
    }
}


export const fetchEditStaffStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editStaff(data);
            if (res && res.errCode === 0) {
                toast.success('Edit staff success!')
                dispatch({
                    type: actionTypes.EDIT_STAFF_SUCCESS,
                })
                
                dispatch(getAllStaff())
            } else {
                toast.error('Edit staff failed!')
                dispatch({
                    type: actionTypes.EDIT_STAFF_FAILED,
                })
            }
        } catch (e) {
            toast.error('Edit Staff failed!')
            dispatch({
                type: actionTypes.EDIT_STAFF_FAILED,
            })
            console.log('check fetchEditStaffStart err: ', e)
        }
    }
}


export const getALLStaff = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllStaff()
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_STAFF_SUCCESS,
                    data: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_STAFF_FAILED,
                })
            }
        } catch (e) {
            console.log('FETCH_ALL_STAFF_FAILED: ', e)
            dispatch({
                type: actionTypes.FETCH_ALL_STAFF_FAILED,
            })
        }
    }
}

export const createNewStaffRedux = (data) => {
    return async (dispatch, getState) => {

        try {
            let res = await createNewStaff(data)
            if (res && res.errCode === 0) {
                toast.success('Creat a new staff success!');
                dispatch( {type: actionTypes.CREATE_STAFF_SUCCESS});
                dispatch(getALLStaff());
            } else {
                dispatch( {type: actionTypes.CREATE_STAFF_FAILED})
            }
        } catch (e) {
            dispatch( {type: actionTypes.CREATE_STAFF_FAILED})
            toast.error('Error!')
            console.log('check saveStaffFailed err: ', e)
        }
    }
}