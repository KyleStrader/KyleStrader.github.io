const AnimDirection = {
  _left: 0,
  _right: 1,
  _up: 2,
  _down: 3,

  left: { forward: 0, reverse: 1 },
	right: {forward: 1, reverse: 0},
	up: {forward: 2, reverse: 3},
	down: {forward: 3, reverse: 2}
}

const Pattern = [
  AnimDirection.left, 
  AnimDirection.left, 
  AnimDirection.left, 
  AnimDirection.left
];

var slideIndex = 0;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {

  slideIndex += n;
  showSlides(slideIndex, Pattern[slideIndex], n < 0);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function setDisplay(element, isBlockDisplay) {
  if (element.style.display === 'none' && isBlockDisplay) {
    for(let i = 0; i < element.childNodes.length; ++i) {
      let slideDescription = element.childNodes[i];
      console.log(slideDescription.classList);
      if($(slideDescription).classList && $(slideDescription).hasClass('slide-description')) {
        for(let i = 0; i < slideDescription.childNodes.length; ++i) {
          if (element.childNodes[i].className !== undefined
            && ($(element.childNodes[i]).hasClass("description-title") 
            || $(element.childNodes[i]).hasClass("description-phrase"))) {
              element.childNodes[i].classList.remove('animated');
              void element.childNodes[i].offsetWidth;
              element.childNodes[i].classList.add('animated');
          }
        }
      }
    }
  }
  element.style.display = isBlockDisplay ? "block" : "none";
}

function showSlides(n, animDirection, isReversed) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n >= slides.length) {slideIndex = 0} 
  if (n < 0) {slideIndex = slides.length - 1};
  console.log(slideIndex);
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  
  if (animDirection) {
    let rawDirection = isReversed ? animDirection.reverse : animDirection.forward;
    let prevSlideIndex = (slideIndex + (isReversed ? 1 : -1)) % slides.length; 
    if (prevSlideIndex >= slides.length) {prevSlideIndex = 0} 
    if (prevSlideIndex < 0) {prevSlideIndex = slides.length - 1}
    setDisplay(slides[slideIndex], true);
    setDisplay(slides[prevSlideIndex], true);
    switch(rawDirection) {
      case AnimDirection.left.forward:
        slides[slideIndex].className = 'mySlides animated fadeInRight'; 
        slides[prevSlideIndex].className = 'mySlides animated fadeOutLeft';
        break;
      case AnimDirection.right.forward:
        slides[slideIndex].className = 'mySlides animated fadeInLeft'; 
        slides[prevSlideIndex].className = 'mySlides animated fadeOutRight';
        break;
      case AnimDirection.up.forward:
        slides[slideIndex].className = 'mySlides animated fadeInDown'; 
        slides[prevSlideIndex].className = 'mySlides animated fadeOutUp';
        break;
      case AnimDirection.down.forward:
        slides[slideIndex].className = 'mySlides animated fadeInUp'; 
        slides[prevSlideIndex].className = 'mySlides animated fadeOutDown';
        break;
      default:
        break;
    }
  } else {
    slides[slideIndex].className = 'mySlides animated fadeIn';
    setDisplay(slides[slideIndex], true);
  }

  dots[slideIndex].className += " active";
}