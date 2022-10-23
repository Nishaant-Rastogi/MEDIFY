import React from 'react';
import { Carousel } from 'react-bootstrap';

function AdCarousel() {
  return (
    <div>
      <Carousel className="CAROUSEL" variant="dark" indicators={false}>
        <Carousel.Item>
          <img
            className="d-block w-100 CAROUSELIMG"
            src="/ad1.png"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 CAROUSELIMG"
            src="/advertise2.png"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 CAROUSELIMG"
            src="/advertise3.png"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  )
}

export default AdCarousel