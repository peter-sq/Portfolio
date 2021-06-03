window.addEventListener('load', () => {
    document.querySelector('.main').classList.remove('hidden');
    document.querySelector('.home-section').classList.add('active');
    // page Loader
    document.querySelector('.page-loader').classList.add('fade-out')
    setTimeout(() => {
        document.querySelector('.page-loader').classList.style.display = 'none'

    }, 600)

})

//Navbar Toggle
const navToggler = document.querySelector('.nav-toggler');
navToggler.addEventListener('click', () =>{
    hideSection();
    toggleNavbar();
    document.body.classList.toggle('hide-scrolling')

});
function hideSection(){
    document.querySelector("section.active").classList.toggle('fade-out');
}
function toggleNavbar(){
    document.querySelector('.header').classList.toggle('active');
}

//active section
document.addEventListener('click', (e) => {
    if(e.target.classList.contains('link-item') && e.target.hash !== ''){
        //active the overlay to avoid multiple click
        document.querySelector('.overlay').classList.add('active');
        navToggler.classList.add('hide');
        if(e.target.classList.contains('nav-item')){
           toggleNavbar();
        }
        else{
          hideSection();
          document.body.classList.add('hide-scrolling')
        }
        setTimeout(()=>{
            document.querySelector('section.active').classList.remove('active', 'fade-out')
            document.querySelector(e.target.hash).classList.add('active');
            window.scrollTo(0,0);
            document.body.classList.remove('hide-scrolling');
            navToggler.classList.remove('hide');
            document.querySelector('.overlay').classList.remove('active');

        }, 500);
    }
})

// about tabs
const tabsContainer = document.querySelector(".about-tabs"),
aboutSection = document.querySelector(".about-section");
tabsContainer.addEventListener("click", (e) => {
    if(e.target.classList.contains("tabs-item") && !e.target.classList.contains("active")){
        tabsContainer.querySelector(".active").classList.remove("active");
        e.target.classList.add("active");
        const target = e.target.getAttribute("data-target");
        aboutSection.querySelector(".tab-content.active").classList.remove("active");
        aboutSection.querySelector(target).classList.add("active");

        
    }
});

// portfolio item details pop-up
document.addEventListener('click', (e) => {
      if (e.target.classList.contains('view-project-btn')){
         togglePortfolioPopup();
         document.querySelector('.portfolio-popup').scrollTo(0,0);
         portfolioItemDetails(e.target.parentElement);
      }
})

function togglePortfolioPopup (){
    document.querySelector('.portfolio-popup').classList.toggle('open');
    document.body.classList.toggle('hide-scrolling');
    document.querySelector('.main').classList.toggle('fade-out');
}
document.querySelector('.pp-close').addEventListener('click', togglePortfolioPopup);

//hide popup when closing outside of it
document.addEventListener('click', (e)=> {
    if(e.target.classList.contains('pp-inner')){
        togglePortfolioPopup();
    };
})

function portfolioItemDetails(portfolioItem){
    document.querySelector('.pp-thumbnail img').src = 
    portfolioItem.querySelector('.portfolio-item-thumbnail img').src;

    document.querySelector('.pp-header h3').innerHTML = 
    portfolioItem.querySelector('.portfolio-item-title').innerHTML;

    document.querySelector('.pp-body').innerHTML = 
    portfolioItem.querySelector('.portfolio-item-details').innerHTML;

}

var TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };
  
  TxtRotate.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];
  
    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
  
    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
  
    var that = this;
    var delta = 300 - Math.random() * 100;
  
    if (this.isDeleting) { delta /= 2; }
  
    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }
  
    setTimeout(function() {
      that.tick();
    }, delta);
  };
  
  window.onload = function() {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-rotate');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtRotate(elements[i], JSON.parse(toRotate), period);
      }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);
  };



