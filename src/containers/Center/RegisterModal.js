import React, { Component } from 'react';
import { connect } from "react-redux";
import { Modal } from 'reactstrap';
import './RegisterModal.scss'
import _ from 'lodash';
import DatePicker from '../../components/Input/DatePicker';
import Select from 'react-select';
import * as actions from '../../store/actions'
import { createRegisterCourse } from '../../services/courseService';
import { toast } from 'react-toastify'
import moment from 'moment/moment';

class RegisterModel extends Component {

    constructor(props) {
        super(props)
        this.state = {         
            StudentName: '',
            StudentBirth:'',
            PhoneNumber: '',
            Email: '',
            Address: '',
            CourseName:'',
            CourseId:'',
            CourseFee:''
            
        }
    }

    async componentDidMount() {
        this.setState({
            CourseName: this.props.CourseName,
            CourseId: this.props.CourseId,
            CourseFee: this.props.CourseFee
        })
    }


    handleOnChangeInput = (e, id) => {
        let value = e.target.value
        let copyState = { ...this.state }
        copyState[id] = value
        this.setState({
            ...copyState
        })
    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            StudentBirth: date[0]
        })
    }

    handleChangeSelectedGender = (selectedGender) => {
        this.setState({
            selectedGender
        })
    }

    handleConfirmRegisterModel = async () => {
        let res = await createRegisterCourse({
            CourseId: this.state.CourseId,
            CourseName: this.state.CourseName,
            StudentName: this.state.StudentName,
            PhoneNumber: this.state.PhoneNumber,
            Email: this.state.Email,
            Address: this.state.Address,
            StudentBirth: this.state.StudentBirth,
            CourseFee: this.state.CourseFee
            
        })
        if (res && res.errCode === 0) {
            toast.success('Đăng kí thành công! Chúng tôi sẽ liên hệ với bạn sớm .')
            this.props.closeRegisterModel()
        } else {
            toast.error('Đang kí khóa học thất bại!')
        }
    }

    render() {
        let { isOpenRegisterModel, closeRegisterModel } = this.props
        console.log(this.state.selectedGender);
        return (
            <div>
                <Modal
                    isOpen={isOpenRegisterModel} className={'RegisterModel-container'}
                    centered={true} size={'lg'}
                >
                    <div className='RegisterModel-content'>
                        <div className='RegisterModel-header'>
                            <span className='left'>
                               Xác nhận đăng kí
                            </span>
                            <span className='right'
                                onClick={closeRegisterModel}
                            ><i className='fas fa-times'></i></span>
                        </div>
                        <div className='RegisterModel-body'>
                            <div className='row'>

                                <div className='col-6 form-group'>
                                    <label>
                                      Tên khóa học
                                    </label>
                                    <input className='form-control'
                                        value={this.state.CourseName}
                                        onChange={(e) => this.handleOnChangeInput(e, 'CourseName')}
                                    />
                                </div>

                                <div className='col-6 form-group'>
                                    <label>
                                      Học phí
                                    </label>
                                    <input className='form-control'
                                        value={this.state.CourseFee}
                                        onChange={(e) => this.handleOnChangeInput(e, 'CourseFee')}
                                    />
                                </div>

                                

                                <div className='col-6 form-group'>
                                    <label>
                                       Họ và Tên
                                    </label>
                                    <input className='form-control'
                                        value={this.state.StudentName}
                                        onChange={(e) => this.handleOnChangeInput(e, 'StudentName')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>
                                       Ngày sinh
                                    </label>
                                   
                                    <input className="form-control" type="date" id="birthday" name="birthday"
								            value={this.state.StudentBirth}
								            onChange={(e) => this.handleOnChangeInput(e, 'StudentBirth')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>
                                        Số điện thoại
                                    </label>
                                    <input className='form-control'
                                        value={this.state.PhoneNumber}
                                        onChange={(e) => this.handleOnChangeInput(e, 'PhoneNumber')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>
                                       Email
                                    </label>
                                    <input className='form-control'
                                        value={this.state.Email}
                                        onChange={(e) => this.handleOnChangeInput(e, 'Email')}
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>
                                        Địa chỉ
                                    </label>
                                    <input className='form-control'
                                        value={this.state.Address}
                                        onChange={(e) => this.handleOnChangeInput(e, 'Address')}
                                    />
                                </div>
                            
                                
                                {/* <div className='col-6 form-group'>
                                    <label>
                                        Giới tính
                                    </label>
                                    <Select
                                        defaultValue={this.state.genderArr[0]}
                                        value={this.state.selectedGender}
                                        onChange={this.handleChangeSelectedGender}
                                        options={this.state.genderArr}
                                    />
                                </div> */}
                            </div>
                        </div>
                        <div className='RegisterModel-footer'>
                            <button className='btn-booking-confirm'
                                onClick={() => this.handleConfirmRegisterModel()}
                            >
                                Xác nhận
                            </button>
                            <button className='btn-booking-cancel'
                                onClick={closeRegisterModel}
                            >
                               Hủy
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
    
       
    };
};

const mapDispatchToProps = dispatch => {
    return {
    
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModel);
