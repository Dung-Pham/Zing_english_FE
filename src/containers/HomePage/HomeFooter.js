import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, } from '@fortawesome/free-solid-svg-icons';
import { faGithub ,faFacebookF} from '@fortawesome/free-brands-svg-icons';
import './HomeFooter.scss'
class HomeFooter extends Component {
    constructor(props) {
        super(props)
        // this.sliderRef = React.createRef(); // Tạo một tham chiếu
        // this.state = {
        //  
        // }
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
        return (
            <div className='home-footer'>
                <div className='footer-container'>
                    <div className='container health-care'>
                        <div className='txt name'>
                            <b>SLC english center</b>
                            <br/>
                        </div>
                        <div className='description'>
                            <p className="txt">
                             Phương pháp đào tạo bài bản chất lượng
                            </p>
                            <p className="txt">
                            Đăng kí khóa học dễ dàng
                            </p>
                            <p className="txt">
                            Địa chỉ : Số nhà 54 , tổ 5 thị Trấn Cẩm Thủ Thanh Hóa
                            </p>
                        </div>
                    </div>
                    <div className='container quick-link'>
                        {/* <b className="txt">
                            Quick link
                        </b> */}
                        <div>
                            <p className="txt" onClick={() => this.handleViewTeacherMore()}>
                                Giáo viên
                            </p>
                            <p className="txt" onClick={() => this.handleViewEventMore()}>
                                Sự kiện
                            </p>
                            <p className="txt" onClick={() => this.handleViewCourseMore()}>
                                
                                Khóa học
                            </p>
                            <p className="txt" onClick={() => this.handleLogin()}>
                                Tư vấn
                            </p>
                            <p className="txt"  onClick={() => this.handleLogin()}>
                                Đăng nhập
                            </p>
                        </div>
                    </div>
                    <div className='container contact'>
                        <b className="txt">
                            Liên hệ
                        </b>
                        <div className='cnt'>
                            <FontAwesomeIcon
                                className='icon'
                                icon={faEnvelope} />
                            <p className="txt">btdinh20032003@gmail.com</p>
                        </div>
                        <div className='cnt'>
                            <FontAwesomeIcon
                                className='icon'
                                icon={faGithub} />
                            <a className="txt" href='https://github.com/Zingzing2003'>https://github.com/Zingzing2003</a>
                        </div>
                        <div className='cnt'>
                            <FontAwesomeIcon
                                className='icon'
                                icon={faFacebookF}
                                 />
                            <a className="txt" href='https://www.facebook.com/profile.php?id=100026072150961'>https://www.facebook.com</a>
                        </div>

                    </div>

                </div>
            </div>
        )
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeFooter));
