import React from 'react';
import { Carousel } from 'react-bootstrap';

function AdCarousel() {
  return (
    <div>
      <Carousel className="CAROUSEL" variant="dark" indicators={false}>
        <Carousel.Item>
          <img
            className="d-block w-100 CAROUSELIMG"
            src="/static/images/Bill_M.png"
            style={{ height: '400px' }}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 CAROUSELIMG"
            src="/static/images/John.png"
            style={{ height: '400px' }}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 CAROUSELIMG"
            src="/static/images/Samuel.png"
            style={{ height: '400px' }}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  )
}

export default AdCarousel