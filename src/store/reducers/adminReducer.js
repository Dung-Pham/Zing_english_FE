import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGender: false,
    users: [],
    topTeacher: [],
    students:[],
    courses:[],
    teachers:[]
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
       
        case actionTypes.FETCH_ALL_USER_SUCCESS:
            state.users = action.data
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USER_FAILED:
            state.users = []
            return {
                ...state,
            }
        case actionTypes.lOAD_TOP_TEACHER_SUCCESS:
            state.topTeacher = action.data
            return {
                ...state,
            }
        case actionTypes.lOAD_TOP_TEACHER_FAILED:
            state.topTeacher = []
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_TEACHER_SUCCESS:
            state.teachers = action.data
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_TEACHER_FAILED:
            state.teachers = []
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_STUDENT_SUCCESS:
            state.students = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_STUDENT_FAILED:
            state.students = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_COURSE_SUCCESS:
            state.courses = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_COURSE_FAILED:
            state.courses = [];
            return {
                ...state,
            }
            
        default:
            return state;
    }
}

export default adminReducer;