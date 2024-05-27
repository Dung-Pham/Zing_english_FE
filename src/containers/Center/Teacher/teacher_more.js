import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import * as actions from '../../../store/actions'
import { withRouter } from 'react-router-dom';
import TagTeacher from '../../../components/tag-homepage/tag-teacher';
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter'
import Loading from '../../../components/loading/loading'
import './teacher_more.scss';

class teacher_more extends Component {

    constructor(props) {
        super(props)
        // this.sliderRef = React.createRef(); // Tạo một tham chiếu
        this.state = {
            arrTeachers: [],
            isLoading: true,
            currentPage: 1,
            newsPerPage: 6,
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.topTeacher !== this.props.topTeacher) {
            this.setState({
                arrTeachers: this.props.topTeacher
            })
        }
    }

    async componentDidMount() {
        await this.props.loadTopTeacher();
        this.props.settings && this.setState({ isLoading: false });

    }

    handleViewDetailTeacher = (teacher) => {
        if (this.props.history) {

            this.props.history.push(`/detail-teacher/${teacher.UserId}`)
        }
    }

    chosePage = (event) => {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }
    render() {
        let { arrTeachers, isLoading } = this.state
        // let { language } = this.props
        const currentPage = this.state.currentPage;
        const newsPerPage = this.state.newsPerPage;
        const indexOfLastNews = currentPage * newsPerPage;
        const indexOfFirstNews = indexOfLastNews - newsPerPage;
        const currentList = arrTeachers.slice(indexOfFirstNews, indexOfLastNews);
        // const renderTodos = currentTodos.map((todo, index) => {
        // return <TableItem stt={index + 1 + (currentPage - 1)*newsPerPage} key={index} data={todo} />;
        // });
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(arrTeachers.length / newsPerPage); i++) {
            pageNumbers.push(i);
        }
        
        return (
            <>
                <div className='teacher-more'>
                    <HomeHeader />
                    <div className='teacher-more-container'>
                        <div className='header'>
                            <b>Giáo viên</b>
                        </div>
                        {/* {isLoading ? (<Loading />) :
                            ( */}
                                <div className='list'>
                                    {currentList && currentList.length > 0 &&
                                        currentList.map((item, index) => {
                                            let imageBase64 = ''
                                            if (item.image) {
                                                imageBase64 = item.image
                                            }
                                
                                            let nameVi= item.TeacherName;
                                            return (
                                                <div className='section-customize' key={index}
                                                    onClick={() => this.handleViewDetailTeacher(item)}
                                                >
                                                    <TagTeacher
                                                        date="12/03/2024"
                                                        description={nameVi}
                                                        imageSrc={item.TeacherId}
                                                    />
                                                </div>
                                            )
                                        })}
                                </div>
                            {/* )} */}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(teacher_more));
