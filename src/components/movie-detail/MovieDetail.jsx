import { Motion } from "@motionone/solid";
import "./MovieDetail.scss";
import { For, createSignal, onMount, Show } from "solid-js";

function MovieDetail(props) {
  const [showcontent, setShowContent] = createSignal(true);

  function back() {
    setShowContent(false);
    props.onChildClick();
  }
  return (
    <Show when={showcontent()}>
      <Motion.div
        initial={{
          position: "absolute",
          right: 0,
          top: 0,
          // width: 100%;
          height: "100%",
          "z-index": 1,
          "background-color": "rgba(0, 0, 0, 0.5)",
          width: "0px",
        }}
        animate={{
          width: "100vw",
        }}
        transition={{
          duration: 0.5,
          delay: 0.7,
          easing: "ease-in-out",
        }}
      >
        <div className="movie-detail-content">
          <i
            class="fa-solid fa-angle-left backIcon"
            onClick={back}
            style="color: #ffffff;"
          ></i>
        </div>
      </Motion.div>
    </Show>
  );
}

export default MovieDetail;
