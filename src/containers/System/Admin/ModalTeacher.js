import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../../utils/emitter'
import _ from 'lodash'
import { CRUD_ACTIONS } from "../../../utils";
class ModalTeacher extends Component {

    constructor(props) {
        super(props)
        this.state = {
			UserName: "",
			Password: "",
            TeacherId:"",
			TeacherName: "",
			TeacherBirth: "",
			Address: "",
			Email:"",
			PhoneNumber: "",
            action:"",
        }
       
        this.listenToEmitter()
    }

    listenToEmitter = () => {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
            UserName: "",
			Password: "",
            TeacherId:"",
			TeacherName: "",
			TeacherBirth: "",
			Address: "",
			Email:"",
			PhoneNumber: "",
            action:''
            })
        })
    }
    

    componentDidMount() {
        console.log("mounted"); 
        let user = this.props.user;
        
        if (user ) {// isOpenModalEditUser: true,
            
            this.setState({
                UserName: user.UserName,
				Password: user.Password,
                TeacherId: user.TeacherId,
				TeacherName: user.TeacherName,
				TeacherBirth: user.TeacherBirth,
				Address: user.Address,
				Email: user.Email,
				PhoneNumber: user.PhoneNumber,
                action: user.action
            })
        }
        console.log('did mount: ', this.props.user)
    }

    toggle = () => {
        this.props.toggleFromParent()
    }

    handleChangeInput = (e, id) => {
        let copyState = { ...this.state }
        copyState[id] = e.target.value
        this.setState({
            ...copyState
        })
    }

    checkValidInput = () => {
        let isValid = true
        let arrInput = ['UserName', 'Password', 'TeacherName', 'TeacherBirth', 'Address', 'Email', 'PhoneNumber']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false
                alert(`Missing required parameter: ${arrInput[i]}`)
                break
            }
        }
        return isValid
    }

    handleAddNewUser = () => {
        let isValid = this.checkValidInput()
         if(isValid === true) {
            console.log("stsw", this.state);
            this.props.addNewUser(
                this.state
            )
         }
    }

    render() {
        console.log("check", this.props.user)
        return (

            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                size='lg'
                className='modal-user-container'
            >
                <ModalHeader toggle={() => this.toggle()}>Lưu giáo viên</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>UserName</label>
                            <input
                                type='text'
                                onChange={(e) => { this.handleChangeInput(e, 'UserName') }}
                                value={this.state.UserName}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input
                                type='password'
                                onChange={(e) => { this.handleChangeInput(e, 'Password') }}
                                value={this.state.Password}
                            />
                        </div>
                        <div className='input-container'>
                            <label>TeacherName</label>
                            <input
                                type='text'
                                onChange={(e) => { this.handleChangeInput(e, 'TeacherName') }}
                                value={this.state.TeacherName}
                            />
                        </div>
                        <div className='input-container'>
                            <label>TeacherBirth</label>
                            <input 
                               type="date"
								value={this.state.TeacherBirth}
								onChange={(e) => {this.handleChangeInput(e, 'TeacherBirth')}}/>
            
                        </div>
                        <div className='input-container max-width-input'>
                            <label>Address</label>
                            <input
                                type='text'
                                value={this.state.Address}
                                onChange={(e) => { this.handleChangeInput(e, 'Address') }}
                               
                            />
                        </div>
                        
                        
                        <div className='input-container'>
                            <label>
									Email
							</label>
							<input className="form-control" type="text"
									value={this.state.Email}
									onChange={(e) => this.handleChangeInput(e, 'Email')}
							/>
                        </div>
                        <div className='input-container'>
                            <label>
									số điện thoại
							</label>
							<input className="form-control" type="text"
									value={this.state.PhoneNumber}
									onChange={(e) => this.handleChangeInput(e, 'PhoneNumber')}
							/>
                        </div>
                       
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button

                        className={
										this.state.action === CRUD_ACTIONS.EDIT ?
											"btn btn-warning" : "btn btn-primary"
									}
                        onClick={() => this.handleAddNewUser()}
                    >
                        {this.state.action === CRUD_ACTIONS.EDIT ?
										"Lưu thay đổi" :
										"Lưu giáo viên"
									}
                    </button>{' '}
                    <Button
                        color="secondary"
                        className='px-3'
                        onClick={() => this.toggle()}
                    >
                        Close
                    </Button>
                </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalTeacher);
