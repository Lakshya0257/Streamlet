import "./Search.scss";
import { Motion, Presence } from "@motionone/solid";
import MovieDetail from "../../components/movie-detail/MovieDetail";
import Loading from "../../components/loader/Loading";
import {
  createSignal,
  createResource,
  Match,
  Show,
  onCleanup,
  createEffect,
  onMount,
  For,
} from "solid-js";
import { invoke } from "@tauri-apps/api";
import { useLocation } from "@solidjs/router";
function Search() {
  const [searchResult, setSearchResult] = createSignal({});
  const [clicked, setClicked] = createSignal(false);
  const [target, setTarget] = createSignal();
  const [bgImage, setBackgroundImage] = createSignal("");
  const [state, setCurrentState] = createSignal("unreached");

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

  

  onMount(async () => {
    await searchApi();
    // Define the event handler for the custom event
    const customEventHandler = (event) => {
      const message = event.detail;
      console.log("Custom event received:", message);
      // Do something with the event data
    };

    // Add the event listener when the component is mounted
    document.addEventListener("search", searchApi);

    // Clean up the event listener when the component is unmounted
  });
  onCleanup(() => {
    document.removeEventListener("search", () => {});
  });

  function movieDetails(ev) {
    console.log("clicked");
    const target = ev.currentTarget;
    const src=target.src;
    console.log(src);
    let originalSrc = src.replace('/w500/', '/original/');
    originalSrc = originalSrc.replace('/poster_path', '/backdrop_path');

    setBackgroundImage(originalSrc);
    setTarget(target);
    setClicked(true);
  }

  const location = useLocation();
  async function searchApi() {
    setCurrentState("ongoing");
    console.log("searching...");
    const search = document.getElementById("search");
    var inputValue = search.value;
    console.log(location.pathname);
    if( location.pathname.includes("/series")){
      const response = await invoke("get_data", {
        apiType: "search_series",
        id: inputValue,
      });
      setCurrentState("ready");
      setSearchResult(response);
      console.log(searchResult());
    }else{
      const response = await invoke("get_data", {
        apiType: "search_movie",
        id: inputValue,
      });
      setCurrentState("ready");
      setSearchResult(response);
      console.log(searchResult());
    }
  }
  return (
    <>
    <Presence>
    <Show when={state()==="ongoing"}>
      <Loading></Loading>
    </Show>
    </Presence>
    <Show when={Object.keys(searchResult()).length !== 0 && searchResult()["data"]["results"].length !==0}>
      <img class="search-bg-image" src={"https://image.tmdb.org/t/p/original"+searchResult()["data"]["results"][0]["backdrop_path"]} alt="" />
      <div class="search-nav">
        <h1>Search Results</h1>
        <div className="content">
          <For each={searchResult()["data"]["results"]}>
            {(movie, i) => {
              return (
                <Motion.div
                initial={{
                  opacity:0,
                }}
                animate={{
                  opacity:1,
                }}
                transition={{
                  duration:(i()+1)/10,
                  easing:"ease-in-out"
                }}
                 className="search-results">
                  <img  id={movie['id']}
                  onclick={movieDetails}
                    src={
                      movie["poster_path"] === null
                        ? "https://t4.ftcdn.net/jpg/02/86/32/31/360_F_286323187_mDk3N4nGDaPkUmhNcdBe3RjSOfKqx4nZ.jpg"
                        : "https://image.tmdb.org/t/p/w500" +
                          movie["poster_path"]
                    } 
                    alt=""
                  />
                  <div className="content-div">
                    <h2>{location.pathname.includes("/series")? movie["name"]: movie["title"]}</h2>
                    <p>⭐ {movie["vote_average"]}</p>
                  </div>
                </Motion.div>
              );
            }}
          </For>
        </div>
      </div>
      <Presence exitBeforeEnter>
      <Show when={clicked() === true}>
          <Motion.div
            initial={{
              "z-index": "10",
              position: "fixed",
              width: `250px`,
              height: "200px",
              "border-radius": "2px",
              left: `100vw`,
              top: `5vh`,
            }}
            exit={{
              "z-index": "10",
              position: "fixed",
              width: `250px`,
              height: "200px",
              "border-radius": "2px",
              left: `100vw`,
              top: `5vh`,
            }}
            animate={{
              "z-index": "10",
              position: "fixed",
              width: `100%`,
              height: "100%",
              "border-radius": "2px",
              left: `12vw`,
              top: `5vh`,
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
              }}
            />
            <MovieDetail onChildClick={handleChildClick} id={target().id}></MovieDetail>
          </Motion.div>
        </Show>
      </Presence>
    </Show>
    </>
  );
}

export default Search;
