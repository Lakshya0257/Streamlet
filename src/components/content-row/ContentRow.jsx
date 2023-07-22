import "./ContentRow.scss";
import { For, createSignal, onMount } from "solid-js";
function ContentRow({ content }) {

  onMount(() => {
    const track = document.querySelectorAll(".movies-content");
    track.forEach((div) => {
      div.addEventListener("scroll", (event) => {
        const scrollWidth = event.target.scrollWidth;
        const clientWidth = event.target.clientWidth;
        const scrollLeft = event.target.scrollLeft;

        const scrollPercentage =
          (scrollLeft / (scrollWidth - clientWidth)) * 100;

        const images = event.target.querySelectorAll(".thumbnails");
        images.forEach((image) => {
          image.animate(
            {
              objectPosition: `${100 - scrollPercentage}% 50%`,
            },
            { duration: 1200, fill: "forwards" }
          );
        });
      });
    });
  });
  return (
    <div class="movie-row">
      <div
        className="movies-content"
        data-mouse-down-at="0"
        data-prev-percentage="0"
      >
        <For each={content}>
          {(movie) => {
            return (
              <div class="movie-card">
                <img
                  src={
                    "https://image.tmdb.org/t/p/w500" +
                    movie["backdrop_path"]
                  }
                  alt=""
                  draggable="false"
                  class="thumbnails"
                />
                <h1>{movie["original_title"]}</h1>
                <div className="des">
                  <p>{movie["release_date"]}</p>
                  <div>
                    <p>❤️ {movie["popularity"]}</p>
                    <p>⭐ {movie["vote_average"]}</p>
                  </div>
                </div>
              </div>
            );
            // return <MovieCard mo_de={movie}></MovieCard>
          }}
        </For>
      </div>
      <div className="layer"></div>
    </div>
  );
}

export default ContentRow;
