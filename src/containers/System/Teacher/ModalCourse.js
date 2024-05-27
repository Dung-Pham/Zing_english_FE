import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../../utils/emitter'
import _ from 'lodash'
import { CRUD_ACTIONS } from "../../../utils";
class ModalCourse extends Component {

    constructor(props) {
        super(props)
        this.state = {
			CourseName:'',
            Description:'',
            CourseFee:'',
            action:"",
        }
       
        this.listenToEmitter()
    }

    listenToEmitter = () => {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                CourseName:'',
                Description:'',
                CourseFee:'',
                action:'',
                CourseId:'',
            })
        })
    }
    

    componentDidMount() {
        console.log("mounted"); 
        let user = this.props.user;
        
        if (user ) {
            this.setState({
                CourseName:user.CourseName,
                Description:user.Description,
                CourseFee:user.CourseFee,
                CourseId:user.CourseId,
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
        let arrInput = ['CourseName',  'Description','CourseFee']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false
                alert(`Missing required parameter: ${arrInput[i]}`)
                break
            }
        }
        return isValid
    }

    handleAddNewCourse = () => {
        let isValid = this.checkValidInput()
         if(isValid === true) {
            console.log("stsw", this.state);
            this.props.addNewCourse(
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
                <ModalHeader toggle={() => this.toggle()}>Create a new course</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>CourseName</label>
                            <input
                                type='text'
                                onChange={(e) => { this.handleChangeInput(e, 'CourseName') }}
                                value={this.state.CourseName}
                            />
                       </div>
                        <div className='input-container'>
                            <label>Description</label>
                            <input
                                type='text'
                                onChange={(e) => { this.handleChangeInput(e, 'Description') }}
                                value={this.state.Description}
                            />
                        </div>
                          
                        
                        <div className='input-container'>
                            <label>
									Học phí
							</label>
							<input className="form-control" type="text"
									value={this.state.CourseFee}
									onChange={(e) => this.handleChangeInput(e, 'CourseFee')}
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
                        onClick={() => this.handleAddNewCourse()}
                    >
                        {this.state.action === CRUD_ACTIONS.EDIT ?
										"Lưu thay đổi" :
										"Lưu khóa học"
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalCourse);
