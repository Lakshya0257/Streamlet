import Homepage from "./view/Homepage/Homepage";
import SideNav from "./components/side-nav/SideNav";
import { Route ,Routes } from "@solidjs/router";
import Search from "./view/Search/Search";
import TopBar from "./components/top-bar/TopBar";
import TopRated from "./view/TopRated/TopRated";

function App() {
  return (
    <>
    
    {/* <iframe src="https://vidsrc.me/embed/movie?imdb=tt5433140" width="640" height="360" frameborder="0" allowfullscreen></iframe> */}
    <SideNav></SideNav>
    <TopBar></TopBar>
    <div className="middle-main">
    <Routes>
      <Route path="/" component={Homepage}></Route>
      <Route path="/series" component={Homepage}></Route>
      <Route path="/search" component={Search}></Route>
      <Route path="/search/series" component={Search}></Route>
      <Route path="/top-rated" component={TopRated}></Route>
      <Route path="/top-rated/series" component={TopRated}></Route>
    </Routes>
    </div>
    </>
    
  );
}

export default App;
