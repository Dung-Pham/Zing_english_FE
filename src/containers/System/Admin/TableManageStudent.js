import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import './TableManageStudent.scss'

import MarkdownIt from 'markdown-it';
import Swal from 'sweetalert2';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}

class TableManageStudent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            studentRedux: [],
        }
    }

    componentDidMount() {
        this.props. fetchAllStudentStart()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.students !== this.props.students) {
            this.setState({
                studentRedux: this.props.students,
            })
        }
    }

    handleDeleteStudent = (user) => {
        Swal.fire({
            title: 'Bạn chắc chắn chứ?',
            text: "Bạn sẽ không thể khôi phục lại!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Đúng, Xóa!',
            cancelButtonText:'Hủy',
          })
          .then((result )=>{
            if (result.isConfirmed) {
                //setIsLoadingWithBackdrop(true);
                
                this.props.fetchDeleteStudentStart(user.StudentId);
              }
           
          })
    }

    handleEditUser = (user) => {
        this.props.handleEditStudentFromParent(user)
    }

    render() {
        let arrStudents = this.state.studentRedux;
         console.log("check",arrStudents);
        return (
            <React.Fragment>
                <table id='TableManageStudent'>
                    <tr>
                        <th>Email</th>
                        <th>Họ và Tên</th>
                        <th>Ngày sinh</th>
                        <th>Địa chỉ</th>
                        <th>Sđt phụ huynh</th>
                        <th>Thao tác</th>
                    </tr>
                    {arrStudents && arrStudents.length > 0 &&
                        arrStudents.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.Email}</td>
                                    <td>{item.StudentName}</td>
                                    <td>{item.StudentBirth}</td>
                                    <td>{item.Address}</td>
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
        students: state.admin.students,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllStudentStart: () => dispatch(actions.fetchAllStudentStart()),
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageStudent);
