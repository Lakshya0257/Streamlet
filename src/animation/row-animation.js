const track=document.getElementById("image-track");
window.onmousedown=(e)=>{
    track.dataset.mouseDownAt=e.clientX;
    console.log(e.clientX);
}

window.onmouseup=(e)=>{
    track.dataset.mouseDownAt="0";
    track.dataset.prevPercentage=track.dataset.percentage;
    
}

window.onmousemove=(e)=>{
    if(track.dataset.mouseDownAt==="0"){
        return;
    }
    
// console.log("e");
    const mouseDelta=parseFloat(track.dataset.mouseDownAt)-e.clientX,
          maxdelta=window.innerWidth/2;
    const percentage=(mouseDelta/maxdelta)*-100;
    let nextpercentage=parseFloat(track.dataset.prevPercentage)+percentage;
    nextpercentage=Math.max(nextpercentage,-100);
    nextpercentage=Math.min(nextpercentage,0);      
    track.dataset.percentage=nextpercentage;
    
    track.animate({
        transform:`translate(${nextpercentage}%,0%)`
    },{duration:1200,fill:"forwards"})
    for (const images of document.getElementsByClassName("thumbnails")){
        console.log(nextpercentage+100);
        images.animate({
            objectPosition:`${nextpercentage+100}% 50%`
        },{duration:1200,fill:"forwards"})
    }
}