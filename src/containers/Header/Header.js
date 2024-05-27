import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, teacherMenu } from './menuApp';
import './Header.scss';
import { USER_ROLE } from '../../utils/constant'
import _ from 'lodash';

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menuApp: [],
        }
    }


    componentDidMount() {
        let { userInfo } = this.props
        let menu = []
        if (userInfo && !_.isEmpty(userInfo)) {
            let { roleID } = userInfo
            if( userInfo[0].Role== "Admin")
                menu = adminMenu
            if( userInfo[0].Role== "Teacher")
                 menu = teacherMenu
        }
        this.setState({
            menuApp: menu
        })
    }

    render() {
        const { processLogout, userInfo } = this.props;
        console.log("check info ", userInfo[0]);
        let { menuApp } = this.state
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={menuApp} />
                </div>

                <div className='languages'>
                    <span className='welcome'>
                        Welcome {userInfo[0] && userInfo[0].Role? userInfo[0].Role : ""}!
                    </span>
                
                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout} title='Log out'>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>

            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
