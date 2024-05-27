export const adminMenu = [
    { //Quản lý người dùng
        name: 'Quản lí người dùng'
        , menus: [
            {
                name:"Quản lí học sinh", 
                link: '/system/user-redux'
            },
            {
                name:"Quản lí giáo viên",
                link: '/system/manage-teacher'
            },

            { 
                name: "Quản lí nhân viên",
                link: '/teacher/manage-staff'
            },
        ]
    },

    { //Quản lý khóa học
        name: 'Quản lý khóa học',
        menus: [
            {
                name: 'Quản lý khóa học',
                link:  '/teacher/manage-course'
            }
        ]
    },


];

export const teacherMenu = [
    
    {
        name:" Quản lí lớp học",
        menus:[
            { 
                name: "Quản lí Lớp học",
                link: '/teacher/manage-class'
            },
            {
                name:"Quản lí hs",
                link:'/teacher/manage-class-student'
            }
        ]
    }
];