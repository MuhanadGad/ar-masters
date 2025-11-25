document.addEventListener("DOMContentLoaded", () => {
  const targets = document.querySelectorAll("a-entity[mindar-image-target]");

  targets.forEach((target) => {
    // Find the <a-video> inside this target
    const aVideo = target.querySelector("a-video");
    let htmlVideo = null;

    if (aVideo) {
      // src is like "#vid-1" → use it to find the real <video> in <a-assets>
      const srcSelector = aVideo.getAttribute("src");
      if (srcSelector && srcSelector.startsWith("#")) {
        htmlVideo = document.querySelector(srcSelector);
      }
    }

    target.addEventListener("targetFound", () => {
      console.log("target found:", target.id);
      if (htmlVideo) {
        htmlVideo.play().catch((e) => {
          console.warn("Video play blocked or failed:", e);
        });
      }
    });

    target.addEventListener("targetLost", () => {
      console.log("target lost:", target.id);
      if (htmlVideo) {
        htmlVideo.pause();
        // optional reset:
        // htmlVideo.currentTime = 0;
      }
    });
  });
});
