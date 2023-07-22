import './Homepage.scss'
import ContentRow from '../../components/content-row/ContentRow';
import Heading from '../../components/Heading/Heading';
import { createSignal , createResource, Match , Show , onCleanup , createEffect, onMount } from 'solid-js';
import { invoke } from '@tauri-apps/api';

// const [trending,getTrending]=createSignal({});

//Fetching data from rust for homepage
const fetchData= async()=>{
    const response = await invoke("get_data",{apiType:"homepage"});
    console.log(response);
    return response
    // try {
    //     const response = await invoke("get_data",{apiType:"homepage"});
    //     console.log(response);
    //     if(response.status==="success") return response;
    //   } catch (error) {
    //     console.error(error);
    //   }
}

function Homepage(){
    
    // const data = fetchData();
    //this function will auto run once the page is loaded
    //useful for getting api data
    const [data] = createResource(fetchData);

//   onMount(()=>{
//     const homepageContent=document.getElementById("hpc");

// homepageContent.addEventListener('scroll', (event) => {

//     const layer=document.getElementById("hpl");

//     const percentage=Math.min((event.target.scrollTop/600)*1,1);

//     // console.log(percentage);
//     // layer.style.background = `linear-gradient(180deg, rgba(0, 0, 0, 0.313) 0%, rgb(0, 0, 0) 100%)`;

//     layer.style=`background-color: rgba(0, 0, 0, ${percentage});`
// });
//   })

  createEffect(()=>{
    if(data.state==="ready"){
        const homepageContent=document.getElementById("hpc");

homepageContent.addEventListener('scroll', (event) => {

    const layer=document.getElementById("hpl");

    const percentage=Math.min((event.target.scrollTop/600)*1,1);

    console.log(percentage);
    // layer.style.background = `linear-gradient(180deg, rgba(0, 0, 0, 0.313) 0%, rgb(0, 0, 0) 100%)`;

    layer.style=`background-color: rgba(0, 0, 0, ${percentage});`
});
    }
  })

  // Use createEffect with an empty dependency array to trigger the function once on mount
//   createEffect(() => {
//     if (data.state === "ready") {
//       afterDataLoaded();
//     }
//   }, []);

    
    
    // if (!data()) {
    //     return <div>Loading...</div>; // or return a loading spinner, etc.
    // }

    // Destructure the required data from the response
    // const { results } = data();
    return (
        <Show when={data.state==="ready"}>
            <div>
            <div className="image">
            <img src={"https://image.tmdb.org/t/p/original"+data()['data']['results'][0]["backdrop_path"]} alt="Movie1" />
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
                <div className="top-layer" id='hpl'>
                </div>
                <div className="bottom-layer"></div>
            </div>
            <div className="content" id='hpc'>
                <div className="top-info">
                    <p>Popularity : {data()['data']['results'][0]['popularity']}</p>
                    <p>⭐ {data()['data']['results'][0]['vote_average']}</p>
                    <h1>{data()['data']['results'][0]['original_title']}</h1>
                    <p class='des'>{data()['data']['results'][0]['overview']}</p>
                    <div className="btn">
                        <button class='details'>Details</button>
                        <button class='add'>+ Add List</button>
                    </div>
                </div>
                <Heading></Heading>
                <ContentRow content={data()['data']['results']}></ContentRow>
                {/* <ContentRow></ContentRow> */}
            </div>
        </div>
        </Show>
    )
}

export default Homepage;