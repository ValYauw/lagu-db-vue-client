let videoId = document.getElementById('player').getAttribute('video-src');
if (!videoId) {
  document.getElementById('player').innerHTML = 'No video available';
}

console.log(videoId);

let tag = document.createElement('script');

tag.src = 'https://www.youtube.com/iframe_api';
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
let player;

// function onYouTubeIframeAPIReady() {
window.onYouTubeIframeAPIReady = () => {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: videoId,
    playerVars: {
      'playsinline': 1
    },
    events: { }
  });
}