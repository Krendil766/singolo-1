
//action by clicking on navigation menu
document.querySelector('.header__navigation').addEventListener('click', selectNavigationLink);

//slider buttons action
let isEnabled = true;
document.querySelector('.slider__btn_left').addEventListener('click', () => changeSlide('left'));
document.querySelector('.slider__btn_right').addEventListener('click', () => changeSlide('right'));

//action by pressing phone button
document.querySelectorAll('.phone__btn').forEach( element => {
    element.addEventListener('click', () => {
        let screen = element.parentElement.querySelector('.phone__screen');
        if (screen.style.opacity === "0") {
            screen.style.opacity = "1";
        } else {
            screen.style.opacity = "0";
        }
    });
});

//tab switching
document.querySelectorAll('.tag').forEach( element => {
    element.addEventListener('click', switchTab);
});


function selectNavigationLink(event) {
    document.querySelectorAll('.navigation__link').forEach( element => {
        element.classList.remove('active');
    });

    if (event.target.tagName === "A") {
        event.target.parentElement.classList.add('active');
        window.scrollBy(0, 95); 
    }
}


function changeSlide (direction) {
    if(!isEnabled) return;
    isEnabled = false;

    let activeSlide = document.querySelector('.slider__slide.active');
    let nextSlide = null;
    let activeSlideX = activeSlide.offsetLeft;
    let nextSlideX = activeSlide.offsetWidth;
    let slideSpeed = 34;

    if (direction === 'right') {
        nextSlide = activeSlide.nextElementSibling || activeSlide.parentElement.firstElementChild;
        nextSlide.style.left = `${activeSlide.clientWidth}px`;
        activeSlideX = activeSlide.offsetLeft;
        nextSlideX = activeSlide.offsetWidth;
        slideSpeed *= -1;
    } else if (direction === 'left'){
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

        if (nextSlide.offsetLeft === 0) {
            clearInterval(moveSlides);
            isEnabled = true;
        }
    }, 1000/60);

    nextSlide.classList.add('active');
    activeSlide.classList.remove('active');
}


function switchTab(event) {
    if(event.target.classList.contains('tag_selected')) return;

    document.querySelectorAll('.tag').forEach( element => {
        element.classList.remove('tag_selected');
        element.classList.add('tag_bordered');
    });

    event.target.classList.add('tag_selected');

    let projects = Array.from(document.querySelectorAll('.project'));


    projects = shuffle(projects);

    document.getElementById('projects').innerHTML = '';
    projects.forEach( project => {
        console.log('xnj')
        document.getElementById('projects').append(project);
    });

    function shuffle(arr){
        var compare = shufleComparator();
        return arr.sort(compare);
        
        function shufleComparator(){
            var cache = [];
            return function(a, b){
                putToCache(a, cache);
                putToCache(b, cache);
                return cache.indexOf(b) - cache.indexOf(a);
            }
        }

        function putToCache(elem, cache){
            if(cache.indexOf(elem) != -1){
                return;
            }
            var i = Math.floor(Math.random()*(cache.length + 1));
            cache.splice(i, 0, elem);
        }
    }
}