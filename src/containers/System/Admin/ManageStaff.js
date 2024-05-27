import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageStaff.scss'
import Select from 'react-select';
import * as actions from "../../../store/actions";
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import _ from 'lodash';
import { toast } from 'react-toastify'
import TableManageStaff from '../Admin/TableManageStaff';
import ModalStaff from "./ModalStaff";
import { CRUD_ACTIONS } from "../../../utils";
import { getUserFromStaff } from '../../../services/staffService';
class ManageStaff extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isOpenModalStaff: false,
            isOpenModalEditStaff: false,
            UserName:"",
            Password:"",
            StaffName:"",
            DateBirth:"",
            Address:"",
            Email:"",
            PhoneNumber:"",
            action:'',
        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {

    }

  
 
    onChangeInput = (e, id) => {

		let copyState = { ...this.state }
		copyState[id] = e.target.value
		this.setState({
			...copyState
		})
	}


    handleAddNewStaff = () => {
        this.setState({
            action: CRUD_ACTIONS.CREATE,
            isOpenModalStaff: true
            
        })
        //console.log(this.state.action);
    }
    handleEditNewUser = () => {
        this.setState({
            isOpenModalEditStaff: true
        })
    }

    toggleStaffModal = () => {
        this.setState({
            isOpenModalStaff: !this.state.isOpenModalStaff
        })
    }
	toggleEditSTaffModal = () => {
        this.setState({
            isOpenModalEditStaff: !this.state.isOpenModalEditStaff
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

    handleEditStaffFromParent = async (user) => {
        console.log(user.UserId);
		let tk= await getUserFromStaff(user.UserId);
        console.log("ch",tk)
		if(tk){
		this.setState({
			isOpenModalEditStaff: true,
			UserName: tk.data.UserName,
			TeacherId: user.TeacherId,
			TeacherName: user.TeacherName,
			Password: tk.data.Password,
			TeacherBirth: user.TeacherBirth,
			Address: user.Address,
			Email: user.Email,
			PhoneNumber: user.PhoneNumber,
			action: CRUD_ACTIONS.EDIT,

		})}
	}
    render() {
        // console.log('check state: ', this.state)
        // console.log('check props: ', this.props)
        let {
            StaffName,
            DateBirth,
            Address,
            Email,
            PhoneNumber,
            Password,
            UserName
		} = this.state;
        return (
            <div className='manage-staff-containner'>
                <div className='m-s-title'>
                   
                    Quản lí Nhân Viên
                </div>
                {this.state.isOpenModalStaff &&
				<ModalStaff
                    isOpen={this.state.isOpenModalStaff}
                    toggleFromParent={this.toggleStaffModal}
                    addNewUser={this.handleSaveUser}
                    user={this.state}
                />}
				{this.state.isOpenModalEditStaff &&
				<ModalStaff
                    isOpen={this.state.isOpenModalEditStaff}
                    toggleFromParent={this.toggleEditSTaffModal}
                    addNewUser={this.handleSaveUser}
					user={this.state}
					
                />}
                <div className='container'>
                    <div className='row'>
                    <   div className='mx-1 text-center'>
                    		<button
                        	className='btn btn-primary px-3'
                        	onClick={() => this.handleAddNewStaff()}>
                        		<i className="fas fa-user-plus add-user"></i>
                       			 Thêm nhân viên
                    		</button>
                		</div>
                        <TableManageStaff
                            handleEditStaffFromParent={this.handleEditStaffFromParent}
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
        isLoggedIn: state.user.isLoggedIn,
        
    };
};

const mapDispatchToProps = dispatch => {
    return {
       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageStaff);
