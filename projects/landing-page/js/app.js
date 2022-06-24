/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
const navBar = document.querySelector('ul');
const sectionList = document.querySelectorAll('section');
const header = document.querySelector('.page__header');
const backTopBtn = document.querySelector('.scroll__top');
const navIcon = document.querySelector('#navbar__btn');

const secObjRect = {};
let navLinkList;
let timerActState; 
let timerHeader;
let timerBtn;
/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
/*
creating and preparing the nav item
*/
function buildNavItems(section){
    // creating li and a elements
    const navItem = document.createElement('li');
    const navLink = document.createElement('a');

    // set each element, its classes, inner content, attributes
    // get the title from the data set of each link
    const linkText = section.dataset.nav;
    const link_href = section.getAttribute('id');

    // setting the a element text
    navLink.textContent = linkText;
    navLink.setAttribute('href', link_href);
    navLink.className = 'menu__link';
    
    // append each link to its item element 
    navItem.appendChild(navLink);
    this.appendChild(navItem);
}

/* show and hide the navigation list*/
function toggleNavList(){
    navBar.classList.toggle('flex');
    navBar.classList.toggle('inline-right');
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/


// build the nav
function buildNavBar(){
    // creating a fragment for nav items
    const fragment = document.createDocumentFragment();
    // creating and appending nav items to the fragment
    sectionList.forEach(buildNavItems, fragment)

    // appending the fragment to the navbar
    navBar.appendChild(fragment);
    // assignment of the navbar links after being created
    navLinkList = document.querySelectorAll('a');
}

// Add class 'active' to section when near top of viewport

function addActiveClass(){
    sectionList.forEach(function (section){
        // get the current top location of the section
        const scrollTop = section.querySelector('h2').getBoundingClientRect().top;
        // adding active state relative to top value 
        if (scrollTop > -200 && scrollTop < 300){
            section.classList.add('your-active-class');
        } else {
            section.classList.remove('your-active-class');
        }
    })

}

// Scroll to anchor ID using scrollTO event
function defSectionsLocation(){
    // store each location section inside secobjRect 
    sectionList.forEach(function (section){
        secObjRect[section.dataset.nav] = section.getBoundingClientRect().top;
    })
}
function scrollToSection(e){
    // stop action of a tag
    e.preventDefault();
    
    // get the section location
    const secLocation = secObjRect[e.target.textContent];
    // scrolling to the section by window.scrollTo
    window.scrollTo({
        top: secLocation,
        left: 0,
        behavior: 'smooth'
      });

}
function scrollActions(){
    if (window.scrollY !== 0){
        // hide navbar when not scrolling
        header.classList.add('hidden');
        // toggle appearnce of back-to-top button
        if (window.scrollY <= 500){
            backTopBtn.classList.add('hidden');
        } else {
            backTopBtn.classList.remove('hidden');
        }
    } else{
        backTopBtn.classList.add('hidden');
    }
}
/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildNavBar();
// Scroll to section on link click

//collect each section location
defSectionsLocation();

//setting the event handler for each link
navLinkList.forEach(function(navLink){
    // scroll to each section
    navLink.addEventListener('click', scrollToSection);
})
// Set sections as active
document.addEventListener('scroll', function (){
    // throttling the event using setTimeout && clearTimeout
   
    header.classList.remove('hidden');
    if (timerActState){
        clearTimeout(timerActState)
    }
    timerActState = setTimeout(function (){
        //add active state
        addActiveClass();
        // manipulating the dom depending on scrolling
        scrollActions();
    }, 100);

})

// Scroll to top
navIcon.addEventListener('click', toggleNavList)
backTopBtn.addEventListener('click', function (){
    window.scrollTo(0,0);
})