import "./TopRated.scss"
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
function TopRated(){
    const [clicked, setClicked] = createSignal(false);
  const [target, setTarget] = createSignal();
  const [bgImage, setBackgroundImage] = createSignal("");
//   const [curPage, setCurrPage] = createSignal(1);

  function topRated(page) {
    return invoke("get_data", { apiType: "top_rated", page: page.toString() });
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

  const [curPage, setCurrPage] = createSignal(1);
//   const [dataKey, setDataKey] = createSignal(curPage());

  async function topRated() {
    const res=await invoke("get_data", { apiType: "top_rated", page: curPage().toString() });
    console.log(res);
    return res;
  }

  // Set up the resource with the unique key that depends on the current page number
  let [data,{ mutate, refetch }] = createResource(topRated);

  function changePage(page) {
    console.log(page);
    setCurrPage(parseInt(page));
    refetch();
  }

//   onCleanup(() => {
//     // Cancel the resource to prevent unnecessary fetches
//     reload.cancel();
//   });

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
    <Show when={data.state==="pending"}>
      <Loading></Loading>
    </Show>
    </Presence>
    <Show when={data.state==="ready"}>
    <img class="search-bg-image" src={"https://image.tmdb.org/t/p/original"+data()["data"]["results"][0]["backdrop_path"]} alt="" />
      <div class="search-nav">
        <h1>Top Rated</h1>
        <div className="content">
          <For each={data()["data"]["results"]}>
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
                  duration:(i()+1)/3,
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
                    <h2>{movie["title"]}</h2>
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
        <Show when={curPage()<parseInt(data()["data"]['total_pages']) && curPage()<500}><button onClick={()=>changePage(curPage()+1)} class="pages">{curPage()+1}</button></Show>
        <Show when={curPage()+1<=parseInt(data()["data"]['total_pages']) && curPage()<499}><button onClick={()=>changePage(curPage()+2)} class="pages">{curPage()+2}</button></Show>
        <Show when={curPage()+2<=parseInt(data()["data"]['total_pages']) && curPage()<498}><p>......</p></Show>
        <Show when={curPage()+3<parseInt(data()["data"]['total_pages']) && curPage()<497}><button onClick={()=>changePage(parseInt(data()["data"]['total_pages'])-1>499? 499 : parseInt(data()["data"]['total_pages'])-1)} class="pages">{parseInt(data()["data"]['total_pages'])-1>499? 499 : parseInt(data()["data"]['total_pages'])-1}</button></Show>
        <Show when={curPage()+4<parseInt(data()["data"]['total_pages']) && curPage()<496}><button onClick={()=>changePage(parseInt(data()["data"]['total_pages'])>500 ? 500 : parseInt(data()["data"]['total_pages']))} class="pages">{parseInt(data()["data"]['total_pages'])>500 ? 500 : parseInt(data()["data"]['total_pages'])}</button></Show>
        <button onClick={()=>changePage(curPage()===parseInt(data()["data"]['total_pages'])?parseInt(data()["data"]['total_pages']) :curPage()===500? 500 :curPage()+1)}>&gt;</button>
        
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
              "border-radius": "20px",
              left: `15vw`,
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
                "border-radius": "20px",
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
    )
}

export default TopRated;