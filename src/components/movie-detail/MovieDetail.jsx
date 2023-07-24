import { Motion, Presence } from "@motionone/solid";
import "./MovieDetail.scss";
import Streaming from "../streaming-frame/Streaming";
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
  const [streaming, setStreaming] = createSignal(false);
  const [streamingUrl, setStreamingUrl] = createSignal("");
  const [showServers, setShowServers] = createSignal(false);

  function back() {
    setShowGallery(false);
    setShowContent(false);
    props.onChildClick();
  }

  function gallerySwitcher() {
    setShowGallery(!showGallery());
  }

  function streamingSwitcher(ev) {
    if(!streaming()){
      const target = ev.currentTarget;
      setStreamingUrl(movieUrls()['data'][target.id]);
      setShowContent(false);
      setShowGallery(false);
      setStreaming(true);
    }else{
      setStreaming(false);
    }
    
  }

  function showServer(){
    setShowServers(true);
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
    // console.log(response);
    return response;
  };
  const movie_urls = async () => {
    const response = await invoke("get_data", {
      apiType: "streaming_url",
      id: props.id,
    });
    console.log(response);
    return response;
  };

  const [movieDetail] = createResource(movie_detail);
  const [gallaryData] = createResource(movie_images);
  const [movieUrls] = createResource(movie_urls);

  createEffect(() => {
    if (movieDetail.state === "ready") {
      setShowContent(true);
    }
    
  });

  return (
    <>
    <Show when={streaming()}>
    <i
          class="fa-solid fa-angle-left backIcon"
          onClick={back}
          style="color: #ffffff;"
        ></i>
      <Streaming url={streamingUrl()}></Streaming>
    </Show>
    <Presence>
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
        exit={{
          opacity:"0",
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
              <Show when={movieUrls.state==='ready'}>
              <hr />
              <Motion.div
              initial={{
                scale:0
              }}
              animate={{
                scale:1
              }}
              transition={{
                duration:0.4,
                easing:'ease-in-out'
              }}
               className="stream">
              <button class="details" onClick={showServer}>Watch Now</button>
              <Show when={showServers()}>
                <For each={movieUrls()['data']}>{(url,i)=>{
                  return <Motion.div
                  initial={{
                    opacity:0
                  }}
                  animate={{
                    opacity:1
                  }}
                  transition={{
                    duration:0.4,
                    easing:'ease-in-out'
                  }}
                  class="servers"
                  >
                    <p onClick={streamingSwitcher} id={i()}>Server {i()+1}</p>
                  </Motion.div>
                }}
                </For>
              </Show>
              </Motion.div>
              </Show>
              {/* <dialog id="dialog">
                <h1>Dialog</h1>
              </dialog> */}
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
    </Presence>
    </>
  );
}

export default MovieDetail;
