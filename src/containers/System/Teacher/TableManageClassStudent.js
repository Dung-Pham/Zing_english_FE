import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import './TableManageClass.scss'
import Swal from 'sweetalert2';
import MarkdownIt from 'markdown-it';
import { CRUD_ACTIONS } from '../../../utils';
import 'react-markdown-editor-lite/lib/index.css';
import { getClassById } from '../../../services/userService';
import { getTeacherByUserId } from '../../../services/teacherService';
import { getStudentByClassId } from '../../../services/studentService';
import { getUserFromStudent } from '../../../services/userService';
import ModalStudent from '../Admin/ModalStudent';
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}

class TableManageClassStudent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpenModalUser:false,
            isOpenModalEditUser:false,
            arrClass: [],
            TeacherName:"",
            studentsClass:[],
            UserName: "",
            Password: "",
            StudentId:"",
            StudentName:"",
            StudentBirth: "",
            Address: "",
            ParentName: "",
            Email:"",
            PhoneNumber:"",
            ClassId: "",
            studentRedux:[]
            
        }
    }
    async componentDidMount() {
        //await this.getAllClassFromReact();
        
        this.props. fetchAllStudentStart();
        await this.getTeacherId();
    }
 

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.students !== this.props.students) {
            this.setState({
                studentRedux: this.props.students,
            })
        }
    }
    getTeacherId= async ()=>{
        let { userInfo } = this.props
        //console.log(userInfo);
        //if( userInfo[0].Role=="Teacher")
        {
            let userId= userInfo[0].UserId;
            //let userId= 3;
            let teacher= await getTeacherByUserId(userId);
            let teacherId= teacher.data.TeacherId;
            this.state.TeacherName= teacher.data.TeacherName;
            //let teacherId= 1;
            let res = await getClassById(teacherId);
            console.log(teacherId);
            if (res && res.errCode == 0) {
                this.setState({
                    arrClass: res.data
                })
            }
            let classCurent= this.state.arrClass[0];
            let res2= await getStudentByClassId(classCurent.ClassId);
            this.setState({
                ClassId: classCurent.ClassId,
                studentsClass : this.props.students.filter(item => item.ClassId==classCurent.ClassId)
            })
            console.log(this.props.students);
            // if ( res2 && res2.errCode==0)
            //     {
            //         this.setState({
            //             studentsClass: res2.data,
            //             ClassId: classCurent.ClassId
            //         })
            //     }



        }
    }
    getAllClassFromReact = async () => {
        let res = await getClassById('ALL');
        //console.log(res);
        if (res && res.errCode == 0) {
            this.setState({
                arrClass: res.data
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.class!== this.props.class) {
            this.setState({
                classRedux: this.props.class,
            })
        }
    }


    handleEditUser = async (user) => {
            // handleEditNewUser();
            let tk= await getUserFromStudent(user.UserId);
            console.log(tk);
            this.setState({
                isOpenModalEditUser: true,
                UserName: tk.data.UserName,
                StudentId: user.StudentId,
                StudentName: user.StudentName,
                Password: tk.data.Password,
                StudentBirth: user.StudentBirth,
                Address: user.Address,
                ParentName: user.ParentName,
                Email: user.Email,
                PhoneNumber: user.PhoneNumber,
                ClassId: user.ClassId,
                action: CRUD_ACTIONS.EDIT,
                
    
            })
    }
    
	handleAddNewUser = () => {
        this.setState({
			action: CRUD_ACTIONS.CREATE,
            isOpenModalUser: true
        })
    }
	handleEditNewUser = () => {
        this.setState({
            isOpenModalEditUser: true
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
    }
	toggleEditUserModal = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser
        })
    }


	handleSaveUser = (data) => {
		let action  = data.action;
		if (action === CRUD_ACTIONS.CREATE) {
			this.props.createNewUserRedux({
				UserName: data.UserName,
				Password: data.Password,
				StudentId:data.StudentId,
				StudentName: data.StudentName,
				StudentBirth: data.StudentBirth,
				Address: data.Address,
				ParentName: data.ParentName,
				Email: data.Email,
				PhoneNumber: data.PhoneNumber,
				ClassId: data.ClassId
				
			})
		}
		if (action === CRUD_ACTIONS.EDIT) {
			this.props.fetchEditStudentStart({
				UserName: data.UserName,
				Password: data.Password,
				StudentId:data.StudentId,
				StudentName: data.StudentName,
				StudentBirth: data.StudentBirth,
				Address: data.Address,
				ParentName: data.ParentName,
				Email: data.Email,
				PhoneNumber: data.PhoneNumber,
				ClassId: data.ClassId
			})
		}
	}
    handleDeleteStudent = (user) => {
        Swal.fire({
            title: 'Bạn chắc chắn chứ?',
            text: "Bạn sẽ không thể khôi phục lại!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đúng, Xóa!',
            cancelButtonText:'Hủy',
          })
          .then((result )=>{
            if (result.isConfirmed) {
                //setIsLoadingWithBackdrop(true);
                
                this.props.fetchDeleteStudentStart(user.StudentId);
              }
           
          })
    }


    render() {
        let  arrClass = this.state. arrClass;
        let studentsClass= this.state.studentsClass;
        //console.log("check class", arrClass);
        return (
            <React.Fragment>
                 <div className='manage-class-containner'>
                <div className='m-s-title'>
                    Quản lí lớp học
                </div>
                {this.state.isOpenModalUser &&
				<ModalStudent
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    addNewUser={this.handleSaveUser}
					user={this.state}
                />}
				{this.state.isOpenModalEditUser &&
				<ModalStudent
                    isOpen={this.state.isOpenModalEditUser}
                    toggleFromParent={this.toggleEditUserModal}
                    addNewUser={this.handleSaveUser}
					user={this.state}
					
                />}
                <div className='mx-1 text-center'>
                    		<button
                        	className='btn btn-primary px-3'
                        	onClick={() => this.handleAddNewUser()}>
                        		<i className="fas fa-user-plus add-user"></i>
                       			 Thêm học sinh
                    		</button>
                		</div>
                <table id='TableManageClass' className='container'>

                    <tr>
                        <th>Họ và Tên</th>
                        
                        <th>Địa chỉ</th>
                        <th>Email</th>
                        
                        <th>Sđt phụ huynh</th>
                        <th>Thao Tác</th>
                    </tr>
                    { studentsClass &&  studentsClass.length > 0 &&
                         studentsClass.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.StudentName}</td>
                                   
                                    <td>{item.Address}</td>
                                    <td>{item.Email}</td>
                                    <td>{item.PhoneNumber}</td>
                                    {/* <td>
                                        <button className=' ml-5'
                                            onClick={() => this.handleEditUser(item)}>
                                               <a href="http://localhost:3000/teacher/manage-class-student">Xem lớp </a>
                                        </button>
                                        
                                    </td> */}
                                    <td>
                                        <button className='btn-edit'
                                            onClick={() => this.handleEditUser(item)}>
                                            <i className="far fa-edit"></i>
                                        </button>
                                        <button className='btn-delete'
                                            onClick={() => this.handleDeleteStudent(item)}>
                                            <i className="far fa-trash-alt"></i>
                                        </button>
                                        
                                    </td>
                                </tr>
                            )
                        })
                    }
                </table>
                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
       userInfo: state.user.userInfo,
       students: state.admin.students
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createNewUserRedux: (data) => dispatch(actions.createNewUserRedux(data)),
		fetchAllStudentStart: () => dispatch(actions.fetchAllStudentStart()),
		fetchEditStudentStart: (data) => dispatch(actions.fetchEditStudentStart(data)),
        fetchDeleteStudentStart: (id) => dispatch(actions.fetchDeleteStudentStart(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageClassStudent);
