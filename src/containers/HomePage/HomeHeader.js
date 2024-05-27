import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss'
import { withRouter } from 'react-router-dom';
import logo from "../../assets/images/logo.jpg";

class HomeHeader extends Component {


    returnHome = () => {
        if (this.props.history) {
            this.props.history.push(`/home`)
        }
    }

    handleLogin = () => {
        if (this.props.history) {
            this.props.history.push(`/login`)
        }
    }
    handleViewTeacherMore = () => {
        if (this.props.history) {

            this.props.history.push(`/teacher_more`)
        }
    }
    handleViewEventMore = () => {
        if (this.props.history) {
            this.props.history.push(`/event_more`)
        }
    }
    handleViewCourseMore = () => {
        if (this.props.history) {
            this.props.history.push(`/course_more`)
        }
    }
    render() {
        let language = this.props.language
        return (

            <React.Fragment>
                <div className="header">
                    <header className="base-rectangle1" />
                    <div className='left-content'>
                        <img
                            className='header-logo' src={logo}
                            onClick={() => this.returnHome()}
                        />
                    </div>
                    <div className="items">
                        <div className="teachers" onClick={() => this.handleViewTeacherMore()}>Giáo viên</div>
                        <div className="event" onClick={() => this.handleViewEventMore()}>Sự kiện</div>
                        <div className="courses" onClick={() => this.handleViewCourseMore()}>Khóa học</div>
                    </div>
                    <div className="right-btn">
                            <div className="btn-1">TƯ VẤN</div>
                        
                            <div className="btn-2" onClick={() => this.handleLogin()}>ĐĂNG NHẬP</div>
                    </div>
                </div>
            </React.Fragment >
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
       
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
