import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import { withRouter } from 'react-router'
import HomeHeader from '../../HomePage/HomeHeader';
import HomeFooter from '../../HomePage/HomeFooter'
import './event_more.scss';
import dn from '../../../assets/event/dn1.jpg'
import dn2 from '../../../assets/event/dn2.jpg'
import dn3 from '../../../assets/event/dn3.jpg'
import dn4 from '../../../assets/event/dn4.jpg'
import dn5 from '../../../assets/event/tet.jpg'
import dn6 from '../../../assets/event/hallowen.jpg'
class event_more extends Component {

    constructor(props) {
        super(props)
        this.state = {
            
        }
    }


    handleViewDetailEvent = (item) => {
        if (this.props.history) {
            this.props.history.push(`/detail-event/${item.id}`)
        }
    }

    render() {
       
        return (
            <div className='event-more'>
                <HomeHeader />
                <div className='event-more-container'>
                    <div className='header'>
                        <b> Sự kiện thường niên </b>
                    </div>
                    
                    <div class=" d-flex  container" style={{background:"white", borderRadius:"30px"}}>
                        <div class="row"> 

                            <img src={dn} class="pr-3 pt-3 pb-3 col" style={{ width:"400px", height:"400px",borderRadius:"30px"}} />
                            <div class="col align-items-center ">
                                <h4 class="pt-2">Dã ngoại</h4>
                                <p  class="w3-sans-serif ">Dã ngoại là một hoạt động đặc biệt ý nghĩa và hữu ích đối với học sinh. Tham gia vào các chuyến dã ngoại không chỉ giúp các em thư giãn sau những giờ học căng thẳng mà còn mang lại nhiều lợi ích giáo dục và phát triển toàn diện.</p>
                            </div>
                        </div>
                    </div>

                    <div class=" d-flex  container" style={{background:"white", borderRadius:"30px"}}>
                        <div class="row"> 

                            <img src={dn5} class="pr-3 pt-3 pb-3 col" style={{ width:"380px", height:"400px",borderRadius:"30px"}} />
                            <div class="col align-items-center ">
                                <h4 class="pt-2">Tết</h4>
                                <p  class="w3-sans-serif ">Cứ mỗi dịp Tết đến,
                                 Xuân về nhằm giúp học sinh có thêm không gian trải 
                                 nghiệm về ngày Tết cổ truyền của dân tộc, ntrung tâm anh ngữ SLC
                                 tổ chức các hoạt động: gian hàng trang trí theo phong cách Tết cổ truyền, phiên chợ Tết, các trò chơi dân gian… Đây không chỉ là hoạt động trải nghiệm trong chương trình giáo dục phổ thông mới mà còn giáo dục cho học sinh nét đẹp truyền thống, 
                                văn hóa Tết cổ truyền của dân tộc. </p>
                            </div>
                        </div>
                    </div>

                    <div class=" d-flex  container" style={{background:"white", borderRadius:"30px"}}>
                        <div class="row"> 

                            <img src={dn6} class="pr-3 pt-3 pb-3 col" style={{ width:"380px", height:"400px",borderRadius:"30px"}} />
                            <div class="col align-items-center ">
                                <h4 class="pt-2">hallowen</h4>
                                <p  class="w3-sans-serif ">Dã ngoại là một hoạt động đặc biệt ý nghĩa và hữu ích đối với học sinh. Tham gia vào các chuyến dã ngoại không chỉ giúp các em thư giãn sau những giờ học căng thẳng mà còn mang lại nhiều lợi ích giáo dục và phát triển toàn diện.</p>
                            </div>
                        </div>
                    </div>
                    
                    
                </div>
                <HomeFooter />
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(event_more));
