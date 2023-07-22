import "./Homepage.scss";
import ContentRow from "../../components/content-row/ContentRow";
import Heading from "../../components/Heading/Heading";
import {
  createSignal,
  createResource,
  Match,
  Show,
  onCleanup,
  createEffect,
  onMount,
  For
} from "solid-js";
import { invoke } from "@tauri-apps/api";

// const [trending,getTrending]=createSignal({});

//Fetching data from rust for homepage
const fetchData = async () => {
  const response = await invoke("get_data", { apiType: "homepage" });
  console.log(response);
  return response;
};
const topRated = async () => {
  const response = await invoke("get_data", { apiType: "top_rated" });
//   console.log(response);
  const res=await song_detail(response['data']['results'][5]['id'].toString());
  return res;
};
const song_detail = async (id) => {
  const response = await invoke("get_data", { apiType: "get_movie" , id: id});
  console.log(response);
  return response;
};

function Homepage() {
  //this function will auto run once the page is loaded
  //useful for getting api data
  const [data] = createResource(fetchData);
  const [top_rated] = createResource(topRated);
//   const [song_detail] = createResource(topRated);
  
  createEffect(() => {
    if (data.state === "ready") {
      const homepageContent = document.getElementById("hpc");

      homepageContent.addEventListener("scroll", (event) => {
        const layer = document.getElementById("hpl");

        const percentage = Math.min((event.target.scrollTop / 600) * 1, 1);

        layer.style = `background-color: rgba(0, 0, 0, ${percentage});`;
      });
    }
  });

  return (
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
          {/* <Switch fallback={<div>Not Found</div>}>
            <Match when={data.state === 'pending' || data.state === 'unresolved'}>
          Loading...
        </Match>
            <Match when={data.state === 'ready'}>
                <img src={"https://image.tmdb.org/t/p/w500"+data.results[0]['poster_path']} alt="Movie1" />
                </Match>
            </Switch> */}
        </div>
        <div class="layout">
          <div className="top-layer" id="hpl"></div>
          <div className="bottom-layer"></div>
        </div>
        <div className="content" id="hpc">
          <div className="top-info">
            <p>Popularity : {data()["data"]["results"][0]["popularity"]}</p>
            <p>⭐ {data()["data"]["results"][0]["vote_average"]}</p>
            <h1>{data()["data"]["results"][0]["original_title"]}</h1>
            <p class="des">{data()["data"]["results"][0]["overview"]}</p>
            <div className="btn">
              <button class="details">Details</button>
              <button class="add">+ Add List</button>
            </div>
          </div>
          <Heading
            icon={"fa-solid fa-arrow-trend-up"}
            title={"Trending Now"}
          ></Heading>
          <ContentRow content={data()["data"]["results"]}></ContentRow>
          <Show when={top_rated.state==="ready"}>
          <Heading title={"Top Rated"}></Heading>
          <div className="top-rated">
            <img class="backdrop" src={"https://image.tmdb.org/t/p/original"+top_rated()['data']['backdrop_path']} alt="" />
            <img
              src={
                "https://image.tmdb.org/t/p/original"+top_rated()['data']['poster_path']
              }
              alt=""
            />
            <div className="content-div">
              <div className="top-bar">
                <div className="bar-content">
                  <h2>{top_rated()['data']['title']}</h2>
                  <p>"{top_rated()['data']['tagline']}"</p>
                </div>
                <div className="genre">
                    <For each={top_rated()['data']['genres']}>{(genre)=>{
                        return <div>{genre['name']}</div>
                    }

                    }</For>
                </div>
              </div>
              <p class="des">{top_rated()['data']['overview']}</p>
              <p>⭐ {top_rated()['data']['vote_average']}</p>
            </div>
          </div>
          </Show>
        </div>
      </div>
    </Show>
  );
}

export default Homepage;
