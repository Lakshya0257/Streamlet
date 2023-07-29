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
            <lottie-player src="https://lottie.host/1f5225f9-5290-4a57-a66f-14dfba0efcce/GDZaOvERtD.json" background="#ffffff00" speed="1" style="width: 300px; height: 300px" loop autoplay direction="1" mode="normal"></lottie-player>
        </Motion.div>
        </Presence>
    )
}

export default Loading;