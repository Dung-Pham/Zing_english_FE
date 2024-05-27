import React, { Component } from 'react';
import { connect } from 'react-redux';
import HomeHeader from './HomeHeader'
import Event from './Section/Event';
import Course from './Section/Course'
import AboutUs from './Section/AboutUs'
import HomeFooter from './HomeFooter'
import './HomePage.scss'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import About from './Section/About';
import OutStandingTeacher from './Section/OutStandingTeacher';

class HomePage extends Component {

    render() {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
        };

        return (
            <div className="home-page">
                <HomeHeader isShowBanner={true} />
                <AboutUs/>
                <section className="for-loop">
                    {/* <Event settings={settings} /> */}
                    
                    <OutStandingTeacher settings={settings} />
                    <Course settings={settings} />
                    <About/>
                </section>
                <HomeFooter />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
