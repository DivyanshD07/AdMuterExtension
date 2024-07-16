let isMuted = false;

function muteVideo(video) {
    if(!video.muted) {
        video.muted = true;
        isMuted = true;
    }
}

function unmuteVideo(video) {
    if(video.muted && isMuted) {
        video.muted = false;
        isMuted = false;
    }
}

function checkForAds() {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        if (video.duration <= 30) {
            muteVideo(video);
        } else{
            unmuteVideo(video);
        }
    });
}

setInterval(checkForAds, 1000); // need to improve this