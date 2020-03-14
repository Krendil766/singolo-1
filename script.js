



//action by clicking on the navigation menu
document.querySelector('.header__navigation').addEventListener('click', selectNavigationLink);

//slider buttons action
let isEnabled = true;
document.querySelector('.slider__btn_left').addEventListener('click', () => changeSlide('left'));
document.querySelector('.slider__btn_right').addEventListener('click', () => changeSlide('right'));


function selectNavigationLink(event) {
    document.querySelectorAll('.navigation__link').forEach( el => {
        el.classList.remove('active');
    });

    if(event.target.tagName === "A") {
        event.target.parentElement.classList.add('active');
        window.scrollBy(0, 95); 
    }
    
    console.log(event.target);
}

function changeSlide (direction) {
    if(!isEnabled) return;
    isEnabled = false;

    let activeSlide = document.querySelector('.slider__slide.active');
    let nextSlide = null;
    let activeSlideX = activeSlide.offsetLeft;
    let nextSlideX = activeSlide.offsetWidth;
    let slideSpeed = 34;

    if(direction === 'right') {
        nextSlide = activeSlide.nextElementSibling || activeSlide.parentElement.firstElementChild;
        nextSlide.style.left = `${activeSlide.clientWidth}px`;
        activeSlideX = activeSlide.offsetLeft;
        nextSlideX = activeSlide.offsetWidth;
        slideSpeed *= -1;
    } else if(direction === 'left'){
        nextSlide = activeSlide.previousElementSibling || activeSlide.parentElement.lastElementChild;
        nextSlide.style.right = `-${activeSlide.clientWidth}px`;
        activeSlideX = activeSlide.offsetLeft;
        nextSlideX = -activeSlide.offsetWidth;
    }
            
    let moveSlides = setInterval( () => {
        activeSlideX += slideSpeed;
        nextSlideX += slideSpeed;
         activeSlide.style.left = `${activeSlideX}px`;
        nextSlide.style.left = `${nextSlideX}px`;;

        if(nextSlide.offsetLeft === 0) {
            clearInterval(moveSlides);
            isEnabled = true;
        }
    }, 1000/60);

    nextSlide.classList.add('active');
    activeSlide.classList.remove('active');
}