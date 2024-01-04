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

    async function getSeasonInfo(season){
        const response = await invoke("get_data", {
          apiType: "series/season",
          id: props.id,
          season:`${season}`
        });
        console.log(response);
        return response;
      };


    return (
        <>
        {/* <Presence exitBeforeEnter> */}
        <Motion.div
        style={{
            position: "fixed",
            left: "20vw",
            top: "10%",
            bottom: "10%",
            right: "5vw",
            "border-radius":"20px",
            "background-color":"rgb(0 0 0 / 99%)",
            "z-index":"15"
        }}
        initial={{
            opacity:0
        }}
        animate={{
            opacity:1
        }}
        exit={{
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
            ></i>
            <div className="content-grid">
                <For each={props.content}>{(da,i)=>{
                    return (
                        <div className="season-card"
                        onClick={()=>setState(i())}
                        >
                            <img src={
                      "https://image.tmdb.org/t/p/original" +
                      da["poster_path"]
                    }></img>
                    <div className="details">
                        <p class="title">{da["name"]}</p>
                    </div>
                        </div>
                    )
                }}</For>
            </div>

        </Motion.div>
        {/* </Presence> */}
        </>
    );
}

export default SeriesSelector;