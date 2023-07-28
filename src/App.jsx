import Homepage from "./view/Homepage/Homepage";
import SideNav from "./components/side-nav/SideNav";
import { Route ,Routes } from "@solidjs/router";
import Search from "./view/Search/Search";
import TopBar from "./components/top-bar/TopBar";

function App() {
  return (
    <>
    
    {/* <iframe src="https://vidsrc.me/embed/movie?imdb=tt5433140" width="640" height="360" frameborder="0" allowfullscreen></iframe> */}
    <SideNav></SideNav>
    <TopBar></TopBar>
    <Routes>
      <Route path="/" component={Homepage}></Route>
      <Route path="/search" component={Search}></Route>
    </Routes>
    </>
    
  );
}

export default App;
