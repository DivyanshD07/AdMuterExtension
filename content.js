let isMuted = false;
let adCheckTimeout = null;

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

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function checkAndSkipAd() {
    await delay(6000);
    const skipButton = document.querySelector('.ytp-ad-skip-button');
    
    if(skipButton) {
        skipButton.click();
        return true;
    }
    return false;
}

async function handleAds() {
    const videos = document.querySelectorAll('video');
    for (const video of videos) {
        if (video.duration <= 40) {
            muteVideo(video);
            const isSkippable = await checkAndSkipAd();
            if(!isSkippable) {
                const adDuration = video.duration - 1;
                clearTimeout(adCheckTimeout);
                adCheckTimeout = setTimeout(() => {
                    handleAds();
                }, adDuration * 1000);
            }            
        } else{
            unmuteVideo(video);
        }
    };
}

setInterval(() => { handleAds(); }, 1000); // need to improve this