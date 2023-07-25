import "./ContentRow.scss";
import { For, createSignal, onMount, Show } from "solid-js";
import { Motion, Presence } from "@motionone/solid";
import MovieDetail from "../movie-detail/MovieDetail";

function ContentRow(prop) {
  const [clicked, setClicked] = createSignal(false);
  const [left, setLeft] = createSignal(0);
  const [top, setTop] = createSignal(0);
  const [bgImage, setBackgroundImage] = createSignal("");
  const [objPos, setObjectPosition] = createSignal("");
  const [target, setTarget] = createSignal();

  function movieDetail(ev) {
    const target = ev.currentTarget;
    setTarget(target);
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Get the position of the clicked image relative to the viewport
    const rect = target.getBoundingClientRect();
    const offsetX = rect.left;
    const offsetY = rect.top;

    const styles = window.getComputedStyle(target);

    // Get the object-position CSS property value
    const objectPosition = styles.getPropertyValue("object-position");
    setObjectPosition(objectPosition);
    const src=target.src;
    const originalSrc = src.replace('/w500/', '/original/');

    setBackgroundImage(originalSrc);
    setLeft(offsetX);
    setTop(offsetY);
    setClicked(true);
    const thumbnails = document.querySelectorAll(".thumbnails");

    // Loop through each thumbnail and animate them
    thumbnails.forEach((thumbnail) => {
      // Skip the 'ev.target' element
      if (thumbnail !== target) {
        thumbnail.animate(
          [
            {
              opacity: 1,
              // Add any other animation properties as needed
            },
            {
              opacity: 0,
              // Add any other animation properties as needed
            },
          ],
          { duration: 300, fill: "forwards" }
        );
      }
    });

    console.log(screenWidth, screenHeight, offsetX, offsetY);
  }

  function handleChildClick() {
    setClicked(false);
    const thumbnails = document.querySelectorAll(".thumbnails");

    // Loop through each thumbnail and animate them
    thumbnails.forEach((thumbnail) => {
      // Skip the 'ev.target' element
      if (thumbnail !== target()) {
        thumbnail.animate(
          [
            {
              opacity: 0,
            },
            {
              opacity: 1,
            },
          ],
          { duration: 1300, fill: "forwards" }
        );
      }
    });
  }

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
        <For each={prop.content}>
          {(movie) => {
            return (
              <div class="movie-card">
                <img
                  onClick={movieDetail}
                  id={movie['id']}
                  src={movie["backdrop_path"]===null? "https://t4.ftcdn.net/jpg/02/86/32/31/360_F_286323187_mDk3N4nGDaPkUmhNcdBe3RjSOfKqx4nZ.jpg":
                    "https://image.tmdb.org/t/p/w500" +
                    movie["backdrop_path"]
                  }
                  alt=""
                  draggable="false"
                  class="thumbnails"
                />
                <h1>{movie["title"]}</h1>
                <div className="des">
                  <p>{movie["release_date"]}</p>
                  <div>
                    <p>❤️ {movie["popularity"]}</p>
                    <p>⭐ {movie["vote_average"]}</p>
                  </div>
                </div>
              </div>
            );
          }}
        </For>
      </div>
      <div className="layer"></div>
      <Presence exitBeforeEnter>
        <Show when={clicked() === true}>
          <Motion.div
            initial={{
              "z-index": "5",
              position: "fixed",
              width: `250px`,
              height: "200px",
              "border-radius": "2px",
              left: `${left()}px`,
              top: `${top()}px`,
            }}
            exit={{
              "z-index": "5",
              position: "fixed",
              width: `250px`,
              height: "200px",
              "border-radius": "2px",
              left: `${left()}px`,
              top: `${top()}px`,
            }}
            animate={{
              "z-index": "5",
              position: "fixed",
              width: `100vw`,
              height: "100vh",
              "border-radius": "2px",
              left: `0px`,
              top: `0px`,
            }}
            transition={{
              duration: 0.5,
              easing: "ease-in-out",
            }}
          >
            <img
              src={bgImage()}
              alt=""
              style={{
                width: "100%", 
                height: "100%",
                position: "absolute",
                top: "0",
                left: "0",
                "border-radius": "2px",
                "z-index": 0,
                "object-fit": "cover",
                "object-position": `${objPos()}`,
              }}
            />
            <MovieDetail onChildClick={handleChildClick} id={target().id}></MovieDetail>
          </Motion.div>
        </Show>
      </Presence>
    </div>
  );
}

export default ContentRow;
