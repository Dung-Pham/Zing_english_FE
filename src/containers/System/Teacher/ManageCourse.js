import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageCourse.scss';
import * as actions from "../../../store/actions";
import _ from 'lodash';
import { toast } from 'react-toastify'
import { CRUD_ACTIONS } from "../../../utils";
import TableManageCourse from '../Admin/TableManageCourse';
import ModalCourse from './ModalCourse';
import {createCourse, editCourse} from '../../../services/courseService';
class ManageCourse extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isOpenModalEditCourse:false,
            isOpenModalCourse: false,
            CourseName:"",
            Description:"",
            CourseFee:'',
            CourseId:'',
            courses: [],
           
        }
    }

    componentDidMount() {
    
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.courses !== this.props.courses) {
            this.setState({
                CourseName:"",
                Description:"",
                CourseFee:'',
                CourseId:'',
                courses: this.props.courses,
            })
        }

    }

    handleClickBtnSaveCourse = async () => {
        
    }
    
    onChangeInput = (e, id) => {

		let copyState = { ...this.state }
		copyState[id] = e.target.value
		this.setState({
			...copyState
		})
	}


    handleAddNewCourse = () => {
        this.setState({
            action: CRUD_ACTIONS.CREATE,
            isOpenModalCourse: true
            
        })
    }
    handleSaveCourse =  ( data) => {
		let action  = data.action;
		if (action === CRUD_ACTIONS.CREATE) {
			this.props.createNewCourseRedux({
				CourseName:data.CourseName,
                Description:data.Description,
                
                CourseFee:data.CourseFee	
			})

		}
		if (action === CRUD_ACTIONS.EDIT) {
			this.props.fetchEditCourseStart({
				CourseName:data.CourseName,
                Description:data.Description,
                CourseFee:data.CourseFee,
                CourseId: data.CourseId
			})
           
		}
	}

    handleEditCourseFromParent = async (user) => {
		this.setState({
			isOpenModalEditCourse: true,
            CourseName:user.CourseName,
            Description:user.Description,
            CourseFee:user.CourseFee,
            CourseId: user.CourseId,
			action: CRUD_ACTIONS.EDIT,
			

		})
	}
    toggleCourseModal = () => {
        this.setState({
            isOpenModalCourse: !this.state.isOpenModalCourse
        })
    }
	toggleEditCourseModal = () => {
        this.setState({
            isOpenModalEditCourse: !this.state.isOpenModalEditCourse
        })
    }
    render() {
        return (
            <div className='manage-course-containner'>
                <div className='m-s-title'>
                    Quản lí các khóa Học
                </div>
                {this.state.isOpenModalCourse &&
				<ModalCourse
                    isOpen={this.state.isOpenModalCourse}
                    toggleFromParent={this.toggleCourseModal}
                    addNewCourse={this.handleSaveCourse}
                    user={this.state}
                />}
				{this.state.isOpenModalEditCourse &&
				<ModalCourse
                    isOpen={this.state.isOpenModalEditCourse}
                    toggleFromParent={this.toggleEditCourseModal}
                    addNewCourse={this.handleSaveCourse}
					user={this.state}
					
                />}
                <div className='container'>
                    <div className='row'>
                    <div className='mx-1 text-center'>
                    		<button
                        	className='btn btn-primary px-3'
                        	onClick={() => this.handleAddNewCourse()}>
                        		<i className="fas fa-user-plus add-user"></i>
                       			 Thêm khóa học
                    		</button>
                		</div>
                        <TableManageCourse
                             handleEditCourseFromParent={this.handleEditCourseFromParent}
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
        CourseName:"",
        isLoggedIn: state.user.isLoggedIn,
      
    };
};

const mapDispatchToProps = dispatch => {
    return {
        createNewCourseRedux: (data) => dispatch(actions.createNewCourseRedux(data)),
		fetchEditCourseStart: (data) => dispatch(actions.fetchEditCourseStart(data)),
       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageCourse);
