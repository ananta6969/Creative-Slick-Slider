// Init Slick nav slider
$('.js-nav-slider').slick({
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  variableWidth: true,
  responsive: [
    {
      breakpoint: 1150,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      }
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        speed: 400,
        variableWidth: false
      }
    }
  ]
});

// Build custom numbered dots
const totalSlides = $('.image-slider-col').length;
for (let i = 0; i < totalSlides; i++) {
  $('.custom-dots').append(`<span>${i + 1}</span>`);
}

// Set initial active
$('.image-slider-col').eq(0).addClass('current');
$('.custom-dots span').eq(0).addClass('active');

// Function to get item height based on screen size
function getItemHeight() {
  const width = window.innerWidth;
  if (width <= 767) return 55;    // Mobile
  if (width <= 1150) return 62;   // Tablet
  return 62;                      // Desktop
}

// Function to move animate-title__list
function moveTitle(index) {
  const itemHeight = getItemHeight();
  const offset = -index * itemHeight;
  $('.animate-title__list').css('transform', `translateY(${offset}px)`);
}

// Function to update blurred background
function updateBackground(index) {
  const $slider = $('.js-image-slider');
  const $bgBlur = $('.slider-container__flex .bg-blur');
  const $currentImg = $slider.find('.image-slider-col').eq(index).find('img');
  const imgSrc = $currentImg.attr('src');

  if (imgSrc) {
    $bgBlur.css('background-image', `url(${imgSrc})`);
  }
}

// Sync current slide with dots, image, and background
$('.js-nav-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
  $('.image-slider-col').removeClass('current');
  $('.image-slider-col').eq(nextSlide).addClass('current');

  $('.custom-dots span').removeClass('active');
  $('.custom-dots span').eq(nextSlide).addClass('active');

  moveTitle(nextSlide);
  updateBackground(nextSlide);
});

// Click dots to jump to slide
$('.custom-dots').on('click', 'span', function() {
  const index = $(this).index();
  $('.js-nav-slider').slick('slickGoTo', index);
  moveTitle(index);
  updateBackground(index);
});

// Adjust title height dynamically on resize
$(window).on('resize', function() {
  const activeIndex = $('.custom-dots span.active').index() || 0;
  moveTitle(activeIndex);
});

// Set initial title position and background
moveTitle(0);
updateBackground(0);