import './TopBar.scss';
import { useNavigate } from "@solidjs/router";
import { on, onMount } from 'solid-js';
import { appWindow } from '@tauri-apps/api/window'
function TopBar(){
    const navigate = useNavigate();

    function searchClick(){
      
        navigate('/series/search');
        const customEvent = new CustomEvent("search");
      document.dispatchEvent(customEvent);
        
        
    }

    onMount(()=>{
      const searchInput = document.getElementById('search');
  
    // Attach keyup event listener to the input field
    searchInput.addEventListener('keyup', (event) => {
      // Check if the "Enter" key was pressed (key code 13)
      if (event.key === 'Enter') {
        // Get the search query from the input field
        // const searchQuery = searchInput.value.trim();
        searchClick();
      }
    });

    
document
  .getElementById('titlebar-minimize')
  .addEventListener('click', () => appWindow.minimize())
// document
//   .getElementById('titlebar-maximize')
//   .addEventListener('click', () => appWindow.toggleMaximize())
document
  .getElementById('titlebar-close')
  .addEventListener('click', () => appWindow.close())
    }) 

    return (
        <div data-tauri-drag-region class="titlebar">
          <h1>CinéWave</h1>
      <div class="btns">
        <div class="search-bar">
          <input class="search-input" id='search' type="text" placeholder='Search movie or series here' autocomplete="off"/>
          <i class="fa-solid fa-magnifying-glass" onClick={searchClick} id="search-icon" style="color: #f5f5f5;"></i>
        </div>
                {/* <button>Playlist</button>
                <button>Series</button>
                <button>My List</button> */}
        <div class="titlebar-button" id="titlebar-minimize">
          <i class="fa-regular fa-window-minimize" style="color: #ffffff;"></i>
        </div>
        {/* <div class="titlebar-button" id="titlebar-maximize">
          <i class="fa-regular fa-window-maximize"  style="color: #ffffff;"></i>
        </div> */}
        <div class="titlebar-button" id="titlebar-close">
          <i class="fa-solid fa-xmark"></i>
        </div>
      </div>
      
    </div>
    )
}

export default TopBar;