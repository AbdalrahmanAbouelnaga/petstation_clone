import React from 'react'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css"
import 'slick-carousel/slick/slick-theme.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft,faChevronRight } from '@fortawesome/free-solid-svg-icons'

const PrevArrow = (props)=>{
  const { className, style, onClick } = props;

  return (
    <a className={`carousel-arrow left `} onClick={onClick}>
    <FontAwesomeIcon icon={faChevronLeft} />
    </a>
    )
}


const NextArrow = (props)=>{
  const { className, style, onClick } = props;

  return (
    <a className={`carousel-arrow right `} onClick={onClick}>
    <FontAwesomeIcon icon={faChevronRight} />
    </a>
    )
}


export const Carousel = ({carousel}) => {
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      speed: 700,
      autoplaySpeed: 3000,
      cssEase: "linear"
      };
      return (
        <div>
          <Slider {...settings}>
            {
                carousel.map(item=>(
                    <a href={item.url} className="carousel-link">
                        <img src={item.image} alt={item.title} className="carousel-img" />
                    </a>
                ))
          }
          </Slider>
        </div>
      );
}
