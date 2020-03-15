
//action by clicking on navigation menu
document.querySelector('.header__navigation').addEventListener('click', selectNavigationLink);

//slider buttons action
let isEnabled = true;
document.querySelector('.slider__btn_left').addEventListener('click', () => changeSlide('left'));
document.querySelector('.slider__btn_right').addEventListener('click', () => changeSlide('right'));

//action by pressing phone button (turn on and off the screen)
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

//project selection
document.getElementById('projects').addEventListener('click', selectProject);

//submit form action
document.querySelector('.get-quote__form').addEventListener('submit', submitForm);
document.getElementById('confirm-btn').addEventListener('click', hideModal);
document.querySelector('.modal').addEventListener('click', event => {
    event.target.classList.contains('modal') && hideModal();
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

function selectProject(event) {
    if(event.target.parentElement.classList.contains('project')) {
        this.querySelectorAll('.selected').forEach( element => {
            element.classList.remove('selected');
        });
        event.target.classList.add('selected');
    }
}

function submitForm(event) {
    document.body.style.width = document.body.offsetWidth + 'px';
    document.body.style.overflow = 'hidden';

    let subject = document.getElementById('form-subject').value;
    let description = document.getElementById('project-description').value;

    document.querySelector('.modal__text').innerHTML = `The letter was sent <br>
    ${!!subject ? 'Subject: ' + subject : 'Without subject'}<br>
    ${!!description ? 'Description: ' + description : 'Without description'}`;
    
    document.querySelector('.modal').style.display = 'flex';

    event.preventDefault();
}

function hideModal(event) {
    // hide modal
    document.querySelector('.modal').style.display = 'none';
    // enable scroll
    document.body.style.overflow = 'auto';
    // reset form
    document.querySelector('.get-quote__form').reset();
}