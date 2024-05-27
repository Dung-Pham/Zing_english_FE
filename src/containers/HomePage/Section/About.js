import React, { Component } from 'react';
import { connect } from 'react-redux';


class About extends Component {
    
    render() {
                // console.log('AboutHomeRedux::::::', this.props.AboutHomeRedux)
        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    Learn English With SLC
                </div>
                <div className='section-about-content col-12' >
                    <div className='content-left col-6'>
                    <iframe width='100%' height="300" src="https://www.youtube.com/embed/OIuLjrPWtCs" title="[AloKiddy] TỪ VỰNG TIẾNG ANH CHỦ ĐỀ HOA QUẢ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen>

                    </iframe>
                    </div>
                    <div className='content-right col-6' >
                        Quá trình học tiếng Anh bao gồm việc lắng nghe và nói. Bạn có thể lắng nghe các bản tin, podcast, hoặc xem phim, video bằng tiếng Anh để làm quen với ngữ điệu và cách diễn đạt
                    </div>

                </div>
            </div>
    
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        AboutHomeRedux: state.admin.AboutHome
    };
};

const mapDispatchToProps = dispatch => {
    return {
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
