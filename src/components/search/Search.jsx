import './Search.scss';
import { Motion, Presence } from "@motionone/solid";
import ContentRow from '../content-row/ContentRow';
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

  function Search() {
    const [searchResult, setSearchResult] = createSignal({});
  
    async function searchApi() {
      console.log("searching...");
      const search = document.getElementById("search");
      var inputValue = search.value;
      const response = await invoke("get_data", {
        apiType: "search_movie",
        id: inputValue,
      });
      setSearchResult(response);
      console.log(searchResult());
    }
  
    return (
      <>
        <div class='search-container'>
          <div className="search-bar">
            <input id='search' type="text" placeholder='Search movie here'/>
            <i class="fa-solid fa-magnifying-glass" onClick={searchApi} style="color: #f5f5f5;"></i>
          </div>
        </div>
        <Show when={Object.keys(searchResult()).length !== 0}>
          <ContentRow content={searchResult()["data"]["results"]}></ContentRow> {/* Access 'data' directly */}
        </Show>
      </>
    )
  }

export default Search;