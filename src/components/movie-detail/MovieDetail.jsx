import { Motion } from "@motionone/solid";
import "./MovieDetail.scss";
import { For, createSignal, onMount, Show, createResource , createEffect} from "solid-js";
import { invoke } from "@tauri-apps/api";
function MovieDetail(props) {
    console.log(props.id);
  const [showcontent, setShowContent] = createSignal(false);

  function back() {
    setShowContent(false);
    props.onChildClick();
  }

  const movie_detail = async () => {
    // console.log(id);
    const response = await invoke("get_data", { apiType: "get_movie" , id: props.id});
    console.log(response);
    return response;
  };
  
  const [movieDetail] = createResource(movie_detail);

  createEffect(()=>{
    if(movieDetail.state==='ready'){
        setShowContent(true);
    }
  })

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
        <div className="movie-detail-content">
            <div className="bottom-title">
            <h1 class="bottom-title">{movieDetail()['data']['title']}</h1>
            </div>
          
          <div className="img-poster">
            <img src={"https://image.tmdb.org/t/p/original" +
              movieDetail()['data']["poster_path"]} alt="" />
          </div>
          <div className="movie-detail-des">
            <h1>{movieDetail()['data']['tagline']===""? movieDetail()['data']['title']:movieDetail()['data']['tagline']}</h1>
            <hr />
            <div className="tags">
                <div className="info">
                <p>{movieDetail()['data']['release_date']}</p>
                <p>{movieDetail()['data']['genres'][0]['name']}</p>
                <p>{movieDetail()['data']['runtime']}m</p>
                </div>
                <p>⭐ {movieDetail()['data']['vote_average']}</p>
            </div>
            <hr />
            <p>{movieDetail()['data']['overview']}</p>
            <hr />
            <p>Revenue: 💲{movieDetail()['data']['revenue']}</p>
          </div>
        </div>
      </Motion.div>
    </Show>
  );
}

export default MovieDetail;
