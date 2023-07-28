import './Loading.scss'
import { Motion , Presence } from '@motionone/solid';

function Loading(){
    return (
        <Presence exitBeforeEnter>
            <Motion.div
        initial={{
            opacity:0
        }}
        animate={{
            opacity:1
        }}
        exit={{
            opacity:0
        }}
        transition={{
            duration:1
        }}
         class="loader">
            <lottie-player src="https://lottie.host/f61e5919-a7c0-45ec-a9e8-9c2faa747476/OVwfv5hFyL.json" background="#ffffff00" speed="1.5" style="width: 600px; height: 600px" loop autoplay direction="1" mode="normal"></lottie-player>
        </Motion.div>
        </Presence>
    )
}

export default Loading;