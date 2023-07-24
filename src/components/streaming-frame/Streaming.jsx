import './Streaming.scss'
function Streaming({url}){
  return (
    <div class="streaming-div">
      <iframe src={url} frameborder="0" scrolling="no" allowfullscreen></iframe>
    </div>
  );
};

export default Streaming;
