const track=document.querySelectorAll(".movies-content");
const homepageContent=document.getElementById("hpc");

homepageContent.addEventListener('scroll', (event) => {

    const layer=document.getElementById("hpl");

    const percentage=Math.min((event.target.scrollTop/600)*1,1);

    // console.log(percentage);
    // layer.style.background = `linear-gradient(180deg, rgba(0, 0, 0, 0.313) 0%, rgb(0, 0, 0) 100%)`;

    layer.style=`background-color: rgba(0, 0, 0, ${percentage});`
});

track.forEach((div) => {
    div.addEventListener('scroll', (event) => {
      const scrollWidth = event.target.scrollWidth;
      const clientWidth = event.target.clientWidth;
      const scrollLeft = event.target.scrollLeft;
  
      const scrollPercentage = (scrollLeft / (scrollWidth - clientWidth)) * 100;

      console.log(scrollPercentage);
    

      const images=event.target.querySelectorAll(".thumbnails");
      images.forEach((image)=>{
        image.animate({
            objectPosition:`${100-scrollPercentage}% 50%`
        },{duration:1200,fill:"forwards"})
      })
    

    }
    );
  });




//   window.onmousedown=(e)=>{
//     track.dataset.mouseDownAt=e.clientX;
//     console.log(e.clientX);
// }


// window.onmouseup=(e)=>{
//     track.dataset.mouseDownAt="0";
//     track.dataset.prevPercentage=track.dataset.percentage;
    
// }

// window.onmousemove=(e)=>{
//     if(track.dataset.mouseDownAt==="0"){
//         return;
//     }
    
// // console.log("e");
//     const mouseDelta=parseFloat(track.dataset.mouseDownAt)-e.clientX,
//           maxdelta=window.innerWidth/2;
//     const percentage=(mouseDelta/maxdelta)*-100;
//     let nextpercentage=parseFloat(track.dataset.prevPercentage)+percentage;
//     nextpercentage=Math.max(nextpercentage,-100);
//     nextpercentage=Math.min(nextpercentage,0);      
//     track.dataset.percentage=nextpercentage;
    
//     track.animate({
//         transform:`translate(${nextpercentage}%,0%)`
//     },{duration:1200,fill:"forwards"})
//     for (const images of document.getElementsByClassName("thumbnails")){
//         console.log(nextpercentage+100);
//         images.animate({
//             objectPosition:`${nextpercentage+100}% 50%`
//         },{duration:1200,fill:"forwards"})
//     }
// }