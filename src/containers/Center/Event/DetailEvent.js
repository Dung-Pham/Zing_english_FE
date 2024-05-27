import React, { Component } from 'react';
import { connect } from "react-redux";
import './DetailEvent.scss'
import HomeHeader from '../../HomePage/HomeHeader';
import { getDetailEventById } from '../../../services/userService'
import _ from 'lodash';
import HomeFooter from '../../HomePage/HomeFooter'
<HomeFooter />
class DetailEvent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            
            dataDetailEvent: {},
            listProvince: []
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id
            // let location = e.target.value

            let res = await getDetailEventById(id);
            
            if (res && res.errCode === 0) {             
                  this.setState({
                    dataDetailEvent: res.data,
                    
                })
            }
        }
    }

    componentDidUpdate(prevProps) {

    }

    handleOnChangeSelect = async (e) => {
        
    }

    render() {
        let { dataDetailEvent } = this.state
        console.log('check state: ', dataDetailEvent)
        return (
            <div className='detail-event-container'>
                <HomeHeader />
                <div className='detail-event-body'>
                    <div className='description-event'>
                        
                        <div>
                            <div>{dataDetailEvent.EventName}</div>
                            <p>{dataDetailEvent.Description}</p>
                        </div>
                    </div>
                </div>
                <HomeFooter />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailEvent);
