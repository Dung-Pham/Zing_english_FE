import React from 'react';
import "./tag-event.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TagEvent = ({ date, description, imageSrc }) => {
  return (
    <div className="tag-event">
      <section className="masked-event-image">
        <img
          className="img-event-content"
          loading="lazy"
          alt=""
          // 
          src='https://scontent.fhan14-1.fna.fbcdn.net/v/t1.6435-9/42748887_169722370573500_3342867359663652864_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHe8JImdg0oi7DC0TInPACf9tEeETdMSNP20R4RN0xI07w4t3w99Xp_BRIvwv_b_PK1pmEiVPuD2MyRcmowIGQF&_nc_ohc=ZJkW-wjsAMQAb7pTs3C&_nc_ht=scontent.fhan14-1.fna&oh=00_AfD0hcv971XxG2XfSZfqD3uxH512Ls0zTbD4AxX5U0isjg&oe=66442E68'
        />
      </section>
      <section className='container'>
        <div className='content-container'>
        <p className="txt-content name-content  ">
          {description}
        </p>
        </div>
      </section >
    </div >
  );
};

export default TagEvent;