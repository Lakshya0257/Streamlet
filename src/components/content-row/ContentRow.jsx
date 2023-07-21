import './ContentRow.scss';
import MovieCard from '../movie-card/MovieCard';
import { For } from 'solid-js';
function ContentRow({content}){

    // function scrollAnimation(target){
    //     const scrollWidth = target.scrollWidth;
    //   const clientWidth = target.clientWidth;
    //   const scrollLeft = target.scrollLeft;
  
    //   const scrollPercentage = (scrollLeft / (scrollWidth - clientWidth)) * 100;
    

    //   const images=target.querySelectorAll(".thumbnails");
    //   images.forEach((image)=>{
    //     image.animate({
    //         objectPosition:`${100-scrollPercentage}% 50%`
    //     },{duration:1200,fill:"forwards"})
    //   })
    // }

    console.log(content);
    return (
        <div class="movie-row">
            <div className="movies-content" data-mouse-down-at="0" data-prev-percentage="0" >
                <For each={content}>{movie=>{
                    return <MovieCard mo_de={movie}></MovieCard>
                }}</For>
            </div>
            <div className="layer"></div>
        </div>
    )
}

export default ContentRow;