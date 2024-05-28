const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
  

    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',

    //admin


    FETCH_ROLE_SUCCESS: 'FETCH_ROLE_SUCCESS',
    FETCH_ROLE_FAILED: 'FETCH_ROLE_FAILED',

    CREATE_STUDENT_SUCCESS: 'CREATE_STUDENT_SUCCESS',
    CREATE_STUDENT_FAILED: 'CREATE_STUDENT_FAILED',

    
    FETCH_ALL_USER_SUCCESS: 'FETCH_ALL_USER_SUCCESS',
    FETCH_ALL_USER_FAILED: 'FETCH_ALL_USER_FAILED',

    DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
    DELETE_USER_FAILED: 'DELETE_USER_FAILED',

    EDIT_USER_SUCCESS: 'EDIT_USER_SUCCESS',
    EDIT_USER_FAILED: 'EDIT_USER_FAILED',

    lOAD_TOP_TEACHER_SUCCESS: 'lOAD_TOP_TEACHER_SUCCESS',
    lOAD_TOP_TEACHER_FAILED: 'lOAD_TOP_TEACHER_FAILED',


    FETCH_ALL_TEACHER_SUCCESS:'FETCH_ALL_TEACHER_SUCCESS',
    FETCH_ALL_TEACHER_FAILED: 'FETCH_ALL_TEACHER_FAILED',

    
    CREATE_TEACHER_SUCCESS: 'CREATE_TEACHER_SUCCESS',
    CREATE_TEACHER_FAILED: 'CREATE_TEACHER_FAILED',



    FETCH_EDIT_TEACHER_FAILED:'FETCH_EDIT_TEACHER_FAILED',
    FETCH_EDIT_TEACHER_SUCCESS:'FETCH_EDIT_TEACHER_SUCCESS',


    FETCH_ALL_COURSE_FAILED:'FETCH_ALL_COURSE_FAILED',
    FETCH_ALL_COURSE_SUCCESS:'FETCH_ALL_COURSE_SUCCESS',

    CREATE_COURSE_SUCCESS: 'CREATE_SCOURSE_SUCCESS',
    CREATE_COURSE_FAILED: 'CREATE_COURSE_FAILED',

    DELETE_COURSE_SUCCESS: 'DELETE_COURSE_SUCCESS',
    DELETE_COURSE_FAILED: 'DELETE_COURSE_FAILED',

    EDIT_COURSE_SUCCESS: 'EDIT_COURSE_SUCCESS',
    EDIT_COURSE_FAILED: 'EDIT_COURSE_FAILED',
    //STAFF
    FETCH_ALL_STAFF_FAILED:'FETCH_ALL_STAFF_FAILED',
    FETCH_ALL_STAFF_SUCCESS:'FETCH_ALL_STAFF_SUCCESS',

    CREATE_STAFF_SUCCESS: 'CREATE_STAFF_SUCCESS',
    CREATE_STAFF_FAILED: 'CREATE_STAFF_FAILED',

    DELETE_STAFF_SUCCESS: 'DELETE_STAFF_SUCCESS',
    DELETE_STAFF_FAILED: 'DELETE_STAFF_FAILED',

    EDIT_STAFF_SUCCESS: 'EDIT_STAFF_SUCCESS',
    EDIT_STAFF_FAILED: 'EDIT_STAFF_FAILED',

    FETCH_ALL_STUDENT_SUCCESS: 'FETCH_ALL_STUDENT_SUCCESS',
    FETCH_ALL_STUDENT_FAILED: 'FETCH_ALL_STUDENT_FAILED',


    CREATE_STUDENT_SUCCESS: 'CREATE_STUDENT_SUCCESS',
    CREATE_STUDENT_FAILED: 'CREATE_STUDENT_FAILED',

    DELETE_STUDENT_SUCCESS: 'DELETE_STUDENT_SUCCESS',
    DELETE_STUDENT_FAILED: 'DELETE_STUDENT_FAILED',

    EDIT_STUDENT_SUCCESS: 'EDIT_STUDENT_SUCCESS',
    EDIT_STUDENT_FAILED: 'EDIT_STUDENT_FAILED',
    
    CREATE_HW_SUCCESS: 'CREATE_HW_SUCCESS',
    CREATE_HW_FAILED: 'CREATE_HW_FAILED',


    FETCH_ALL_HW_SUCCESS:'FETCH_ALL_HW_SUCCESS',
    FETCH_ALL_HW_FAILED: 'FETCH_ALL_HW_FAILED',


    FETCH_EDIT_HW_FAILED:'FETCH_EDIT_HW_FAILED',
    FETCH_EDIT_HW_SUCCESS:'FETCH_EDIT_HW_SUCCESS',
})

export default actionTypes;