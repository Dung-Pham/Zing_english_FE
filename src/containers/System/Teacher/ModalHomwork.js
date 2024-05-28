import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emitter } from '../../../utils/emitter'
import _ from 'lodash'
import { CRUD_ACTIONS } from "../../../utils";
class ModalHomework extends Component {

    constructor(props) {
        super(props)
        this.state = {
			HomeworkName:'',
            Description:'',
            ClassId:'',
            action:"",
            HomeworkId:''
        }
       
        this.listenToEmitter()
    }

    listenToEmitter = () => {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                HomeworkName:'',
                Description:'',
                ClassId:'',
                action:'',
                HomeworkId:''
               
            })
        })
    }
    

    componentDidMount() {
        
        let user = this.props.user; 
        console.log("mounted", user);   
        if (user ) {
            if( user.action== CRUD_ACTIONS.CREATE){
            this.setState({
                HomeworkName:"",
                Description:"",
                ClassId: user.ClassId,
                HomeworkId:  "",
                action: user.action
            })
            }
            else {
                this.setState({
                    HomeworkName:user.HomeworkName,
                    Description:user.Description,
                    ClassId:user.ClassId,
                    HomeworkId:  user.HomeworkId,
                    action: user.action
                })
            }
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
        let arrInput = ['HomeworkName',  'Description','ClassId']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false
                alert(`Missing required parameter: ${arrInput[i]}`)
                break
            }
        }
        return isValid
    }

    handleAddNewHW = () => {
        let isValid = this.checkValidInput()
         if(isValid === true) {
            console.log("stsw", this.state);
            this.props.addNewHW(
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
                <ModalHeader toggle={() => this.toggle()}>Create a new homework</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Tên BTVN</label>
                            <input
                                type='text'
                                onChange={(e) => { this.handleChangeInput(e, 'HomeworkName') }}
                                value={this.state.HomeworkName}
                            />
                       </div>
                        <div className='input-container'>
                            <label>Mô tả</label>
                            <input
                                type='text'
                                onChange={(e) => { this.handleChangeInput(e, 'Description') }}
                                value={this.state.Description}
                            />
                        </div>
                          
                        
                        <div className='input-container'>
                            <label>
									ClassId
							</label>
							<input className="form-control" type="text"
									value={this.state.ClassId}
									onChange={(e) => this.handleChangeInput(e, 'ClassId')}
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
                        onClick={() => this.handleAddNewHW()}
                    >
                        {this.state.action === CRUD_ACTIONS.EDIT ?
										"Lưu thay đổi" :
										"Lưu BTVN"
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalHomework);
