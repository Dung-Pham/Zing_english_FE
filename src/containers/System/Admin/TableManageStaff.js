import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import './TableManageStaff.scss'
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';
import { getAllStaff } from '../../../services/staffService';
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}

class TableManageStaff extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrStaff: [],
        }
    }
    async componentDidMount() {
        await this.getAllStaffFromReact()
    }

    getAllStaffFromReact = async () => {
        let res = await getAllStaff("All");
        console.log(res);
        if (res && res.errCode === 0) {
            this.setState({
                arrStaff: res.staff
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.Staffs!== this.props.Staffs) {
            this.setState({
                StaffRedux: this.props.Staffs,
            })
        }
    }


    handleEditUser = (user) => {
        this.props.handleEditStaffFromParent(user);
    }

    render() {
        let  arrStaff = this.state. arrStaff;
        return (
            <React.Fragment>
                <table id='TableManageStaff'>
                    <tr>
                        <th>Tên nhân viên</th>
                        <th>Ngày sinh</th>
                        <th>địa chỉ</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                        <th>Thao tác</th>
                    </tr>
                    { arrStaff &&  arrStaff.length > 0 &&
                         arrStaff.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.StaffName}</td>
                                    <td>{item.DateBirth}</td>
                                    <td>{item.Address}</td>
                                    <td>{item.Email}</td>
                                    <td>{item.PhoneNumber}</td>
                                    <td>
                                        <button className='btn-edit'
                                            onClick={() => this.handleEditUser(item)}>
                                            <i className="far fa-edit"></i>
                                        </button>
                                        <button className='btn-delete'
                                            onClick={() => this.handleDeleteStudent(item)}>
                                            <i className="far fa-trash-alt"></i>
                                        </button>
                                        
                                    </td>
                                </tr>
                            )
                        })
                    }
                </table>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        //students: state.admin.students,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        //fetchAllStudentStart: () => dispatch(actions.fetchAllStudentStart()),
        //fetchDeleteStudentStart: (id) => dispatch(actions.fetchDeleteStudentStart(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageStaff);
