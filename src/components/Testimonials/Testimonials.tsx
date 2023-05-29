import "./Testimonials.css";
// import Swiper core and required modules
import { Pagination } from "swiper";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const data = [
  {
    avatar: "picture01",
    name: "name01",
    review:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis totam soluta enim at cum, odio consequatur officia sapiente debitis nihil iuresunt rerum ex, inventore velit! Velit, veniam enim. Assumenda",
  },
  {
    avatar: "picture02",
    name: "name02",
    review:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis totam soluta enim at cum, odio consequatur officia sapiente debitis nihil iuresunt rerum ex, inventore velit! Velit, veniam enim. Assumenda",
  },
  {
    avatar: "picture03",
    name: "name03",
    review:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis totam soluta enim at cum, odio consequatur officia sapiente debitis nihil iuresunt rerum ex, inventore velit! Velit, veniam enim. Assumenda",
  },
  {
    avatar: "picture04",
    name: "name04",
    review:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis totam soluta enim at cum, odio consequatur officia sapiente debitis nihil iuresunt rerum ex, inventore velit! Velit, veniam enim. Assumenda",
  },
  {
    avatar: "picture05",
    name: "name05",
    review:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis totam soluta enim at cum, odio consequatur officia sapiente debitis nihil iuresunt rerum ex, inventore velit! Velit, veniam enim. Assumenda",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials">
      <h5>Review from Clients</h5>
      <h2>Testimonials</h2>

      <Swiper
        className="container testimonials__container"
        // install Swiper modules
        modules={[Pagination]}
        spaceBetween={40}
        slidesPerView={1}
        pagination={{ clickable: true }}
      >
        {data.map(({ avatar, name, review }, index) => {
          return (
            <SwiperSlide key={index} className="testimonial">
              <div className="client__avatar">
                <img src={avatar} />
              </div>
              <h5 className="client__name">{name}</h5>
              <small className="client__review">{review}</small>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default Testimonials;
