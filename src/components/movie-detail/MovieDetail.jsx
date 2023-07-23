import { Motion, Presence } from "@motionone/solid";
import "./MovieDetail.scss";
import {
  For,
  createSignal,
  onMount,
  Show,
  createResource,
  createEffect,
  Switch,
  Match,
} from "solid-js";
import { invoke } from "@tauri-apps/api";
function MovieDetail(props) {
  console.log(props.id);
  const [showcontent, setShowContent] = createSignal(false);
  const [showGallery, setShowGallery] = createSignal(false);

  function back() {
    setShowGallery(false);
    setShowContent(false);
    props.onChildClick();
  }

  function gallerySwitcher() {
    setShowGallery(!showGallery());
  }

  const movie_detail = async () => {
    const response = await invoke("get_data", {
      apiType: "get_movie",
      id: props.id,
    });
    // console.log(response);
    return response;
  };
  const movie_images = async () => {
    const response = await invoke("get_data", {
      apiType: "movie_images",
      id: props.id,
    });
    console.log(response);
    return response;
  };
//   const movie_cast = async () => {
//     const response = await invoke("get_data", {
//       apiType: "movie_cast",
//       id: props.id,
//     });
//     console.log(response);
//     return response;
//   };

  const [movieDetail] = createResource(movie_detail);
  const [gallaryData] = createResource(movie_images);
//   const [movieCast] = createResource(movie_cast);

  createEffect(() => {
    if (movieDetail.state === "ready") {
      setShowContent(true);
    }
    
  });

  return (
    <Show when={showcontent()}>
      <Motion.div
        initial={{
          position: "absolute",
          right: 0,
          top: 0,
          // width: 100%;
          height: "100%",
          "z-index": 1,
          "background-color": "rgba(0, 0, 0, 0.7)",
          width: "0px",
        }}
        animate={{
          width: "100vw",
        }}
        transition={{
          duration: 0.5,
          easing: "ease-in-out",
        }}
      >
        <i
          class="fa-solid fa-angle-left backIcon"
          onClick={back}
          style="color: #ffffff;"
        ></i>

        <Presence exitBeforeEnter>
        <Show when={!showGallery()}>
          <Motion.div
          initial={{
            opacity:0
          }}

          animate={{
            opacity:1
          }}
           
          exit={{
            opacity:0
            
          }}
          className="movie-detail-content"
          transition={{
            duration:0.4,
            easing:'ease-in-out'
          }}
          >
            {/* <div className="bottom-title">
            <h1 class="bottom-title">{movieDetail()['data']['title']}</h1>
            </div> */}

            <div className="img-poster">
              <img
                src={
                  "https://image.tmdb.org/t/p/original" +
                  movieDetail()["data"]["poster_path"]
                }
                alt=""
              />
            </div>
            <div className="movie-detail-des">
              <h1>
                {movieDetail()["data"]["tagline"] === ""
                  ? movieDetail()["data"]["title"]
                  : movieDetail()["data"]["tagline"]}
              </h1>
              <hr />
              <div className="tags">
                <div className="info">
                  <p>{movieDetail()["data"]["release_date"]}</p>
                  <p>{movieDetail()["data"]["genres"][0]["name"]}</p>
                  <p>{movieDetail()["data"]["runtime"]}m</p>
                </div>
                <p>⭐ {movieDetail()["data"]["vote_average"]}</p>
              </div>
              <hr />
              <p>{movieDetail()["data"]["overview"]}</p>
              <hr />
              <p>Revenue: 💲{movieDetail()["data"]["revenue"]}</p>
            </div>
            <i
              class="fa-solid fa-angles-down fa-bounce"
              onclick={gallerySwitcher}
            ></i>
          </Motion.div>
        </Show>
        </Presence>
        <Show when={showGallery()}>
            
            <Show when={gallaryData.state==='ready'}>
                
            <div className="gallery-tab">
            <i class="fa-solid fa-angles-up fa-bounce" onclick={gallerySwitcher}></i>
            <Motion.div
            initial={{
                opacity:0,
            }}
            animate={{
                opacity:1
            }}
            transition={{
                duration:2,
                easing:'ease-in-out'
            }}
             className="slide-track">
                <div className="slide">
                <For each={gallaryData()['data']['backdrops']}>{(image)=>{
                    return  <img
                    src={
                      "https://image.tmdb.org/t/p/original" +
                      image['file_path']
                    }
                    alt=""
                  />
                }}

                </For>
                </div>
                
            </Motion.div>
            <Motion.div
            initial={{
                right:'-45vw'
            }}
            animate={{
                right:'0'
            }}
            transition={{
                duration:.8,
                easing:'ease-in-out'
            }}
             className="bottom-title">
            <h1 class="bottom-title">{movieDetail()['data']['title']}</h1>
            </Motion.div>
            {/* <div className="slide-track-1">
                <div className="slide-1">
                <For each={gallaryData()['data']['backdrops']}>{(image)=>{
                    return  <img
                    src={
                      "https://image.tmdb.org/t/p/original" +
                      image['file_path']
                    }
                    alt=""
                  />
                }}

                </For>
                </div>
                
            </div> */}
            {/* <div className="left-content">
                <h1>Casts</h1>
                <Show when={movieCast.state==='ready'}>
                    <div className="cast-content">
                    <For each={movieCast()['data']['cast']}>{
                        (cast)=>{
                            return <div className="cast">
                                <img src={
                      "https://image.tmdb.org/t/p/w500" +
                      cast['profile_path']
                    } alt="" />
                                <p>{cast['name']}</p>
                            </div>
                        }
                    }</For>
                    </div>
                </Show>
            </div> */}
            </div>
            </Show>
        </Show>
      </Motion.div>
    </Show>
  );
}

export default MovieDetail;
