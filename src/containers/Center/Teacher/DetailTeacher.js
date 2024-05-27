import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailTeacher.scss'
import { getTeacherByUserId } from '../../../services/teacherService'
import HomeFooter from '../../HomePage/HomeFooter'
import imc from '../../../assets/Teacher/teacher-2.jpg';
class DetailTeacher extends Component {

    constructor(props) {
        super(props)
        this.state = {
            detailTeacher: '',
            currentTeacherId: -1
        }
    }


    
    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            this.setState({
                currentTeacherId: id
            })
            let res = await getTeacherByUserId(id);
            
            if (res && res.errCode === 0) {
                this.setState({
                    detailTeacher: res.data
                })
            }
            console.log(res);
        }
    }

    componentDidUpdate(prevProps) {

    }

    render() {
        let s=  require('../../../assets/Teacher/teacher-2.jpg')
        if(this.state.detailTeacher.TeacherId){
            let path = '../../../assets/Teacher/teacher-2.jpg';
            s= require('../../../assets/Teacher/teacher-'+ this.state.detailTeacher.TeacherId+'.jpg');
        //console.log(imageSrc);
        }
        console.log("check detai",this.state.detailTeacher);
        return (
            <div className='detail-teacher'>
                <HomeHeader isShowBanner={true} />
                <div className='detail-teacher-container  container'>
                    <div className='header'>
                            <b>{this.state.detailTeacher.TeacherName}</b>
                    </div>
                    <div className='intro-teacher '>
                        <div
                            className='content-left'
                            style={{
                             width:"300px",
                             height:"300px"
                                // backgroundImage: `url(${detailTeacher && detailTeacher.image ? detailTeacher.image : " "})`,
                            }}
                        >
                            <img 
                                 style={{
                                    border:"solid 1px blue",
                                    borderRadius: "8px",
                                    width:"300px",
                                    height:"300px"
                                       // backgroundImage: `url(${detailTeacher && detailTeacher.image ? detailTeacher.image : " "})`,
                                   }}
                                src={s.default}>
                            </img>

                        </div>
                        <div className='content-right pr-3'>
                            <div className='up'>
                                
                            </div>
                            {/* <div>
                                {this.state.detailTeacher && this.state.detailTeacher.TeacherName}
                            </div> */}
                            <div className='down pt-3'>
                               
                                <p class="w3-serif">
                                     Chúng tôi tự hào giới thiệu cô {this.state.detailTeacher.TeacherName}, một giáo viên tiếng Anh giàu kinh nghiệm tại Trung tâm Anh ngữ SLC. Cô tốt nghiệp Cử nhân Sư Phạm Anh tại Đại học Hồng Đức có kinh nghiệm dạy tiếng anh tại nhiều trung tâm lớn.
                                Với phương pháp giảng dạy sáng tạo và nhiệt huyết,  cô {this.state.detailTeacher.TeacherName}luôn tạo ra những giờ học thú vị và hiệu quả. Cô không chỉ giúp học viên nâng cao kỹ năng ngôn ngữ mà còn khuyến khích sự tự tin và yêu thích học tiếng Anh
                                </p>
                                
                            </div>
                            <div className='pt-2'>
                                <div>
                                    Thông tin liên hệ : {this.state.detailTeacher.Email}
                                </div>
                            </div>
                          
                        </div>
                    </div>

                    {/* <div className='detail-info-teacher'>
                        {detailTeacher && detailTeacher.Markdown &&
                            detailTeacher.Markdown.contentHTML &&
                            <div dangerouslySetInnerHTML={{ __html: detailTeacher.Markdown.contentHTML }}></div>
                        }
                    </div> */}
                    <div className='comment-teacher'>

                    </div>
                </div>
                <HomeFooter />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailTeacher);
