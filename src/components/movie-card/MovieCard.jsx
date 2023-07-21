import './MovieCard.scss'
function MovieCard({mo_de}){
    return (
        <div class="movie-card" >
            <img src={"https://image.tmdb.org/t/p/w500"+mo_de['poster_path']} alt="" draggable="false" class='thumbnails' />
            <h1>Movie Name</h1>
            <div className="des">
                <p>2018</p>
                <div>
                    <p>❤️ 7800</p>
                <p>⭐ 7.8</p>
                </div>
            </div>
        </div>
    )
}

export default MovieCard;