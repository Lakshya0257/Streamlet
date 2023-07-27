import { createEventBus } from "@solid-primitives/event-bus";
const searchIcon=document.getElementById("search-icon");


const bus = createEventBus();

// can be used without payload type, if you don't want to send any
createEventBus();

// bus can be destructured:
const { listen, emit, clear } = bus;

export default bus;

function search(){
    
    bus.emit("foo");
}

unsub();
searchIcon.addEventListener("click",search);

