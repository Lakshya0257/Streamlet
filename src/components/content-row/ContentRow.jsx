import './ContentRow.scss';
import MovieCard from '../movie-card/MovieCard';
function ContentRow(){
    return (
        <div class="movie-row">
            <div className="movies-content" data-mouse-down-at="0" data-prev-percentage="0">
                <MovieCard/>
                <MovieCard/>
                <MovieCard/>
                <MovieCard/>
                <MovieCard/>
                <MovieCard/>
                <MovieCard/>
                <MovieCard/>
                <MovieCard/>
                <MovieCard/>
                <MovieCard/>
                <MovieCard/>
                <MovieCard/>
            </div>
            <div className="layer"></div>
        </div>
    )
}

export default ContentRow;