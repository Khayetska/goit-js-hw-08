import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframeEl = document.querySelector('#vimeo-player');
const player = new Player(iframeEl);

player.setCurrentTime(localStorage.getItem('videoplayer-current-time') || 0);

const makeTimeUpdate = data => {
  localStorage.setItem('videoplayer-current-time', data.seconds);
};

const throttledMakeTimeUpdate = throttle(makeTimeUpdate, 1000);

player.on('timeupdate', throttledMakeTimeUpdate);
