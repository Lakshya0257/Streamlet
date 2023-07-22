import './MovieCard.scss'
function MovieCard({mo_de}){
    console.log
    return (
        <div class="movie-card" >
            <img src={"https://image.tmdb.org/t/p/w500"+mo_de['poster_path']} alt="" draggable="false" class='thumbnails' />
            <h1>{mo_de['original_title']}</h1>
            <div className="des">
                <p>{mo_de['release_date']}</p>
                <div>
                    <p>❤️ {mo_de['popularity']}</p>
                <p>⭐ {mo_de['vote_average']}</p>
                </div>
            </div>
        </div>
    )
}

export default MovieCard;