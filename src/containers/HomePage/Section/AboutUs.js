import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AboutUs.scss'
import image from '../../../assets/header-background.jpg'

class About extends Component {
    render() {
        return (
            <div className="composite-node">
                <div className="grouping-node">
                    <h1 className="hotels-how-to-container">
                            <b className="livestock">SLC English Center</b> đưa bạn đi đến hành trình ước mơ
                            </h1>
                    <h3 className="so-youre-trying-container">
                        <p className="buy-fit-for-slaughter-and">
                            – Phương pháp đào tạo bài bản chất lượng 
                        </p>
                        <p className="get-it-processed">
                            – Đăng kí khóa học dễ dàng
                        </p>
                        <p className="we-deliver-to">
                            – Dội ngũ giáo viên trẻ trung năng động kiến thức cao
                        </p>
                    </h3>
                </div>
                <div className="else-node">
                    <img className="base-icon" loading="lazy" alt="" src={image} />
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
