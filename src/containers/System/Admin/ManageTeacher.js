import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageTeacher.scss'
import { CRUD_ACTIONS } from "../../../utils";
import * as actions from "../../../store/actions";
import moment from 'moment';
import _ from 'lodash';
import { toast } from 'react-toastify'
import TableManageTeacher from '../Admin/TableManageTeacher';
import ModalTeacher from "./ModalTeacher";
import { getUserFromTeacher } from '../../../services/teacherService';

class ManageTeacher extends Component {
    constructor(props) {
        super(props)
        this.state = {   
            UserName:"",
            Password:"",
            TeacherId:"",
            TeacherName:"",
            TeacherBirth:"",
            Address:"",
            Email:"",
            PhoneNumber:"",
            action:CRUD_ACTIONS.CREATE,
			
        }
    }

    componentDidMount() {

    }
    componentDidUpdate(prevProps, prevState, snapshot) {	
		if (prevProps.teachers !== this.props.teachers) {
			this.setState({
                isOpenModalEditUser:false,
                isOpenModalUser:false,
				UserName: "",
				Password: "",
				TeacherId:"",
				TeacherName: "",
				TeacherBirth: "",
				Address: "",
				Email: "",
				action: CRUD_ACTIONS.CREATE,
				//previewImgUrl: ""
			})
		}
	}
	handleAddNewTeacher = () => {
        this.setState({
            action: CRUD_ACTIONS.CREATE,
            isOpenModalUser: true
            
        })
        //console.log(this.state.action);
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
		console.log("ste", data);
		// let isValid = this.checkValidInput()
		// if (isValid === false) return
		let action  = data.action;
		if (action === CRUD_ACTIONS.CREATE) {
			this.props.createNewTeacherRedux({
				UserName: data.UserName,
				Password: data.Password,
				TeacherId:data.TeacherId,
				TeacherName: data.TeacherName,
				TeacherBirth: data.TeacherBirth,
				Address: data.Address,
				Email: data.Email,
				PhoneNumber: data.PhoneNumber,			
			})
		}
		if (action === CRUD_ACTIONS.EDIT) {
			this.props.fetchEditTeacherStart({
				UserName: data.UserName,
				Password: data.Password,
				TeacherId:data.TeacherId,
				TeacherName: data.TeacherName,
				TeacherBirth: data.TeacherBirth,
				Address: data.Address,
				Email: data.Email,
				PhoneNumber: data.PhoneNumber,
			})
		}
	}

 
    onChangeInput = (e, id) => {

		let copyState = { ...this.state }
		copyState[id] = e.target.value
		this.setState({
			...copyState
		})
	}
    handleEditTeacherFromParent = async (user) => {
		let tk= await getUserFromTeacher(user.UserId);
		console.log("edit",tk);
		this.setState({
			isOpenModalEditUser: true,
			UserName: tk.data.UserName,
			TeacherId: user.TeacherId,
			TeacherName: user.TeacherName,
			Password: tk.data.Password,
			TeacherBirth: user.TeacherBirth,
			Address: user.Address,
			Email: user.Email,
			PhoneNumber: user.PhoneNumber,
			action: CRUD_ACTIONS.EDIT,
			

		})
	}

    render() {
		//console.log
        return (
            <div className='manage-teacher-containner'>
                <div className='m-s-title'>
                    Quản lí Giáo Viên
                </div>
                {this.state.isOpenModalUser &&
				<ModalTeacher
                    isOpen={this.state.isOpenModalUser}
                    toggleFromParent={this.toggleUserModal}
                    addNewUser={this.handleSaveUser}
                    user={this.state}
                />}
				{this.state.isOpenModalEditUser &&
				<ModalTeacher
                    isOpen={this.state.isOpenModalEditUser}
                    toggleFromParent={this.toggleEditUserModal}
                    addNewUser={this.handleSaveUser}
					user={this.state}
					
                />}
                <div className='container'>
                    <div className='row'>
                        <div className='mx-1 text-center'>
                    		<button
                        	className='btn btn-primary px-3'
                        	onClick={() => this.handleAddNewTeacher()}>
                        		<i className="fas fa-user-plus add-user"></i>
                       			 Add new teacher
                    		</button>
                		</div>
                      
                        <TableManageTeacher
                            handleEditTeacherFromParent={this.handleEditTeacherFromParent}
                            action={this.state.action}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        teachers: state.admin.teachers,
        isLoggedIn: state.user.isLoggedIn,
        
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getALLTeachers: () => dispatch(actions.getALLTeachers()),
        createNewTeacherRedux: (data) => dispatch(actions.createNewTeacherRedux(data)),
		fetchEditTeacherStart: (data) => dispatch(actions.fetchEditTeacherStart(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageTeacher);
