//change of link activity by scroll
document.addEventListener('scroll', onScroll);

//slider buttons action
let isEnabled = true;
document.querySelector('.slider__btn_left').addEventListener('click', () => changeSlide('left'));
document.querySelector('.slider__btn_right').addEventListener('click', () => changeSlide('right'));

//action by pressing phone button (turn on and off the screen)
document.querySelectorAll('.phone_btn').forEach( element => {
    element.addEventListener('click', () => {
        let screen = element.parentElement.querySelector('.phone_screen');
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

//opening burger menu
document.querySelector('.hamburger').addEventListener('click', (e) => {
  e.currentTarget.classList.toggle('active');
  document.getElementById('navigation-block').classList.toggle('active');
  document.querySelector('.logo').classList.toggle('burger-active');
  document.body.classList.toggle('blocked');
});

//close burger menu
document.addEventListener('click', (e) => {
  let isBurgerActive = document.querySelector('.hamburger').classList.contains('active');
  if(isBurgerActive && e.target.tagName === 'A' || e.target.tagName === 'NAV') {
    document.querySelector('.hamburger').classList.toggle('active');
    document.getElementById('navigation-block').classList.toggle('active');
    document.querySelector('.logo').classList.toggle('burger-active');
    document.body.classList.remove('blocked');
  }
}, true);


function onScroll(event) {
    const curPos = window.scrollY;
    const sections = document.querySelectorAll('section');
    const links = document.querySelectorAll('.navigation_link a');

    sections.forEach( el => {
        if(el.offsetTop - 100 <= curPos && (el.offsetTop + el.offsetHeight - 100) > curPos) {
            links.forEach( a => {
                a.classList.remove('active');
                if(el.firstElementChild.getAttribute('name') === a.getAttribute('href').substring(1)) {
                    a.classList.add('active');
                }
            })
        }
    });
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
        nextSlide.style.left = `${nextSlideX}px`;

        if (Math.abs(nextSlide.offsetLeft) < Math.abs(slideSpeed)) {
            activeSlide.style.left = `${activeSlideX - nextSlide.offsetLeft}px`;
            nextSlide.style.left = `${nextSlideX - nextSlide.offsetLeft}px`;
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
            if(cache.indexOf(elem) !== -1){
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
    event.preventDefault();

    document.body.style.width = document.body.offsetWidth + 'px';
    document.body.style.overflow = 'hidden';

    let subject = document.getElementById('form-subject').value;
    let description = document.getElementById('project-description').value;

    if(checkEmail(document.forms[0].email.value)) {
        document.forms[0].email.classList.remove('invalid');
    } else {
        document.forms[0].email.classList.add('invalid');
        return;
    }

    document.querySelector('.modal__text').innerHTML = `The letter was sent <br>
    ${!!subject ? 'Subject: ' + subject : 'Without subject'}<br>
    ${!!description ? 'Description: ' + description : 'Without description'}`;

    document.querySelector('.modal').style.display = 'flex';
}

function checkEmail(value) {
    let pattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    return pattern.test(value);
}

function hideModal(event) {
    // hide modal
    document.querySelector('.modal').style.display = 'none';
    // enable scroll
    document.body.style.overflow = 'auto';
    // reset form
    document.querySelector('.get-quote__form').reset();
}

if (!window.ontouchstart) {
    document.querySelectorAll('a').forEach(el => el.classList.add('hover_none'));
}
