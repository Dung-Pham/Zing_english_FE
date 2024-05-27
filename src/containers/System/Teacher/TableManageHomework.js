import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import './TableManageHomework.scss'
import MarkdownIt from 'markdown-it';
import 'react-markdown-editor-lite/lib/index.css';
import { getClassById } from '../../../services/userService';
import { getTopTeacherByUserId } from '../../../services/teacherService';
import { getStudentByClassId } from '../../../services/studentService';

const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}

class TableManageHomework extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrClass: [],
            TeacherName:"",
            students:[],
            
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
            let teacher= await getTopTeacherByUserId(userId);
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


    handleEditUser = (user) => {
       // this.props.handleEditUserFromParent(user)
    }

    render() {
        let  arrClass = this.state. arrClass;
        let students= this.state.students;
        //console.log("check class", arrClass);
        return (
            <React.Fragment>
                <table id='TableManageClass' className='container'>
                    <tr>
                        <th>Tên BTVN</th>
                        
                        <th>Nội dung</th>
                        <th>Email</th>
                        
                        <th>Thao tác</th>
                    </tr>
                    { students &&  students.length > 0 &&
                         students.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.HomeworkName}</td>
                                   
                                    <td>{item.Address}</td>
                                    <td></td>
                                    
                                    <td>
                                        <button className=' ml-5'
                                            onClick={() => this.handleEditUser(item)}>
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

export default connect(mapStateToProps, mapDispatchToProps)(TableManageHomework);
