// // const { checkIsOnDemandRevalidate } = require("next/dist/server/api-utils");

// let isMuted = false;
// // let adCheckTimeout = null;

// function muteVideo(video) {
//     if(!video.muted) {
//         video.muted = true;
//         isMuted = true;
//     }
// }

// function unmuteVideo(video) {
//     if(video.muted && isMuted) {
//         video.muted = false;
//         isMuted = false;
//     }
// }

// // function delay(ms) {
// //     return new Promise(resolve => setTimeout(resolve, ms));
// // }

// // async function checkAndSkipAd(video) {
// //     const skipButton = document.querySelector('.ytp-skip-ad-button');
// //     if(skipButton) {
// //         muteVideo(video);
// //         await delay(6000);
// //         skipButton.click();
// //         return true;
// //     }
// //     return false;
// // }
// function handleAds() {
//     const videos = document.querySelectorAll('#player');
//         for (const video of videos) {
//             if (video.duration <= 90) {
//                 muteVideo(video);
//                 // const isSkippable = await checkAndSkipAd(video);
//             //     if(!isSkippable) {
//             //         const adDuration = video.duration - 1;
//             //         await delay(adDuration*1000);
//             //         // clearTimeout(adCheckTimeout);
//             //         // adCheckTimeout = setTimeout(() => {
//             //         //     handleAds();
//             //         // }, adDuration * 1000);
//             //     }      
//             //     if(isSkippable) {
//             //         unmuteVideo(video);
//             //     }      
//             } 
//             // else if (video.duration <= 150){
//             //     await checkAndSkipAd(video);
//             // }
//             else{
//                 unmuteVideo(video);
//             }
//         }
//     };


// function startAdCheckInterval() {
//     // if (adCheckTimeout) {
//     //     clearTimeout(adCheckTimeout);
//     // }
//     // adCheckTimeout = setInterval(() => {
//     //     handleAds().catch(console.error);
//     // }, 1000); // need to improve this
//     setInterval(() => {
//         handleAds();
//     }, 1000);
// }


// startAdCheckInterval(); 


// content.js

if (!window.location.href.startsWith('chrome://')) {
  console.log("inside content.js")
  let isMuted = false;

  function muteVideo(video) {
    if (!isMuted) {
      video.muted = true;
      isMuted = true;
    }
  }

  function unmuteVideo(video) {
    if (video.muted && isMuted) {
      video.muted = false;
      isMuted = false;
    }
  }

  // function delay(ms) {
  //   return new Promise(resolve => setTimeout(resolve, ms));
  // }

  // async function checkForSkip() {
  //   const isSkippable = document.querySelectorAll(".ytp-skip-ad-button");
  //   for (let i = 0; i <= 5; i++) {
  //     await delay(1000);
  //     isSkippable.click();
  //   }
  // }

  function checkForAds() {
    const videos = document.querySelectorAll('#player');
    videos.forEach(video => {
      // Example check: if video duration is less than 30 seconds, it's probably an ad
      if (video.duration < 90) {
        muteVideo(video);
        // checkForSkip();
      } else {
        unmuteVideo(video);
      }
    });
  }

  setInterval(checkForAds, 1000);
}

