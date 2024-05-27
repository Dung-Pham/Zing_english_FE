import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal } from 'reactstrap';

import './ConfirmModal.scss';
import * as actions from "../store/actions";
import { KeyCodeUtils } from "../utils";

class ConfirmModal extends Component {

    constructor(props) {
        super(props);
        this.acceptBtnRef = React.createRef();
    }

    initialState = {
    };

    state = {
        ...this.initialState
    };

    componentDidMount() {
        document.addEventListener('keydown', this.handlerKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handlerKeyDown);
    }

    handlerKeyDown = (event) => {
        const keyCode = event.which || event.keyCode;
        if (keyCode === KeyCodeUtils.ENTER) {
            if (!this.acceptBtnRef.current || this.acceptBtnRef.current.disabled) return;
            this.acceptBtnRef.current.click();
        }
    }

    onAcceptBtnClick = () => {
        const { contentOfConfirmModal } = this.props;
        if (contentOfConfirmModal.handleFunc) {
            contentOfConfirmModal.handleFunc(contentOfConfirmModal.dataFunc);
        }
        this.onClose();
    }

    onClose = () => {
        this.props.setContentOfConfirmModal({
            isOpen: false,
            messageId: "",
            handleFunc: null,
            dataFunc: null
        });
    }

    render() {
        const { contentOfConfirmModal } = this.props;

        return (
            <Modal isOpen={contentOfConfirmModal.isOpen} className='confirm-modal' centered={true}>
                <div className="modal-header">
                    <div className="modal-title">
                        Xác nhận
                    </div>
                    <div className="col-auto">
                        <button className="btn btn-close" onClick={this.onClose}>
                            <i className="fal fa-times" />
                        </button>
                    </div>
                </div>

                <div className="modal-body">
                    <div className="confirm-modal-content">
                        <div className="row">
                            <div className="col-12">
                                Xác nhận
                            </div>

                            <hr />

                            <div className="col-12">
                                <div className="btn-container text-center">
                                    <button className="btn btn-add" onClick={this.onClose} >
                                        Đóng
                                    </button>
                                    <button ref={this.acceptBtnRef} className="btn btn-add" onClick={this.onAcceptBtnClick}>
                                        Accept
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal >
        );
    }

}

const mapStateToProps = state => {
    return {
        contentOfConfirmModal: state.app.contentOfConfirmModal
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setContentOfConfirmModal: (contentOfConfirmModal) => dispatch(actions.setContentOfConfirmModal(contentOfConfirmModal))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmModal);
