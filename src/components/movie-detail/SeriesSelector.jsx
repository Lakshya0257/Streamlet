import { Motion, Presence } from "@motionone/solid";
import "./SeriesSelector.scss";
import {
    For,
    createSignal,
    Show,
    createResource,
    createEffect,
  } from "solid-js";
  import { invoke, path } from "@tauri-apps/api";
  import Loading from "../loader/Loading";
function SeriesSelector(props) {
    console.log(props.content);
    const [currentState, setCurrentState] = createSignal("seasons");
    const [seasonInfo,setSeasonInfo]= createSignal();

    async function setState(season){
        console.log(season);
        setSeasonInfo(await getSeasonInfo(season));
        console.log(seasonInfo());
        setCurrentState("episodes");
    }

    function back() {
        if (currentState()==="episodes") {
            setCurrentState("seasons");
        } else {
            props.closeSeason();
        }
    }

    async function getSeasonInfo(season){
        const response = await invoke("get_data", {
          apiType: "series/season",
          id: props.id,
          season:`${season}`
        });
        console.log(response);
        return response;
      };

    function playEpisode(season,episode) {
        props.selected(season,episode);
    }  


    return (
        <>
        <Presence exitBeforeEnter>
        <Motion.div
        style={{
            position: "fixed",
            left: "20vw",
            top: "10%",
            bottom: "10%",
            right: "5vw",
            "border-radius":"20px",
            "background-color":"rgba(0, 0, 0, 0.974)",
            "z-index":"15"
        }}
        initial={{
            opacity:0,
            display: "none"
        }}
        animate={{
            display: "inline-block",
            opacity:1
        }}
        exit={{
            display: "none",
            opacity:0
        }}
        className="seasonContent"
        transition={{
            duration: 0.4,
            easing: "ease-in-out",
          }}
        >
            <i
              class="fa-solid fa-angle-left inner-back"
              style="color: #ffffff;"
              onClick={back}
            ></i>
            <div className="content-grid">
                <Show when={currentState()==="seasons"} fallback={
                    <For each={seasonInfo()["data"]["episodes"]}>{(da,i)=>{
                        return (
                            <div className="episode-card"
                            onClick={()=>playEpisode(seasonInfo()["data"]["season_number"],da["episode_number"])}
                            >
                                <img src={da["still_path"]===null? "https://t4.ftcdn.net/jpg/02/86/32/31/360_F_286323187_mDk3N4nGDaPkUmhNcdBe3RjSOfKqx4nZ.jpg":
                          "https://image.tmdb.org/t/p/w500" +
                          da["still_path"]
                        }></img>
                        <div className="ho">
                        <p class="overview">{da["overview"]}</p>
                    </div>
                        <div className="details">
                            <p class="title">{i()+1 + ") " + da["name"]}</p>
                        </div>
                            </div>
                        )
                    }}</For>
                }>
                <For each={props.content}>{(da,i)=>{
                    return (
                        <div className="season-card"
                        onClick={()=>setState(da["season_number"])}
                        >
                            <img src={
                      "https://image.tmdb.org/t/p/w500" +
                      da["poster_path"]
                    }></img>
                    <div className="ho">
                        {/* <button><p>Episodes</p></button> */}
                        <p>Episodes: {da["episode_count"]}</p>
                        <p class="overview">{da["overview"]}</p>
                    </div>
                    <div className="details">
                        <p class="title">{da["name"]}</p>
                    </div>
                        </div>
                    )
                }}</For>
                </Show>
            </div>

        </Motion.div>
        </Presence>
        </>
    );
}

export default SeriesSelector;