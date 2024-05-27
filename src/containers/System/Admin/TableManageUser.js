import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import './TableManageUser.scss'

import MarkdownIt from 'markdown-it';
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

class TableManageUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersRedux: [],
        }
    }

    componentDidMount() {
        this.props.fetchAllStudentStart()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.users !== this.props.users) {
            this.setState({
                usersRedux: this.props.users,
            })
        }
    }

    handleDeleteStudent = (user) => {
        this.props.fetchDeleteUserStart(user.id)
    }

    handleEditStudent = (user) => {
        this.props.handleEditStudentFromParent(user)
    }

    render() {
        let arrUsers = this.state.usersRedux;
        console.log("check",arrUsers);
        return (
            <React.Fragment>
                <table id='TableManageUser'>
                    <tr>
                        <th>Email</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Address</th>
                        <th>Actions</th>
                    </tr>
                    {arrUsers && arrUsers.length > 0 &&
                        arrUsers.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.Email}</td>
                                    <td>{item.StudentName}</td>
                                    <td>{item.StudentBirth}</td>
                                    <td>{item.StudentAddress}</td>
                                    <td>
                                        <button className='btn-edit'
                                            onClick={() => this.handleEditStudent(item)}>
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
        users: state.admin.users,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllStudentStart: () => dispatch(actions.fetchAllStudentStart()),
        fetchDeleteStudentStart: (id) => dispatch(actions.fetchDeleteStudentStart(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
