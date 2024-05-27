import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageClass.scss'
import * as actions from "../../../store/actions";
import _ from 'lodash';
import TableManageClass from './TableManageClass';

class ManageClass extends Component {
    constructor(props) {
        super(props)

        this.state = {         
            ClassName:"",
            TeacherId:"",
            CourseId:"",
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

    render() {
        
        let {
            ClassName,
            TeacherId,
            CourseId
           
		} = this.state;
        console.log("check");
        return (
            <div className='manage-class-containner'>
                <div className='m-s-title'>
                    Quản lí lớp học
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label>
                                Tên Lớp 
                            </label>
                            <input className="form-control" type="text"
									value={ClassName}
									onChange={(e) => this.onChangeInput(e, 'ClassName')}
								/>
                        </div>
                        
                        <div className='col-6 form-group'>
                            <label>
                             TeacherId
                            </label>
                            <input className="form-control" type="text"
									value={TeacherId}
									onChange={(e) => this.onChangeInput(e, 'TeacherId')}
								/>
                        </div>
                        <div className='col-6 form-group'>
                            <label>
                                CourseId
                            </label>
                            <input className="form-control" type="text"
									value={CourseId}
									onChange={(e) => this.onChangeInput(e, 'CourseId')}
								/>
                        </div>
                        
                        <div className='col-12'>
                            <button
                                className='btn btn-primary btn-save-class'
    
                            >
                                Lưu thông tin
                            </button>

                        </div>
                        <TableManageClass/>
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
         getALLTeachers: () => dispatch(actions.getALLTeachers()),
       };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageClass);
