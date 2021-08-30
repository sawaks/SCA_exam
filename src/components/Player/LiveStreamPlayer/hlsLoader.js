import Hls from 'hls.js';

let hls;

export function initialise(player, sourceUrl, callback) {
  if (!sourceUrl) {
    return;
  }
  hls = new Hls();
  hls.attachMedia(player);
  hls.on(Hls.Events.MEDIA_ATTACHED, () => {
    hls.loadSource(sourceUrl);
  });

  hls.on(Hls.Events.MANIFEST_PARSED, () => {
    hls.startLoad();
    if (callback) {
      callback();
    }
  });
}

export function detachAndDestroy() {
  if (hls) {
    hls.stopLoad();
    hls.detachMedia();
    hls.destroy();
  }
}
