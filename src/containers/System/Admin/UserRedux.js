import React, { Component } from "react";
import { connect } from "react-redux";
import { CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import TableManageStudent from "./TableManageStudent";
import { getUserFromStudent } from '../../../services/userService';
import ModalStudent from "./ModalStudent";
class UserRedux extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isOpenModalUser: false,
			isOpenModalEditUser: false,
			UserName: "",
			Password: "",
			StudentId:"",
			StudentName: "",
			StudentBirth: "",
			Address: "",
			ParentName: "",
			Email:"",
			PhoneNumber: "",
			Role: "",
			ClassId:"",
			action: "",
		};
	}

	async componentDidMount() {
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		
		if (prevProps.users !== this.props.users) {
			this.setState({
				UserName: "",
				Password: "",
				StudentId:"",
				StudentName: "",
				StudentBirth: "",
				Address: "",
				ParentName: "",
				Email: "",
				ClassId:"",
				action: CRUD_ACTIONS.CREATE,
				//previewImgUrl: ""
			})
		}
	}

///modal

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

	handleChangeInput = (e, id) => {

		let copyState = { ...this.state }
		copyState[id] = e.target.value
		this.setState({
			...copyState
		})
	}

	checkValidInput = () => {
		let arrCheck = ['UserName', 'Password', 'StudentName',
			'StudentBirth', 'Address', 'ParentName']
		let isValid = true;

		for (let i = 0; i < arrCheck.length; i++) {
			if (!this.state[arrCheck[i]]) {
				isValid = false
				alert('Missing ' + arrCheck[i])
				break;
			}
		}

		return isValid
	}

	handleEditStudentFromParent = async (user) => {
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

	render() {
		let {
			UserName, Password, StudentName, StudentBirth, Address,
			ParentName,Email, PhoneNumber, Role,ClassId
		} = this.state;

		return (
			<div className="user-redux-container">
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
				
				<div className="user-redux-body mt-4">
					<div className="container">
						 <div className='mx-1 text-center'>
                    		<button
                        	className='btn btn-primary px-3'
                        	onClick={() => this.handleAddNewUser()}>
                        		<i className="fas fa-user-plus add-user"></i>
                       			 Add new user
                    		</button>
                		</div>
						<div className="row">
							
							<div className="col-12 mb-5">
								<TableManageStudent
									handleEditStudentFromParent={this.handleEditStudentFromParent}
									action={this.state.action}
								/>
							</div>
						</div>
					</div>
				</div>

				{this.state.isOpen && (
					<Lightbox
						mainSrc={this.state.previewImgUrl}
						onCloseRequest={() => this.setState({ isOpen: false })}
					/>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		users: state.admin.users,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		createNewUserRedux: (data) => dispatch(actions.createNewUserRedux(data)),
		fetchAllStudentStart: () => dispatch(actions.fetchAllStudentStart()),
		fetchEditStudentStart: (data) => dispatch(actions.fetchEditStudentStart(data)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
