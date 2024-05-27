import React, { Component } from 'react';
import { connect } from "react-redux";
import HomeHeader from '../HomePage/HomeHeader';
import './DetailCourse.scss'
import { getDetailCourse } from '../../services/userService'
import HomeFooter from '../HomePage/HomeFooter'
import { Button } from 'reactstrap';
import RegisterModal from './RegisterModal';
import { height } from '@fortawesome/free-brands-svg-icons/fa42Group';
class DetailCourse extends Component {

    constructor(props) {
        super(props)
        this.state = {
            detailCourse: {},
            currentCourseId: -1
            ,isOpenRegisterModel:false,
            dataScheduleTimeModal:""
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            this.setState({
                currentCourseId: id
            })
            let res = await getDetailCourse(id);
            if (res && res.errCode === 0) {
                this.setState({
                    detailCourse: res.data
                })
            }
        }
    }

    componentDidUpdate(prevProps) {

    }

    handleClickOpenModal = () => {
        this.setState({
            isOpenRegisterModel: true,
            dataScheduleTimeModal: "",
        })
    }
    closeModal=()=>{
        this.setState({
            isOpenRegisterModel: false
        })
    }
    render() {
        console.log(this.props.match.params.id)
        let { detailCourse } = this.state
        // let name = ''
        // if (detailCourse && detailCourse.data) {
        //     name = `${detailCourse.name}`

        // }
        return (
            <div>
                {/* section-featured */}
                <HomeHeader isShowBanner={false} />
                <div className='detail-handbook-container '//style={{background:"#dde7f5"}}
                    style={{ backgroundImage: "url(https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-6/369959700_1306176120261447_4267985031748171496_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEyj44jQWsHK5EVreryU-8O8r18cki2d8ryvXxySLZ3ynTzut_BCZcfZM7-6GADeHvc1tpovF28kSXNSPmrVQLC&_nc_ohc=N3UnXGRBBEIQ7kNvgG84NIS&_nc_ht=scontent.fhan2-5.fna&oh=00_AYCkXA8mD6R8G3HgQVLwejwYyINCmRFkAMr_JAT7eWxfqg&oe=6653ACAC)" }}
                >
                    {/* ===========================================================================      */}
                    <div className="section-featured featured-image " style={ {height:"100px", backgroundImage: "url(https://scontent.fhan2-5.fna.fbcdn.net/v/t39.30808-6/369959700_1306176120261447_4267985031748171496_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEyj44jQWsHK5EVreryU-8O8r18cki2d8ryvXxySLZ3ynTzut_BCZcfZM7-6GADeHvc1tpovF28kSXNSPmrVQLC&_nc_ohc=N3UnXGRBBEIQ7kNvgG84NIS&_nc_ht=scontent.fhan2-5.fna&oh=00_AYCkXA8mD6R8G3HgQVLwejwYyINCmRFkAMr_JAT7eWxfqg&oe=6653ACAC)" }}>
                    
                    </div>
                    {/* ===================================== */}
                    <div className="section-post wrap">
                        <div className="post-wrap " style={{background:"white"}}>
                            <h1 className="white">{detailCourse.CourseName}</h1>
                            <p  class="w3-serif" >{detailCourse.Description}</p>
                            <div className=''> Thời lượng khóa học :  6 tháng</div>
                            <div className='pt-3' style={{color: "blue"}}>Học phí khóa học : {detailCourse.CourseFee}</div>
                            
                            

                            <div style={{marginTop:"20px"}} > 
                            <button className='btn btn-primary'
                                    style={{background:"#f35311", width:"40%",borderRadius: "50px"}}
                                    onClick={() => this.handleClickOpenModal()}
                             > Đăng kí khóa học</button>
                            </div>
                        </div>
                        
                    </div>
                    
                </div>
                { this.state.isOpenRegisterModel &&
                    <RegisterModal
                    isOpenRegisterModel={this.state.isOpenRegisterModel}
                    closeRegisterModel={this.closeModal}
                    dataScheduleTimeModal={this.state.dataScheduleTimeModal}
                    CourseName={this.state.detailCourse.CourseName}
                    CourseId= {this.state.currentCourseId}
                    CourseFee= {this.state.detailCourse.CourseFee}
                    />
                }
                
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailCourse);
