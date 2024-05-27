import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import './TableManageTeacher.scss'
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';
import { getAllTeachers } from '../../../services/teacherService';
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}

class TableManageTeacher extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrTeacher: [],
        }
    }
     componentDidMount() {
        this.props.getALLTeachers();
    }

    getAllTeacherFromReact = async () => {
        let res = await getAllTeachers("All");
        console.log(res);
        if (res && res.errCode === 0) {
            this.setState({
                arrTeacher: res.teachers
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        
        if (prevProps.teachers!== this.props.teachers) {
            console.log("did ",this.props.teachers)
            this.setState({
                arrTeacher: this.props.teachers,
            })
        }
    }


    handleEditUser = (user) => {
        this.props.handleEditTeacherFromParent(user)
    }

    render() {
        let  arrTeacher = this.state. arrTeacher;
        console.log("ccc", arrTeacher);
        return (
            <React.Fragment>
                <table id='TableManageTeacher'>
                    <tr>
                        <th>Tên giáo viên</th>
                        <th>Ngày sinh</th>
                        <th>địa chỉ</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                        <th>Thao tác</th>
                    </tr>
                    { arrTeacher &&  arrTeacher.length > 0 &&
                         arrTeacher.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.TeacherName}</td>
                                    <td>{item.TeacherBirth}</td>
                                    <td>{item.Address}</td>
                                    <td>{item.Email}</td>
                                    <td>{item.PhoneNumber}</td>
                                    <td>
                                        <button className='btn-edit'
                                            onClick={() => this.handleEditUser(item)}>
                                            <i className="far fa-edit"></i>
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
        teachers: state.admin.teachers,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getALLTeachers: () => dispatch(actions.getALLTeachers())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageTeacher);
