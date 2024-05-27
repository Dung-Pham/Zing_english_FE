import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import './TableManageCourse.scss'

import MarkdownIt from 'markdown-it';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { getAllCourse } from '../../../services/courseService';

const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}

class TableManageCourse extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrCourse: [],
        }
    }
    async componentDidMount() {
        this.props.getALLCourse();
    }

    getAllCourseFromReact = async () => {
        let res = await getAllCourse();
        console.log(res);
        if (res && res.errCode === 0) {
            this.setState({
                arrCourse: res.data
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.courses !== this.props.courses) {
            this.setState({
                arrCourse: this.props.courses,
            })
        }
    }


    handleEditUser = (user) => {
        this.props.handleEditCourseFromParent(user);
    }

    render() {
        let  arrCourse = this.state. arrCourse;
        return (
            <React.Fragment>
                <table id='TableManageCourse'>
                    <tr>
                        <th>Tên khóa học</th>
                        <th>Mô tả Khóa học</th>
                        <th>Học phí</th>
                        <th>Thao tác</th>
                    </tr>
                    { arrCourse &&  arrCourse.length > 0 &&
                         arrCourse.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.CourseName}</td>
                                    <td>{item.Description}</td>
                                    <td>{item.CourseFee}</td>
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
        courses: state.admin.courses,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getALLCourse: (data) => dispatch(actions.getALLCourse(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageCourse);
