var video = document.querySelector("video");

// Remove existing source elements
while (video.firstChild) {
  video.removeChild(video.firstChild);
}

var videoURL = "https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/628750/f8b2fe4c8f299f3f1c6fd31f7da4d897d7a48e70.mp4";

var source = document.createElement("source");

source.setAttribute("src", videoURL);
source.setAttribute("type", "video/mp4");

video.appendChild(source);
video.play();
console.log({
  src: source.getAttribute("src"),
  type: source.getAttribute("type"),
});

setTimeout(function () {
  video.pause();

  source.setAttribute("src", videoURL);
  source.setAttribute("type", "video/mp4");

  video.load();
  video.play();
  console.log({
    src: source.getAttribute("src"),
    type: source.getAttribute("type"),
  });
}, 1000);
