import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions'
import { withRouter } from 'react-router-dom';
import HomeHeader from '../HomePage/HomeHeader';
import HomeFooter from '../HomePage/HomeFooter'
import './course_more.scss';

import event_sample from '../../assets/course/course-2.jpg'
import TagCourse from '../../components/tag-homepage/tag-Course';


class course_more extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrCourse: [],
            currentPage: 1,
            newsPerPage: 6,
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.courses !== this.props.courses) {
            this.setState({
                arrCourse: this.props.courses
            })
        }
    }

    componentDidMount() {
        this.props.getALLCourse();
    }

    handleViewDetailCourse = (course) => {
        if (this.props.history) {
            this.props.history.push(`/detail-course/${course.CourseId}`)
        }
    }
    chosePage = (event) => {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }
    render() {
        let { arrCourse } = this.state
        const currentPage = this.state.currentPage;
        const newsPerPage = this.state.newsPerPage;
        const indexOfLastNews = currentPage * newsPerPage;
        const indexOfFirstNews = indexOfLastNews - newsPerPage;
        const currentList = arrCourse.slice(indexOfFirstNews, indexOfLastNews);
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(arrCourse.length / newsPerPage); i++) {
            pageNumbers.push(i);
        }
        
        return (
            <div className='course-more'>
                <HomeHeader />

                <div className='course-more-container'>
                    <div className='header'>
                        <b>Khóa học</b>
                    </div>
                    <div className='list'>
                        {currentList && currentList.length > 0 &&
                            currentList.map((data, index) => {
                                return (
                                    <div className='section-customize' key={index}
                                        onClick={() => this.handleViewDetailCourse(data)}
                                    >
                                        <TagCourse
                                            date="12/03/2024"
                                            description={data.CourseName}
                                            imageSrc={event_sample}
                                        />
                                    </div>
                                )
                            })}
                    </div>
                    <div className="pagination-custom">
                        <ul className="page-numbers">
                            {
                                pageNumbers.map(number => {
                                    if (this.state.currentPage === number) {
                                        return (
                                            <li key={number} id={number} className="active">
                                                {number}
                                            </li>
                                        )
                                    }
                                    else {
                                        return (
                                            <li key={number} id={number} onClick={this.chosePage} >
                                                {number}
                                            </li>
                                        )
                                    }
                                })
                            }
                        </ul>
                    </div>
                </div>
                <HomeFooter />
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        courses: state.admin.courses
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getALLCourse: () => dispatch(actions.getALLCourse())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(course_more));
