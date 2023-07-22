import './Heading.scss'

function Heading({icon, title}){
    return (
        <div class='section-header'>
            <div>
            <i class={icon} style="color: #ffffff;"></i>
            <h2>{title}</h2>
            </div>
            <hr />
        </div>
    )
}

export default Heading;