import "./Homepage.scss";
import ContentRow from "../../components/content-row/ContentRow";
import { Motion, Presence } from "@motionone/solid";
import Heading from "../../components/Heading/Heading";
import MovieDetail from "../../components/movie-detail/MovieDetail";
import {
  createSignal,
  createResource,
  Show,
  createEffect,
  For,
} from "solid-js";
import { invoke } from "@tauri-apps/api";
import Loading from "../../components/loader/Loading";

function Homepage() {
  const [topMovieDetail, setMovieDetail] = createSignal(false);

  function movieDetailClick() {
    if (!topMovieDetail()) {
      setMovieDetail(true);
    } else {
      setMovieDetail(false);
    }
    // setMovieDetail(!topMovieDetail());
  }

  //Fetching data from rust for homepage
  const fetchData = async () => {
    const response = await invoke("get_data", { apiType: "homepage" });
    console.log(response);
    return response;
  };
  const topRated = async () => {
    const response = await invoke("get_data", { apiType: "top_rated" });
    //   console.log(response);
    const res = await song_detail(
      response["data"]["results"][0]["id"].toString()
    );
    return res;
  };
  const song_detail = async (id) => {
    const response = await invoke("get_data", { apiType: "get_movie", id: id });
    console.log(response);
    return response;
  };
  //this function will auto run once the page is loaded
  //useful for getting api data
  const [data] = createResource(fetchData);
  const [top_rated] = createResource(topRated);
  //   const [song_detail] = createResource(topRated);

  createEffect(() => {
    if (
      data.state === "ready" &&
      !topMovieDetail() &&
      top_rated.state === "ready"
    ) {
      const homepageContent = document.getElementById("hpc");

      homepageContent.addEventListener("scroll", (event) => {
        const layer = document.getElementById("hpl");

        const percentage = Math.min((event.target.scrollTop / 600) * 1, 1);

        layer.style = `background-color: rgba(0, 0, 0, ${percentage});`;
      });
    }
  });

  return (
    <>
      <Presence>
        <Show when={data.state === "pending"}>
          <Loading></Loading>
        </Show>
      </Presence>
      <Show when={data.state === "ready"}>
        <div>
          <div className="image">
            <img
              src={
                "https://image.tmdb.org/t/p/original" +
                data()["data"]["results"][0]["backdrop_path"]
              }
              alt="Movie1"
            />
          </div>
          <Show when={!topMovieDetail()}>
            <Motion.div
              initial={{
                width: "0",
              }}
              animate={{
                width: "100vw",
              }}
              exit={{
                width: "0",
              }}
              transition={{
                duration: 0.5,
                easing: "ease-in-out",
              }}
              class="layout"
            >
              <div className="top-layer" id="hpl"></div>
              <div className="bottom-layer"></div>
            </Motion.div>
            <Motion.div
              initial={{
                left: "100vw",
              }}
              animate={{
                left: "0",
              }}
              exit={{
                left: "100vw",
              }}
              transition={{
                duration: 0.8,
                easing: "ease-in-out",
              }}
              class="content"
              id="hpc"
            >
              <div className="top-info">
                <p>Popularity : {data()["data"]["results"][0]["popularity"]}</p>
                <p>⭐ {data()["data"]["results"][0]["vote_average"]}</p>
                <h1>{data()["data"]["results"][0]["original_title"]}</h1>
                <p class="des">{data()["data"]["results"][0]["overview"]}</p>
                <div className="btn">
                  <button class="details" onClick={movieDetailClick}>
                    Watch Now
                  </button>
                  <button class="add">+ Add List</button>
                </div>
              </div>
              <Heading
                icon={"fa-solid fa-arrow-trend-up"}
                title={"Trending Now"}
              ></Heading>
              <ContentRow content={data()["data"]["results"]}></ContentRow>
              <Show when={top_rated.state === "ready"}>
                <Heading title={"Top Rated"}></Heading>
                <div className="top-rated">
                  <img
                    class="backdrop"
                    src={
                      "https://image.tmdb.org/t/p/original" +
                      top_rated()["data"]["backdrop_path"]
                    }
                    alt=""
                  />
                  <img
                    src={
                      "https://image.tmdb.org/t/p/original" +
                      top_rated()["data"]["poster_path"]
                    }
                    alt=""
                  />
                  <div className="content-div">
                    <div className="top-bar">
                      <div className="bar-content">
                        <h2>{top_rated()["data"]["title"]}</h2>
                        <p>"{top_rated()["data"]["tagline"]}"</p>
                      </div>
                      <div className="genre">
                        <For each={top_rated()["data"]["genres"]}>
                          {(genre) => {
                            return <div>{genre["name"]}</div>;
                          }}
                        </For>
                      </div>
                    </div>
                    <p class="des">{top_rated()["data"]["overview"]}</p>
                    <p>⭐ {top_rated()["data"]["vote_average"]}</p>
                  </div>
                </div>
              </Show>
              <Heading
                icon={"fa-solid fa-arrow-trend-up"}
                title={"Trending Now"}
              ></Heading>
            </Motion.div>
          </Show>
          <Show when={topMovieDetail()}>
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
                "border-radius": "20px",
                left: `15vw`,
                top: `5vh`,
              }}
              transition={{
                duration: 0.5,
                easing: "ease-in-out",
              }}
            >
              <MovieDetail
                onChildClick={movieDetailClick}
                id={data()["data"]["results"][0]["id"].toString()}
              ></MovieDetail>
            </Motion.div>
          </Show>
        </div>
      </Show>
    </>
  );
}

export default Homepage;
