import $ from 'jquery';
import 'slick-carousel';

// CAROUSEL
const slides = document.querySelector('.carousel-slides');

$('.carousel-slides').slick({
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 431,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
});
