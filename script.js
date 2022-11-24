const imgContainer = document.querySelector(".list");
const imgLists = Array.from(imgContainer.children);
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");
const dotsContainer = document.querySelector("#btn-list");
const dots = Array.from(dotsContainer.children);

const imgWidth = imgLists[0].getBoundingClientRect().width;

const setImgPosition = (img, index) => {
    img.style.left = imgWidth * index + "px";
};

imgLists.forEach(setImgPosition);

const moveToImg = (imgContainer, currentImg, targetImg) => {
    imgContainer.style.transform = "translateX(-" + targetImg.style.left + ")"; 
    currentImg.classList.remove("current-img");
    targetImg.classList.add("current-img");
}

const updateDot = (currentDot, targetDot) =>{
    currentDot.classList.remove("current-btn");
    targetDot.classList.add("current-btn");
}

const hideShowBtn = (imgLists, prev, next, targetIndex)=>{
    if(targetIndex === 0){
        prev.classList.add("hidden");
        next.classList.remove("hidden");
    }
    else if(targetIndex === imgLists.length - 1){
        prev.classList.remove("hidden");
        next.classList.add("hidden");
    }
    else{
        prev.classList.remove("hidden");
        next.classList.remove("hidden");
    }
}

next.addEventListener("click", (e) => {
    const currentImg = imgContainer.querySelector(".current-img");
    const nextImg = currentImg.nextElementSibling;
    const currentDot = dotsContainer.querySelector(".current-btn");
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = imgLists.findIndex((img) => img === nextImg)
    
    moveToImg(imgContainer, currentImg, nextImg);
    updateDot(currentDot, nextDot);
    hideShowBtn(imgLists, prev, next, nextIndex)
})

prev.addEventListener("click",(e)=>{
    const currentImg = imgContainer.querySelector(".current-img");
    const prevImg = currentImg.previousElementSibling;
    const currentDot = dotsContainer.querySelector(".current-btn");
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = imgLists.findIndex((img) => img === prevImg)

    moveToImg(imgContainer, currentImg, prevImg);
    updateDot(currentDot, prevDot)
    hideShowBtn(imgLists, prev, next, prevIndex)
})

dotsContainer.addEventListener("click",(e)=>{
   const targetDot = e.target.closest("button")
   if(!targetDot){
    return;
   };

   const currentImg = imgContainer.querySelector(".current-img");
   const currentDot = dotsContainer.querySelector(".current-btn");
   
   const targetIndex = dots.findIndex((dot) => dot === targetDot);
   const targetImg = imgLists[targetIndex]

   moveToImg(imgContainer, currentImg, targetImg);
   updateDot(currentDot, targetDot);
   hideShowBtn(imgLists, prev, next, targetIndex)
})
