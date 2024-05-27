import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import './TableManageClass.scss'
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';
import { getClassById } from '../../../services/userService';
import { getTeacherByUserId } from '../../../services/teacherService';

const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}

class TableManageClass extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrClass: [],
            TeacherName:"",
            
        }
    }
    async componentDidMount() {
        //await this.getAllClassFromReact();
        await this.getTeacherId();
    }
    getTeacherId= async ()=>{
        let { userInfo } = this.props
        //console.log(userInfo);
        //if( userInfo[0].Role=="Teacher")
        {
            let userId= userInfo[0].UserId;
            //let userId= 3;
            let teacher= await getTeacherByUserId(userId);
            let teacherId= teacher.data.TeacherId;
            this.state.TeacherName= teacher.data.TeacherName;
            //let teacherId= 1;
            let res = await getClassById(teacherId);
            console.log(teacherId);
            if (res && res.errCode == 0) {
                this.setState({
                    arrClass: res.data
                })
            }
        }
    }
    getAllClassFromReact = async () => {
        let res = await getClassById('ALL');
        //console.log(res);
        if (res && res.errCode == 0) {
            this.setState({
                arrClass: res.data
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.class!== this.props.class) {
            this.setState({
                classRedux: this.props.class,
            })
        }
    }


    handleEditUser = (id) => {
       // this.props.handleEditUserFromParent(user)
       console.log("nhan");
       this.props.location(`/manage-class-student/${id}`)
    //    if (this.props.history) {
    //     this.props.push(`http://localhost:3000/teacher/manage-class-student/${id}`)
    //     }
    //    <a href="http://localhost:3000/teacher/manage-class-student">Xem lớp </a>
    }

    render() {
        let  arrClass = this.state. arrClass;
        //console.log("check class", arrClass);
        return (
            <React.Fragment>
                <table id='TableManageClass'>
                    <tr>
                        <th>Tên lớp học</th>
                        
                        <th>Giáo viên phụ trách</th>
                        <th>Mã khóa học</th>
                        
                        <th>Thao tác</th>
                    </tr>
                    { arrClass &&  arrClass.length > 0 &&
                         arrClass.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.ClassName}</td>
                                   
                                    <td>{this.state.TeacherName}</td>
                                    <td>{item.CourseId}</td>
                                    
                                    <td>
                                        <button className=' ml-5'
                                            onClick={() => this.handleEditUser(item.ClassId)}>
                                               Xem lớp
                                                <a href="http://localhost:3000/teacher/manage-class-student">Xem lớp </a>
                                        
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
       userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
     
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageClass);
