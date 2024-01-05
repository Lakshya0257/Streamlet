import "./Homepage.scss";
import ContentRow from "../../components/content-row/ContentRow";
import { Motion, Presence } from "@motionone/solid";
import Heading from "../../components/Heading/Heading";
import MovieDetail from "../../components/movie-detail/MovieDetail";
import { useLocation } from "@solidjs/router";
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
  const location = useLocation();
  const [topMovieDetail, setMovieDetail] = createSignal(false);
  const [curPage, setCurrPage] = createSignal(1);
  const [clicked, setClicked] = createSignal(false);
  const [target, setTarget] = createSignal();
  const [bgImage, setBackgroundImage] = createSignal("");

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
    console.log(location.pathname);
    if (location.pathname.includes("/series")) {
      const response = await invoke("get_data", { apiType: "series/homepage" });
      console.log(response);
      return response;
    } else {
      const response = await invoke("get_data", { apiType: "homepage" });
      console.log(response);
      return response;
    }
  };
  const topRated = async () => {
    if(location.pathname.includes("/series")){
      
      const response = await invoke("get_data", { apiType: "series/top_rated" });
    //   console.log(response);
      const res = await series_detail(
        response["data"]["results"][0]["id"].toString()
      );
      return res;
    }else {
      const response = await invoke("get_data", { apiType: "top_rated" });
      //   console.log(response);
      const res = await movie_detail(
        response["data"]["results"][0]["id"].toString()
      );
      return res;
    }
    
  };
  const movie_detail = async (id) => {
    const response = await invoke("get_data", { apiType: "get_movie", id: id });
    console.log(response);
    return response;
  };
  const series_detail = async (id) => {
    const response = await invoke("get_data", { apiType: "get_series", id: id });
    console.log(response);
    return response;
  };
  //this function will auto run once the page is loaded
  //useful for getting api data
  const [data] = createResource(fetchData);
  const [top_rated] = createResource(topRated);
  //   const [movie_detail] = createResource(topRated);

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

  let [recommended,{ mutate, refetch }] = createResource(()=>popular(curPage()));
  

 
//   const [dataKey, setDataKey] = createSignal(curPage());

function popular(page) {
  if (location.pathname.includes("/series")){
    return invoke("get_data", { apiType: "series/popular", page: page.toString() });
  }else {
    return invoke("get_data", { apiType: "popular", page: page.toString() });
  }
  
}

  async function changePage(page) {
    console.log(page);
    const data = await popular(parseInt(page));
    setCurrPage(parseInt(page));
    mutate(data);
  }

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
                <Show when={location.pathname.includes("/series")} fallback={<h1>{data()["data"]["results"][0]["original_title"]}</h1>}><h1>{data()["data"]["results"][0]["name"]}</h1></Show>
                
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
                        <Show when={location.pathname.includes("/series")} fallback={<h2>{top_rated()["data"]["original_title"]}</h2>}><h2>{top_rated()["data"]["original_name"]}</h2></Show>
                        
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
                title={"Recommended"}
              ></Heading>
              <Show when={recommended.state==="ready"}>
    {/* <img class="search-bg-image" src={"https://image.tmdb.org/t/p/original"+recommended()["data"]["results"][0]["backdrop_path"]} alt="" /> */}
      <div class="recommended-div">
        <div className="rc-content">
          <For each={recommended()["data"]["results"]}>
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
                    <Show when={location.pathname.includes("/series")} fallback={<h2>{movie["title"]}</h2>}><h2>{movie["name"]}</h2></Show>
                    
                    <p>⭐ {movie["vote_average"]}</p>
                  </div>
                </Motion.div>
              );
            }}
          </For>
          
        </div>
        <div className="page-switcher">

        <button onClick={()=>changePage(1)}>Back to 1</button>
        <button onClick={()=>changePage(curPage()===1? 1:curPage()-1)}>&lt;&lt;</button>
        <button class="pages selected">{curPage()}</button>
        <Show when={curPage()<parseInt(recommended()["data"]['total_pages']) && curPage()<500}><button onClick={()=>changePage(curPage()+1)} class="pages">{curPage()+1}</button></Show>
        <Show when={curPage()+1<=parseInt(recommended()["data"]['total_pages']) && curPage()<499}><button onClick={()=>changePage(curPage()+2)} class="pages">{curPage()+2}</button></Show>
        <Show when={curPage()+2<=parseInt(recommended()["data"]['total_pages']) && curPage()<498}><p>......</p></Show>
        <Show when={curPage()+3<parseInt(recommended()["data"]['total_pages']) && curPage()<497}><button onClick={()=>changePage(parseInt(recommended()["data"]['total_pages'])-1>499? 499 : parseInt(recommended()["data"]['total_pages'])-1)} class="pages">{parseInt(recommended()["data"]['total_pages'])-1>499? 499 : parseInt(recommended()["data"]['total_pages'])-1}</button></Show>
        <Show when={curPage()+4<parseInt(recommended()["data"]['total_pages']) && curPage()<496}><button onClick={()=>changePage(parseInt(recommended()["data"]['total_pages'])>500 ? 500 : parseInt(recommended()["data"]['total_pages']))} class="pages">{parseInt(recommended()["data"]['total_pages'])>500 ? 500 : parseInt(recommended()["data"]['total_pages'])}</button></Show>
        <button onClick={()=>changePage(curPage()===parseInt(recommended()["data"]['total_pages'])?parseInt(recommended()["data"]['total_pages']) :curPage()===500? 500 :curPage()+1)}>&gt;</button>
        
      </div>
      <div className="footer">
        <p>© 2024 Lakshya Bhati. All rights reserved.</p>
        <p>This application does not rip or host any files on it's servers. All files or contents hosted on third party websites. We don't accept the responsibility for contents hosted on third party websites. Also application
doesn't RIP/Pirate any file. We just collect links from other websites. Nothing Else.</p>
      </div>
        
      </div>
      <Presence exitBeforeEnter>
      <Show when={clicked() === true}>
          <Motion.div
          style={{
            "z-index": "10",
              position: "fixed",
              width: `100%`,
              height: "100%",
              "border-radius": "2px",
              left: `12vw`,
              top: `5vh`,
          }}
            initial={{
              opacity: "0",
            }}
            exit={{
              opacity: "0",
            }}
            animate={{
              opacity: "1",
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
            </Motion.div>
          </Show>
          <Show when={topMovieDetail()}>
            <Motion.div
              initial={{
                "z-index": "10",
                position: "absolute",
                top: 0,
                width: `250px`,
                height: "200px",
                "border-radius": "2px",
                left: `100vw`,
              }}
              exit={{
                "z-index": "10",
                position: "absolute",
                top: 0,
                width: `250px`,
                height: "200px",
                "border-radius": "2px",
                left: `100vw`,
              }}
              animate={{
                "z-index": "10",
                position: "absolute",
                top: 0,
                left: 0,
                width: `100%`,
                height: "100%",
                "border-radius": "2px",
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
