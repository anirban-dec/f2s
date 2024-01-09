const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".blog-icon i");
const firsCardWidth = carousel.querySelector(".cards").offsetWidth;
const carouselChilders = [...carousel.children];

let isDragging= false, startX, startScrollLeft, timeoutId;

let cardPerView = Math.round(carousel.offsetWidth / firsCardWidth);

carouselChilders.slice(-cardPerView).reverse().forEach(card =>{
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML)
});

carouselChilders.slice(0, cardPerView).forEach(card =>{
    carousel.insertAdjacentHTML("beforeend", card.outerHTML)
});

arrowBtns.forEach(btn=>{
    btn.addEventListener("click", ()=>{
        carousel.scrollLeft += btn.id === "left" ? -firsCardWidth : firsCardWidth;
    });
});

const dragStart = (e) =>{
    isDragging= true;
    carousel.classList.add("dragging");
    startX= e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging= (e)=>{
    if(!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () =>{
    isDragging = false;
    carousel.classList.remove("dragging");
}


const autoplay= ()=>{
    if(window.innerWidth < 800) return;
    timeoutId = setTimeout(()=>carousel.scrollLeft += firsCardWidth, 100);
}
autoplay();
   
const infinitescroll = () => {
    if(carousel.scrollLeft === 0){
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");

    }
     else if( Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }
}


clearTimeout(timeoutId);
if(!wrapper.matches(":hover")) autoplay();




carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infinitescroll);
wrapper.addEventListener("mouseenter", ()=> clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoplay);