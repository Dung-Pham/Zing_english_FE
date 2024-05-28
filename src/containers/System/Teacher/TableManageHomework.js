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
import ModalHomwork from './ModalHomwork';
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
// function handleEditorChange({ html, text }) {
//     console.log('handleEditorChange', html, text);
// }

class TableManageHomework extends Component {

    constructor(props) {
        super(props);
        this.state = {
            SelectClass:'',
            isOpenModalUser:false,
            isOpenModalEditUser:false,
            arrClass: [],
            ClassId: "",
            studentRedux:[],
            hwRedux:[],
            hw:[]
            
        }
    }
    async componentDidMount() {
        this.props. getALLHW();
        await this.getTeacherId();
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
            let res = await getClassById(teacherId);
            if (res && res.errCode == 0) {
                this.setState({
                    arrClass: res.data
                })
            }
            this.setState({
                ClassId: this.state.arrClass[0].ClassId,
                hwRedux : this.props.hw.filter(item => item.ClassId== this.state.arrClass[0].ClassId),//classCurent.ClassId),
                SelectClass: this.state.arrClass[0].ClassId
            })
            console.log(this.props.students);
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
        if (prevProps.hw!== this.props.hw) {
            this.setState({
                hw: this.props.hw,
            })
            this.setState({
                
                hwRedux : this.props.hw.filter(item => item.ClassId== this.state.SelectClass)//classCurent.ClassId)
            })
        }
    }


    handleEditHW = async (user) => {
        console.log("var", user);
            this.setState({
                isOpenModalEditUser: true,
                ClassId: user.ClassId,
                HomeworkName: user.HomeworkName,
                Description: user.Description,	
                HomeworkId:user.HomeworkId,
                action: CRUD_ACTIONS.EDIT,
                
    
            })
    }
    
	handleaddNewHW = () => {
        this.setState({
			action: CRUD_ACTIONS.CREATE,
            isOpenModalUser: true,

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


	handleSaveHW = (data) => {
		let action  = data.action;
		if (action === CRUD_ACTIONS.CREATE) {
			this.props.createNewHWRedux({
                HomeworkName: data.HomeworkName,
                Description: data.Description,
				ClassId: data.ClassId			
			})
		}
		if (action === CRUD_ACTIONS.EDIT) {
			this.props.fetchEditHWStart({
				
				HomeworkName: data.HomeworkName,
                Description: data.Description,
				ClassId: data.ClassId	,
                HomeworkId: data.HomeworkId
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
                
                //this.props.fetchDeleteStudentStart(user.StudentId);
              }
           
          })
    }

    handleChangeInput = (e, id) => {
        let copyState = { ...this.state }
        copyState[id] = e.target.value
        this.setState({
            ...copyState
        })
        //console.log('selected class',e.target.value)
        this.setState({
            ClassId: e.target.value,
            studentsClass : this.props.students.filter(item => item.ClassId==e.target.value)//classCurent.ClassId)
        })
    }



    render() {
        let  arrClass = this.state. arrClass;
        let hw= this.state.hwRedux;
        //console.log("check class", this.state.SelectClass);
        return (
            <React.Fragment>
            <div className='manage-class-containner'>
                <div className='m-s-title'>
                    Quản lí lớp học
                </div>
                {this.state.isOpenModalUser &&
				<ModalHomwork
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    addNewHW={this.handleSaveHW}
					user={this.state}
                />}
				{this.state.isOpenModalEditUser &&
				<ModalHomwork
                    isOpen={this.state.isOpenModalEditUser}
                    toggleFromParent={this.toggleEditUserModal}
                    addNewHW={this.handleSaveHW}
					user={this.state}
					
                />}
                <div>
                    Chọn lớp học đang phụ trách :<br></br>
                <select id="options" value={this.state.SelectClass} onChange={(e) => { this.handleChangeInput(e, 'SelectClass') }}>
                    {arrClass && arrClass.length> 0 &&
                        arrClass.map((item, index)=>{
                            return(
                                <option value={item.ClassId}>
                                    {item.ClassName}
                                </option>
                            )
                        })
                    }
                    
                
                </select>
                </div>
                <div className='mx-1 text-center'>
                    		<button
                        	className='btn btn-primary px-3'
                        	onClick={() => this.handleaddNewHW()}>
                        		<i className="fas fa-user-plus add-user"></i>
                       			 Thêm BTVN
                    		</button>
                		</div>
                <table id='TableManageClass' className='container'>

                    <tr>
                        <th>Tên BTVN</th>
                        
                        <th>Mô tả</th>
                       
                        <th>Thao Tác</th>
                    </tr>
                    { hw &&  hw.length > 0 &&
                         hw.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.HomeworkName}</td>
                                   
                                    <td>{item.Description}</td>
                                    <td>
                                        <button className='btn-edit'
                                            onClick={() => this.handleEditHW(item)}>
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
       hw: state.admin.hw
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createNewHWRedux: (data) => dispatch(actions.createNewHWRedux(data)),
		getALLHW: () => dispatch(actions.getALLHW()),
		fetchEditHWStart: (data) => dispatch(actions.fetchEditHWStart(data)),
        //fetchDeleteStudentStart: (id) => dispatch(actions.fetchDeleteStudentStart(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageHomework);
