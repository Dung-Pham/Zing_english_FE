import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import * as actions from '../../../store/actions'
import { withRouter } from 'react-router-dom';
import TagTeacher from '../../../components/tag-homepage/tag-teacher';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Loading from '../../../components/loading/loading'

class OutStandingTeacher extends Component {

    constructor(props) {
        super(props)
        this.sliderRef = React.createRef(); // Tạo một tham chiếu
        this.state = {
            allTeacher: [],
            isLoading: true,
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.topTeacher !== this.props.topTeacher) {
            this.setState({
                allTeacher: this.props.topTeacher
            })
        }
    }

    async componentDidMount() {
        await this.props.loadTopTeacher()
        this.props.settings && this.setState({ isLoading: false });

    }

    handleViewDetailTeacher = (teacher) => {
        if (this.props.history) {
            //fix
            this.props.history.push(`/detail-teacher/${teacher.TeacherId}`)
        }
    }
    handleViewTeacherMore = () => {
        if (this.props.history) {

            this.props.history.push(`/teacher_more`)
        }
    }

    render() {
        let { allTeacher, isLoading } = this.state
        console.log(allTeacher);
        let { language } = this.props
        return (
            <>
                {isLoading ? (<Loading />) :
                    (<div className='section-share section-outstanding-teacher'>
                        <div className='section-container'>
                            <div className='section-header'>
                                <span className='title-section'>
                                    Giáo viên nổi bật
                                </span>
                                <button className='btn-section'onClick={() => this.handleViewTeacherMore()}>
                                    Xem thêm
                                </button>
                            </div>
                            <div className='section-body'>
                                <Slider ref={this.sliderRef} {...this.props.settings}>
                                    {allTeacher && allTeacher.length > 0 &&
                                        allTeacher.map((item, index) => {
                                            let imageBase64 = ''
                                            // if (item.image) {
                                            if(item.Email){
                                                imageBase64 = new Buffer(item.Email, 'base64').toString('binary')
                                            }
                                            let nameVi =item.TeacherName; //`${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`
                                            return (
                                                <div className='section-customize' key={index}
                                                    onClick={() => this.handleViewDetailTeacher(item)}
                                                >
                                                    <TagTeacher
                                                        date="12/03/2024"
                                                        description={nameVi}
                                                        imageSrc={item.TeacherId}
                                                    />
                                                    {/* <div className='customize-border'>
                                                <div className='outer-bg'>
                                                    <div className='bg-img '
                                                        style={{ backgroundImage: `url(${imageBase64})`, }}
                                                    ></div>
                                                </div>
                                                <div className='position text-center'>
                                                   
                                                </div>
                                            </div> */}
                                                </div>
                                            )
                                        })}
                                </Slider>
                                <button className="custom-prevArrow" onClick={() => this.sliderRef.current.slickPrev()}>
                                    <FontAwesomeIcon
                                        className='icon'
                                        icon={faChevronRight}
                                        flip="horizontal"
                                        size="2xs"
                                    />
                                </button>
                                <button className="custom-nextArrow" onClick={() => this.sliderRef.current.slickNext()}>
                                    <FontAwesomeIcon
                                        className='icon'
                                        icon={faChevronRight}
                                        flip="vertical"
                                        size="2xs"
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                    )}
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        
        isLoggedIn: state.user.isLoggedIn,
        topTeacher: state.admin.topTeacher
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopTeacher: () => dispatch(actions.loadTopTeacher())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutStandingTeacher));
