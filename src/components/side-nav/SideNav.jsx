import './SideNav.scss'
const SideNav=()=>{
    return (
        <div class="side-nav">
            <div className="selectors">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEreNft0MzlaGV_KXt7HmORix4Y3Us0fFNQoU-ROWqJ_iihvM_VVuQ_H5ZnRlAj6ng2Bk&usqp=CAU" alt="" />
                <img src="https://m.media-amazon.com/images/I/91K1ZEk9oiL._RI_.jpg" alt="" />
                <img src="https://i.pinimg.com/originals/2b/e6/80/2be680292cdea62cd8495a9d5a5866c0.jpg" alt="" />
                {/* <h1>.</h1>
                <i class="fa-regular fa-circle-xmark fa-rotate-90" style="color: #ffffff;"></i>
                <img src="https://www.shareicon.net/data/512x512/2017/05/24/886398_add_512x512.png" alt="" /> */}
            </div>
            <div className="tabs">
                <h1>Tabs</h1>
                <button>
                <i class="fa-solid fa-house"></i>
                <p>Explore</p>
                </button>
                <button>
                <i class="fa-regular fa-circle-play"></i>
                <p>To watch</p>
                </button>
                <button>
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
                <i class="fa-regular fa-star"></i>
                <p>Top Rated</p>
                </button>
                <button>
                <i class="fa-solid fa-download"></i>
                <p>Downloaded</p>
                </button>
                <hr />
                <button>
                <i class="fa-solid fa-gear"></i>
                <p>Settings</p>
                </button>
                <button>
                <i class="fa-solid fa-question"></i>
                <p>Help</p>
                </button>
            </div>
        </div>
    )
}

export default SideNav;