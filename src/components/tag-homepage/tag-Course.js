import React from 'react';
import "./tag-Course.scss";

const TagCourse = ({ date, description,d2, imageSrc }) => {
  return (
    <div className="tag-course">
      <section className="masked-course-image">
        <img
          className="img-course-content"
          loading="lazy"
          alt=""
          src={imageSrc}
        />
      </section>
      <section className='container'>
        <div className='content-container'>
        <p className=" txt-content date-content  ">
          {/* {description}           */}
          15/03/2024
        </p>
        <p className="txt-content name-content  ">
          {description}
        </p>
        <p className="txt-content description-content ">
          {/* {description}  */}
          {d2}
          {/* I am an ambitious workaholic, but apart from that, pretty simple person. */}
        </p>
        
        <div className='btn-container'>
          <button className="btn btn-primary " >
            
            <p className='btn-txt'>Đăng kí khóa học</p>
          </button>
          
        </div>
        </div>
      </section >
    </div >
  );
};

export default TagCourse;