import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
player.setCurrentTime(0);

const watchedPercentage = function (data) {
    localStorage.setItem('videoplayer-current-time', data.seconds);
}
const previousTime = localStorage.getItem('videoplayer-current-time');
if (previousTime) {
    player.setCurrentTime(previousTime);
}

player.on('timeupdate', throttle(watchedPercentage, 1000));