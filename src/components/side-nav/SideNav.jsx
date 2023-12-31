import { createSignal } from 'solid-js';
import './SideNav.scss'
import { useNavigate, useMatch } from "@solidjs/router";
import { shell } from "@tauri-apps/api";
function SideNav(){
    const [curview, setCurrentView] = createSignal("movie");
    const home =  useMatch(() =>"/" );
    const shome = useMatch(() =>"/series" )
    const topRated =  useMatch(() => "/top-rated");
    const stopRated = useMatch(() => "/top-rated/series");
    const navigate = useNavigate();

    

    function changeView(view){
        setCurrentView(view);
        if(view==="movie"){
            handleButtonClick("/");
        }else{
            handleButtonClick("/series");
        }
    }

    const navigateToGitHub = () => {
        shell.open("https://github.com/Lakshya0257");
      };
    
      // Function to navigate to LinkedIn profile
      const navigateToLinkedIn = () => {
        shell.open("https://www.linkedin.com/in/lakshya-bhati-682787241/");
      };

    function handleButtonClick(route) {    
        // Navigate to the specified route
        navigate(route);
      }
    
    return (
        <div class="side-nav">
            {/* <div className="selectors">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEreNft0MzlaGV_KXt7HmORix4Y3Us0fFNQoU-ROWqJ_iihvM_VVuQ_H5ZnRlAj6ng2Bk&usqp=CAU" alt="" onClick={()=>changeView("movie")} />
                <img src="https://m.media-amazon.com/images/I/91K1ZEk9oiL._RI_.jpg" alt="" onClick={()=>changeView("series")} />
                <img src="https://i.pinimg.com/originals/2b/e6/80/2be680292cdea62cd8495a9d5a5866c0.jpg" alt="" />
                <h1>.</h1>
                <i class="fa-regular fa-circle-xmark fa-rotate-90" style="color: #ffffff;"></i>
                <img src="https://www.shareicon.net/data/512x512/2017/05/24/886398_add_512x512.png" alt="" />
            </div> */}
            <div className="tabs">
                <h1>Sections</h1>
                <button  classList={{ active:  curview()==="movie" }} onClick={()=>changeView("movie")} >
                <i class="fa-solid fa-house"></i>
                <p>Movies</p>
                </button>
                <button  classList={{ active: curview()==="series"}} onClick={()=>changeView("series")} >
                <i class="fa-solid fa-house"></i>
                <p>Series</p>
                </button>
                <hr />
                <h1>Tabs</h1>
                <button  classList={{ active: curview()==="movie"? Boolean(home()): Boolean(shome()) }} onClick={() => curview()==="movie"? handleButtonClick("/"): handleButtonClick("/series")} >
                <i class="fa-solid fa-house"></i>
                <p>Home</p>
                </button>
                <button classList={{ active: curview()==="movie"? Boolean(topRated()) : Boolean(stopRated()) }} onClick={() => curview()==="movie"? handleButtonClick("/top-rated"): handleButtonClick("/top-rated/series")}>
                <i class="fa-regular fa-star"></i>
                <p>Top Rated</p>
                </button>
                
                {/* <button>
                <i class="fa-regular fa-clock"></i>
                <p>Coming soon</p>
                </button>
                <center><hr /></center>
                <h1>Library</h1>
                <button>
                <i class="fa-solid fa-play"></i>
                <p>Playlist</p>
                </button>
                <button>
                <i class="fa-regular fa-circle-play"></i>
                <p>To watch</p>
                </button>
                <button>
                <i class="fa-solid fa-download"></i>
                <p>Downloads</p>
                </button>
                <hr />
                <button>
                <i class="fa-solid fa-gear"></i>
                <p>Settings</p>
                </button>
                <button>
                <i class="fa-solid fa-question"></i>
                <p>Help</p>
                </button> */}
            </div>
            <p class='tips'>Please note that during your streaming experience, you might encounter occasional window pop-up advertisements when trying to play the video. If you report any bug, feel free to reach out.</p>
            <div className="connect">
                <img src="https://static-00.iconduck.com/assets.00/github-icon-2048x1988-jzvzcf2t.png" onClick={navigateToGitHub} alt="" />
                <img src="https://static-00.iconduck.com/assets.00/linkedin-icon-2048x2048-ya5g47j2.png" onClick={navigateToLinkedIn} alt="" />
            </div>
            {/* <div className="footer">
        <p>© 2024 Lakshya Bhati. All rights reserved.</p>
        <p>This application does not rip or host any files on it's servers. All files or contents hosted on third party websites. We doesn't accept the responsibility for contents hosted on third party websites. Also application
doesn't RIP/Pirate any file. We just collect links from other websites. Nothing Else.</p>
      </div> */}
        </div>
    )
}

export default SideNav;