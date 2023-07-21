import './Homepage.scss'
import ContentRow from '../../components/content-row/ContentRow';
import Heading from '../../components/Heading/Heading';
import { createSignal , createResource, Match } from 'solid-js';
import { invoke } from '@tauri-apps/api';

// const [trending,getTrending]=createSignal({});

function Homepage(){
    //Fetching data from rust for homepage
    const [data] = createResource(fetchData);

    //this function will auto run once the page is loaded
    //useful for getting api data
    async function fetchData(){
        try {
            const response = await invoke("get_data",{apiType:"homepage"});
            console.log(response);
            if(response.status==="success") return response;
          } catch (error) {
            console.error(error);
          }
    }
    // if (!data()) {
    //     return <div>Loading...</div>; // or return a loading spinner, etc.
    // }

    // Destructure the required data from the response
    // const { results } = data();
    return (
            
            <div>
            <div className="image">
            <Switch fallback={<div>Not Found</div>}>
            <Match when={data.state === 'pending' || data.state === 'unresolved'}>
          Loading...
        </Match>
            <Match when={data.state === 'ready'}>
                <img src={"https://image.tmdb.org/t/p/w500"+data.results[0]['poster_path']} alt="Movie1" />
                </Match>
            </Switch>
            </div>
            <div class="layout">
                <div className="top-layer" id='hpl'>
                </div>
                <div className="bottom-layer"></div>
            </div>
            <div className="content" id='hpc'>
                <div className="top-info">
                    <p>Duration : 1h32m</p>
                    <p>⭐ 7.8</p>
                    <h1>Dune</h1>
                    <p class='des'>Lorem ipsum dolor sit amet consectetur ad bbipisicing elit. Aut vel recusandae earum nulla maiores cupiditate provident reiciendis quod possimus quis dolor, ipsam minus voluptates corporis id quae iusto consectetur vitae.</p>
                    <div className="btn">
                        <button class='details'>Details</button>
                        <button class='add'>+ Add List</button>
                    </div>
                </div>
                <Heading></Heading>
                <ContentRow></ContentRow>
                <ContentRow></ContentRow>
            </div>
        </div>
    )
}

export default Homepage;