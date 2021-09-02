

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal'); //selectez tot panoul cu login
const overlay = document.querySelector('.overlay'); // slectez partea din spatele panoului adica siteul care e blurat
const btnCloseModal = document.querySelector('.btn--close-modal'); // asta ii "X" de pe care inchid panoul login
const btnsOpenModal = document.querySelectorAll('.btn--show-modal'); // astea sunt butoanele de login din site(pe care trebuie sa apesi)

const openModal = function () { // functia care iti deschide panoul
  modal.classList.remove('hidden');  //lui modal ii elimin clasa de hidden(care il ascunde la inceput)
  overlay.classList.remove('hidden'); // la fel si la overlay ii elimina clasa de hidden care il ascunde
                                      // deci in concluzie aceasta functie imi deschide panoul de login si imi blureaza background uls
};

const closeModal = function () { // functia care iti inchide panoul login
  modal.classList.add('hidden'); // lui modal ii atribui clasa de hidden(adica il fac ca la inceput invizibil)
  overlay.classList.add('hidden'); // la fel si la overlay il elimin(il fac invizibil)
                                    // in concluzie functia inchide panoul login si elimina background blurat
};

for (let i = 0; i < btnsOpenModal.length; i++) //cu acest for parcurg ambele butoane de login(sunt 2 pe site) si cand dau 
  btnsOpenModal[i].addEventListener('click', openModal);//click pe ele se declanseaza functia openModal care deschide panoul

btnCloseModal.addEventListener('click', closeModal);//X-ului aceluia din panoul ii atribui functia closeModal(care il inchide)
overlay.addEventListener('click', closeModal);//cand dau click in afara panoului(pe site ul din spate blurat) se inchide fereastra(se aplica functia closeModal), overlay-ul e in spatele ferestrei

document.addEventListener('keydown', function (e) { // cand apas tasta "ESC" se inchide fereastra
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {//cand apas "ESC" si cand clasa hidden nu este aplicata 
    closeModal(); // inchid fereastra
  }
});




const message = document.createElement('div'); // creez un div nou
message.classList.add('cookie-message'); // ii atribui clasa cookie-message 
message.innerHTML = "We use cookies for improved functionality  and analystics. <button class='btn btn--close-cookie'>Got it!</button>";  // ii atribui textul si butonul de langa 
//document.querySelector('header').prepend(message); // il afisez deasupra headerului
document.querySelector('header').append(message); // il afisez sub header


document.querySelector('.btn--close-cookie').addEventListener('click', function(){ // selctez butonul "Got it" si cand il apas dispare tot mesajul
    message.remove();
});

message.style.backgroundColor = '#37383d';
message.style.width = '104%';

console.log(getComputedStyle(message).color); // afiseaza coloarea textului 

message.style.height = '100px';
message.style.marginBottom= '10px';



const btnScrollto = document.querySelector('.btn--scroll-to'); // butonul pe care dau
const section1 = document.querySelector('#section--1'); // locul unde vr sa dau scroll


btnScrollto.addEventListener('click', function(){

    section1.scrollIntoView({behavior:'smooth'}); // cand dau pe butonul de mai sus, se da scroll smooth la acea sectiune

});

//const h1= document.querySelector('h1'); //selectez un titlu
//function h1alert(){
//  alert('Salut');  //imi da alert
//  h1.removeEventListener('mouseenter',h1alert);  // sterge functia 
//}
//h1.addEventListener('mouseenter',h1alert); //cand tin mouse ul peste titlu apare alerta, dar doar o sigura data



const tabs = document.querySelectorAll('.operations__tab'); //cele 3 butoane
const tabsContainer = document.querySelector('.operations__tab-container');  //toate cele 3 butoane la un loc
const tabsContent = document.querySelectorAll('.operations__content'); // contentul fiecarui buton

tabsContainer.addEventListener('click',function(e){

    const cliked = e.target.closest('.operations__tab'); //selectez cel mai apropiat element de clasa respectiva

    //Guard clause
    if(!cliked) return;   //sa nu mi dea eroare daca dau click intre butoane

    //Active tab
    tabs.forEach(t => t.classList.remove('operations__tab--active')) //parcurg toate butoanele si le sterg clasa
    cliked.classList.add('operations__tab--active'); // parcurg toate butoanele si le adaug clasa


    //ACTIVE CONTENT

    tabsContent.forEach(i => i.classList.remove('operations__content--active'));
    document.querySelector(`.operations__content--${cliked.dataset.tab}`).classList.add('operations__content--active');
});





//HOVER EFFECT NAV BAR
const nav = document.querySelector('.nav'); // selectez toata bara de sus(navigatia)

function hover(e,opacity) {
  if (e.target.classList.contains('nav__link')) { //selctez din nav doar acei termneni care au clasa 'nav__link'
    const link = e.target; //termenul pe care se pune clickul
    const siblings = link.closest('.nav').querySelectorAll('.nav__link'); //elemenetele care au aceasi clasa cu '.nav__link', adica frati
    const logo = link.closest('.nav').querySelector('img'); //logo ul

    siblings.forEach(el => { //parcurg toate elementele 
      if (el !== link) el.style.opacity = opacity; //schimb opacity daca elemtul selectat e dif de link
    });
    logo.style.opacity = opacity; //schimb opacity logo-ului
  }
}
nav.addEventListener('mouseover', function(e){ //cand ating cu mouse ul cel selectat ramane la fel,restu opacity=0.5
    hover(e,0.5);
});

nav.addEventListener('mouseout', function(e){ //cand indepartez mouse ul totul revine la normal
  hover(e,1);
});






//Sticky Navigation
/*
var coords = section1.getBoundingClientRect(); //selectez coordonatel punctului dorit

window.addEventListener('scroll', function(){ //adaug event de scroll
    if(window.scrollY > coords.top){ //daca am ajuns cu scroll-ul la locul dorit atasam nav bar-ului clasa sticky
      nav.classList.add('sticky');
    }else{
      nav.classList.remove('sticky'); //daca nu am ajuns o elimin
    }
});
*/
const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);







//Reveal section


const allSection = document.querySelectorAll('.section'); //selectez toate sectiunile

const revealSection = function(entries, observer){
    const [entry] = entries;
    //console.log(entry);
    if(!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');

    observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root:null,
  threshold: 0.15,
});


allSection.forEach(function(section){
    sectionObserver.observe(section);
    section.classList.add('section--hidden');
});









// Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]'); //selectez toate imaginile care sunt adugate in html cu data-src

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return; //daca nu am ajuns cu scroll ul al punctul dorit nu se intampla nimic

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src; //cand ajugem inlocuim src cu data-src

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');   //cand s-a schimbat eliminam clasa lazy-img pt a nu mai fi blurate
  });

  observer.unobserve(entry.target); //dupa ce am trecut de toate oprim procesul pt a nu merge la infinit
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null, //astea sunt optiunile 
  threshold: 0,   //asta ne spune de unde sa inceapa executia 
  rootMargin: '-200px', // la cati pixeli de imagine sa se declanseze functia
});

imgTargets.forEach(img => imgObserver.observe(img)); //parcurg toate imaginile si aplic functia de mai sus pt a functiona tot








//SLIDER


var slides = document.querySelectorAll('.slide'); //selectez fiecare slide
var slider = document.querySelector('.slider'); //le selectez pe toate la un loc
const btnLeft = document.querySelector('.slider__btn--left'); //butoanele de stanga dreapta
const btnRight = document.querySelector('.slider__btn--right');
let curSlide = 0; //slide ul curent (0 pt ca incepem cu primul)
var maxSlide = slides.length; //lungimea silede-urilor (cate sunt)


//slider.style.transform= 'scale(0.3)';
//slider.style.overflow= 'visible';


  slides.forEach((s,i) => (s.style.transform = `translateX(${100*i}%)`)); //le trece in ordine(sa nu se suprapuna)


function nextSlide(){ //trece la urm slide
  if(curSlide === maxSlide-1){  //daca am ajuns la sf slideurilor 
    curSlide=0; //trecem la primul
  }else{
    curSlide++; //daca nu continuam
  }
    
  slides.forEach((s,i) => (s.style.transform = `translateX(${100*(i-curSlide)}%)`)); //parcurg slideurile si le schimb pozitia
}


function prevSlide(){ //trece spre staga, la anteriorul
  if(curSlide === 0) //ca mai sus doar invers
  {
    curSlide = maxSlide-1;
  }else{
    curSlide--;
  }
  
  slides.forEach((s,i) => (s.style.transform = `translateX(${100*(i-curSlide)}%)`));//parcurg slideurile si le schimb pozitia
}


btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown',function(e){

      if(e.keyCode === 37){
        prevSlide();
      }else if(e.keyCode === 39){
        nextSlide();
      }
      
})
























