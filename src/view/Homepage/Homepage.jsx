import './Homepage.scss'
import Heading from '../../components/Heading/Heading';
function Homepage(){
    return (
        <div>
            <div className="image">
                <img src="https://media.wired.co.uk/photos/6287be835608c17c6252fca3/3:2/pass/Best-Sci-Fi-Movies-Dune-Culture-Everett-MCDDUNE_WB002.jpg" alt="Movie1" />
            </div>
            <div class="layout">
                <div className="top-layer">
                </div>
                <div className="bottom-layer"></div>
            </div>
            <div className="content">
                <div className="top-info">
                    <p>Duration : 1h32m</p>
                    <p>⭐ 7.8</p>
                    <h1>Dune</h1>
                    <p class='des'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut vel recusandae earum nulla maiores cupiditate provident reiciendis quod possimus quis dolor, ipsam minus voluptates corporis id quae iusto consectetur vitae.</p>
                    <div className="btn">
                        <button class='details'>Details</button>
                        <button class='add'>+ Add List</button>
                    </div>
                </div>
                <Heading></Heading>
            </div>
        </div>
    )
}

export default Homepage;