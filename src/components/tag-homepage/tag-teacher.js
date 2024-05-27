import React from 'react';
import "./tag-teacher.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck ,faMessage} from '@fortawesome/free-solid-svg-icons';
import { faRocketchat } from '@fortawesome/free-brands-svg-icons';
import imgC from '../../assets/course/course-1.jpg';
const TagTeacher = ({ date, description, imageSrc }) => {
  let s=  require('../../assets/Teacher/teacher-2.jpg')
  if(imageSrc){
    let path = '../../assets/Teacher/teacher-2.jpg';
    // let path= '../../assets/Teacher/teacher-'+ imageSrc+'.jpg';
     s= require('../../assets/Teacher/teacher-'+ imageSrc+'.jpg');
    console.log(imageSrc);
  }
  return (
    <div className="tag-teacher">
      <section className="masked-teacher-image">
        <img
          className="img-teacher-content"
          loading="lazy"
          alt=""
          src={s.default}
         
        />
      </section>
      <section className='container'>
        <div className='content-container'>
        <p className="txt-content name-content  ">
          {description}
        </p>
        <p className=" txt-content position-content  ">
          {/* {description}           */}
          Giáo viên
        </p>
        <p className="txt-content description-content ">
          {/* {description}  */}
          Với kiến thức , kĩ năng và sự yêu nghề tôi sẽ giúp các bạn có thể giao tiếp tiếng anh 
        </p>
        <div className='btn-container'>
          <button className="btn" >
            <FontAwesomeIcon
              className='icon'
              icon={faMessage}
              // style={{ color: "#74C0FC", }}
              flip="horizontal"
              size="2xs"
            />
            <p className='btn-txt'>Thành tích</p>
          </button>
          <button className="btn chat-btn" >
            <FontAwesomeIcon
              className='icon'
              icon={faRocketchat}
              size="2xs"
              // style={{ color: "#74C0FC", }}
            />
            <p className='btn-txt'>Tư vấn</p>
          </button>
        </div>
        </div>
      </section >
    </div >
  );
};

export default TagTeacher;