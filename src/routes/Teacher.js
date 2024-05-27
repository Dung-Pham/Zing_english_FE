import React, { Component } from 'react';
import { connect } from "react-redux";
import { Route, Switch } from 'react-router-dom';
import ManageStaff from '../containers/System/Admin/ManageStaff';

import Header from '../containers/Header/Header';
import ManageClass from '../containers/System/Teacher/ManageClass';
import TableManageClassStudent from '../containers/System/Teacher/TableManageClassStudent';
import ManageCourse from '../containers/System/Teacher/ManageCourse';

class Teacher extends Component {
    render() {
        const { isLoggedIn } = this.props;
        return (
            <React.Fragment>
                {this.props.isLoggedIn && <Header />}
                <div className="Teacher-container">
                    <div className="Teacher-list">
                        <Switch>
                            <Route path="/teacher/manage-course" component={ManageCourse} />
                            <Route path="/teacher/manage-staff" component={ManageStaff} />
                            <Route path="/teacher/manage-class" component={ManageClass} />
                            <Route path="/teacher/manage-class-student" component={TableManageClassStudent} />
                        </Switch>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Teacher);
